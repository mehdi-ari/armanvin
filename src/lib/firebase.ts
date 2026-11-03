import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc,
  getDocFromServer,
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific database ID from config
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId.length > 0 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Test connection on boot
(async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore connection check: client is offline or initializing.");
    }
  }
})();

// Auth helpers
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Upsert user profile in firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || 'کاربر گرامی',
        email: user.email || '',
        photoURL: user.photoURL || '',
        lastLoginAt: new Date().toISOString()
      }, { merge: true });
    }
    
    return user;
  } catch (err: any) {
    console.error('Google Sign-In Error:', err);
    throw err;
  }
};

export const logOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export interface SavedBirthResult {
  id: string;
  userId: string;
  birthDate: string;
  birthCity: string;
  calculatedTime: string;
  ascendant: string;
  mc: string;
  confidence: number;
  dayPeriod: string;
  timeOffsetMinutes: number;
  createdAt: string;
}

// Save birth calculation result for authenticated user
export const saveBirthResult = async (
  userId: string, 
  resultData: Omit<SavedBirthResult, 'id' | 'userId' | 'createdAt'>
): Promise<string> => {
  const collectionRef = collection(db, 'users', userId, 'birth_results');
  const docRef = await addDoc(collectionRef, {
    ...resultData,
    userId,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

// Fetch user's saved results
export const getUserBirthResults = async (userId: string): Promise<SavedBirthResult[]> => {
  try {
    const collectionRef = collection(db, 'users', userId, 'birth_results');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const results: SavedBirthResult[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        userId: data.userId || userId,
        birthDate: data.birthDate || '',
        birthCity: data.birthCity || '',
        calculatedTime: data.calculatedTime || '',
        ascendant: data.ascendant || '',
        mc: data.mc || '',
        confidence: data.confidence || 0,
        dayPeriod: data.dayPeriod || '',
        timeOffsetMinutes: data.timeOffsetMinutes || 0,
        createdAt: data.createdAt || ''
      });
    });
    return results;
  } catch (error) {
    console.error('Error fetching birth results:', error);
    return [];
  }
};

// Delete a saved birth result
export const deleteBirthResult = async (userId: string, resultId: string): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'birth_results', resultId);
  await deleteDoc(docRef);
};
