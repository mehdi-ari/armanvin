export type ViewportMode = 'desktop' | 'mobile' | 'tablet' | 'responsive';
export type DeviceMode = ViewportMode;

// 5 Distinct Design Styles for Header and Footer
export type HeaderFooterStyle =
  | 'style1-authentic'       // ۱. کلاسیک اصیل (منطبق بر اسکچ و تصویر کاربر)
  | 'style2-cosmic-gold'      // ۲. کهکشانی و طلای زرین (Cosmic Auric Gold)
  | 'style3-cyber-studio'     // ۳. سایبرنتیک های‌تک (Cyber Precision Neon)
  | 'style4-luxury-editorial' // ۴. لوکس مجله‌ای و آوانگارد (Luxury Editorial)
  | 'style5-frosted-crystal'; // ۵. کریستال شیشه‌ای بلورین (Frosted Prism Glass)
