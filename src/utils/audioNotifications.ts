/**
 * Audio Notification System
 * 30+ sounds for various business events
 */

export type NotificationSoundType = 
  // ✅ Success Events (1-6)
  | 'sale_success'
  | 'sale_complete'
  | 'refund_approved'
  | 'payment_received'
  | 'order_confirmed'
  | 'task_completed'
  
  // ⚠️ Warning Events (7-12)
  | 'low_stock_warning'
  | 'high_discount_alert'
  | 'price_mismatch'
  | 'inventory_alert'
  | 'expiry_approaching'
  | 'customer_limit_warning'
  
  // 🔴 Critical/Error Events (13-18)
  | 'payment_failed'
  | 'system_error'
  | 'critical_inventory'
  | 'transaction_error'
  | 'customer_credit_exceeded'
  | 'invalid_transaction'
  
  // 💼 Business Events (19-24)
  | 'new_customer'
  | 'large_order'
  | 'bulk_sale'
  | 'vip_customer_purchase'
  | 'return_received'
  | 'supplier_delivery'
  
  // 📊 Analytics & Monitoring (25-30)
  | 'daily_target_reached'
  | 'monthly_milestone'
  | 'performance_boost'
  | 'unusual_activity'
  | 'system_check'
  | 'backup_complete'
  
  // 🎯 Additional (31+)
  | 'countdown_timer'
  | 'shift_change'
  | 'employee_checkin'
  | 'customer_alert'
  | 'loyalty_earned';

interface NotificationSound {
  type: NotificationSoundType;
  name: string;
  description: string;
  frequency: number; // Hz
  duration: number; // ms
  volume: number; // 0-1
}

// Sound definitions with Web Audio API parameters
const SOUND_DEFINITIONS: Record<NotificationSoundType, NotificationSound> = {
  // ✅ Success Sounds
  sale_success: {
    type: 'sale_success',
    name: 'বিক্রয় সফল',
    description: 'নতুন বিক্রয় সম্পন্ন হয়েছে',
    frequency: 800,
    duration: 300,
    volume: 0.8,
  },
  sale_complete: {
    type: 'sale_complete',
    name: 'বিক্রয় সম্পূর্ণ',
    description: 'বিক্রয় প্রক্রিয়া সম্পূর্ণ',
    frequency: 1000,
    duration: 400,
    volume: 0.9,
  },
  refund_approved: {
    type: 'refund_approved',
    name: 'রিফান্ড অনুমোদিত',
    description: 'রিফান্ড অনুমোদিত হয়েছে',
    frequency: 900,
    duration: 350,
    volume: 0.8,
  },
  payment_received: {
    type: 'payment_received',
    name: 'অর্থ প্রাপ্ত',
    description: 'পেমেন্ট সফলভাবে গৃহীত হয়েছে',
    frequency: 1200,
    duration: 450,
    volume: 0.9,
  },
  order_confirmed: {
    type: 'order_confirmed',
    name: 'অর্ডার নিশ্চিত',
    description: 'অর্ডার নিশ্চিত করা হয়েছে',
    frequency: 1100,
    duration: 300,
    volume: 0.8,
  },
  task_completed: {
    type: 'task_completed',
    name: 'কাজ সম্পূর্ণ',
    description: 'কাজ সম্পন্ন হয়েছে',
    frequency: 1300,
    duration: 250,
    volume: 0.7,
  },

  // ⚠️ Warning Sounds
  low_stock_warning: {
    type: 'low_stock_warning',
    name: 'স্টক কম সতর্কতা',
    description: 'পণ্য স্টক কম হয়ে গেছে',
    frequency: 600,
    duration: 500,
    volume: 0.8,
  },
  high_discount_alert: {
    type: 'high_discount_alert',
    name: 'উচ্চ ছাড় সতর্কতা',
    description: 'অত্যধিক ছাড় প্রদান করা হয়েছে',
    frequency: 650,
    duration: 400,
    volume: 0.75,
  },
  price_mismatch: {
    type: 'price_mismatch',
    name: 'মূল্য অমিল',
    description: 'মূল্যে অমিল সনাক্ত করা হয়েছে',
    frequency: 700,
    duration: 450,
    volume: 0.8,
  },
  inventory_alert: {
    type: 'inventory_alert',
    name: 'ইনভেন্টরি এলার্ট',
    description: 'ইনভেন্টরি সংক্রান্ত সমস্যা',
    frequency: 550,
    duration: 600,
    volume: 0.85,
  },
  expiry_approaching: {
    type: 'expiry_approaching',
    name: 'মেয়াদ শেষ হওয়ার কাছাকাছি',
    description: 'পণ্যের মেয়াদ শেষ হতে যাচ্ছে',
    frequency: 680,
    duration: 500,
    volume: 0.8,
  },
  customer_limit_warning: {
    type: 'customer_limit_warning',
    name: 'গ্রাহক সীমা সতর্কতা',
    description: 'গ্রাহক ক্রেডিট সীমা অতিক্রম করতে যাচ্ছে',
    frequency: 720,
    duration: 450,
    volume: 0.8,
  },

  // 🔴 Critical Sounds
  payment_failed: {
    type: 'payment_failed',
    name: 'পেমেন্ট ব্যর্থ',
    description: 'পেমেন্ট প্রক্রিয়া ব্যর্থ হয়েছে',
    frequency: 400,
    duration: 800,
    volume: 0.95,
  },
  system_error: {
    type: 'system_error',
    name: 'সিস্টেম ত্রুটি',
    description: 'সিস্টেমে গুরুতর ত্রুটি ঘটেছে',
    frequency: 350,
    duration: 900,
    volume: 1.0,
  },
  critical_inventory: {
    type: 'critical_inventory',
    name: 'সংকটপূর্ণ ইনভেন্টরি',
    description: 'ইনভেন্টরি গুরুতরভাবে কম',
    frequency: 300,
    duration: 1000,
    volume: 1.0,
  },
  transaction_error: {
    type: 'transaction_error',
    name: 'লেনদেন ত্রুটি',
    description: 'লেনদেনে ত্রুটি দেখা দিয়েছে',
    frequency: 380,
    duration: 850,
    volume: 0.95,
  },
  customer_credit_exceeded: {
    type: 'customer_credit_exceeded',
    name: 'গ্রাহক ক্রেডিট অতিক্রম',
    description: 'গ্রাহক ক্রেডিট সীমা অতিক্রম করেছে',
    frequency: 420,
    duration: 800,
    volume: 0.95,
  },
  invalid_transaction: {
    type: 'invalid_transaction',
    name: 'অবৈধ লেনদেন',
    description: 'অবৈধ লেনদেন সনাক্ত করা হয়েছে',
    frequency: 360,
    duration: 750,
    volume: 0.9,
  },

  // 💼 Business Events
  new_customer: {
    type: 'new_customer',
    name: 'নতুন গ্রাহক',
    description: 'নতুন গ্রাহক যুক্ত হয়েছেন',
    frequency: 1400,
    duration: 350,
    volume: 0.85,
  },
  large_order: {
    type: 'large_order',
    name: 'বড় অর্ডার',
    description: 'বড় পরিমাণের অর্ডার পাওয়া গেছে',
    frequency: 1500,
    duration: 400,
    volume: 0.9,
  },
  bulk_sale: {
    type: 'bulk_sale',
    name: 'বাল্ক বিক্রয়',
    description: 'বাল্ক পরিমাণে বিক্রয় হয়েছে',
    frequency: 1600,
    duration: 350,
    volume: 0.9,
  },
  vip_customer_purchase: {
    type: 'vip_customer_purchase',
    name: 'ভিআইপি গ্রাহক ক্রয়',
    description: 'ভিআইপি গ্রাহক ক্রয় করেছেন',
    frequency: 1800,
    duration: 500,
    volume: 0.95,
  },
  return_received: {
    type: 'return_received',
    name: 'পণ্য ফেরত আসা',
    description: 'পণ্য ফেরত আসা হয়েছে',
    frequency: 800,
    duration: 400,
    volume: 0.8,
  },
  supplier_delivery: {
    type: 'supplier_delivery',
    name: 'সরবরাহকারী ডেলিভারি',
    description: 'সরবরাহকারী থেকে পণ্য এসেছে',
    frequency: 1100,
    duration: 350,
    volume: 0.85,
  },

  // 📊 Analytics & Monitoring
  daily_target_reached: {
    type: 'daily_target_reached',
    name: 'দৈনিক লক্ষ্য অর্জন',
    description: 'দৈনিক বিক্রয় লক্ষ্য অর্জিত হয়েছে',
    frequency: 1400,
    duration: 600,
    volume: 0.95,
  },
  monthly_milestone: {
    type: 'monthly_milestone',
    name: 'মাসিক মাইলফলক',
    description: 'মাসিক মাইলফলক অর্জিত হয়েছে',
    frequency: 2000,
    duration: 700,
    volume: 1.0,
  },
  performance_boost: {
    type: 'performance_boost',
    name: 'পারফরম্যান্স বৃদ্ধি',
    description: 'ব্যবসায়িক পারফরম্যান্স উন্নত হয়েছে',
    frequency: 1300,
    duration: 450,
    volume: 0.9,
  },
  unusual_activity: {
    type: 'unusual_activity',
    name: 'অস্বাভাবিক কার্যকলাপ',
    description: 'অস্বাভাবিক কার্যকলাপ সনাক্ত করা হয়েছে',
    frequency: 500,
    duration: 600,
    volume: 0.85,
  },
  system_check: {
    type: 'system_check',
    name: 'সিস্টেম পরীক্ষা',
    description: 'সিস্টেম পরীক্ষা সম্পন্ন',
    frequency: 1000,
    duration: 300,
    volume: 0.7,
  },
  backup_complete: {
    type: 'backup_complete',
    name: 'ব্যাকআপ সম্পূর্ণ',
    description: 'ডেটা ব্যাকআপ সম্পূর্ণ হয়েছে',
    frequency: 1200,
    duration: 400,
    volume: 0.8,
  },

  // 🎯 Additional
  countdown_timer: {
    type: 'countdown_timer',
    name: 'কাউন্টডাউন টাইমার',
    description: 'সময় শেষ হয়ে যাচ্ছে',
    frequency: 800,
    duration: 200,
    volume: 0.7,
  },
  shift_change: {
    type: 'shift_change',
    name: 'শিফট পরিবর্তন',
    description: 'শিফট পরিবর্তনের সময় এসেছে',
    frequency: 1000,
    duration: 400,
    volume: 0.85,
  },
  employee_checkin: {
    type: 'employee_checkin',
    name: 'কর্মচারী চেক-ইন',
    description: 'কর্মচারী চেক-ইন হয়েছেন',
    frequency: 1100,
    duration: 300,
    volume: 0.8,
  },
  customer_alert: {
    type: 'customer_alert',
    name: 'গ্রাহক সতর্কতা',
    description: 'গ্রাহক সম্পর্কিত সতর্কতা',
    frequency: 900,
    duration: 400,
    volume: 0.8,
  },
  loyalty_earned: {
    type: 'loyalty_earned',
    name: 'লয়্যালটি অর্জন',
    description: 'গ্রাহক লয়্যালটি পয়েন্ট অর্জন করেছেন',
    frequency: 1300,
    duration: 350,
    volume: 0.85,
  },
};

/**
 * Audio notification service using Web Audio API
 */
export class AudioNotificationService {
  private audioContext: AudioContext | null = null;
  private isEnabled = true;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }
  }

  /**
   * Play a notification sound
   */
  play(soundType: NotificationSoundType, repeat: boolean = false) {
    if (!this.isEnabled || !this.audioContext) return;

    const sound = SOUND_DEFINITIONS[soundType];
    if (!sound) {
      console.warn(`Sound type not found: ${soundType}`);
      return;
    }

    try {
      const now = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = sound.frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(sound.volume, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + sound.duration / 1000);

      oscillator.start(now);
      oscillator.stop(now + sound.duration / 1000);

      // Play additional beeps for warning and critical sounds
      if (repeat && sound.frequency < 700) {
        this.playBeep(soundType);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  /**
   * Play a beep sequence for multiple alerts
   */
  private playBeep(soundType: NotificationSoundType) {
    const sound = SOUND_DEFINITIONS[soundType];
    const beepCount = sound.frequency < 400 ? 3 : sound.frequency < 600 ? 2 : 1;

    for (let i = 0; i < beepCount; i++) {
      setTimeout(() => {
        this.play(soundType, false);
      }, (i + 1) * 600);
    }
  }

  /**
   * Toggle sound on/off
   */
  toggleSound(enabled: boolean) {
    this.isEnabled = enabled;
  }

  /**
   * Get all available sounds
   */
  getAllSounds() {
    return Object.values(SOUND_DEFINITIONS);
  }

  /**
   * Get sound by type
   */
  getSound(type: NotificationSoundType) {
    return SOUND_DEFINITIONS[type];
  }

  /**
   * Get sounds by category
   */
  getSoundsByCategory(category: 'success' | 'warning' | 'error' | 'business' | 'analytics' | 'other') {
    const categoryMap: Record<string, NotificationSoundType[]> = {
      success: ['sale_success', 'sale_complete', 'refund_approved', 'payment_received', 'order_confirmed', 'task_completed'],
      warning: ['low_stock_warning', 'high_discount_alert', 'price_mismatch', 'inventory_alert', 'expiry_approaching', 'customer_limit_warning'],
      error: ['payment_failed', 'system_error', 'critical_inventory', 'transaction_error', 'customer_credit_exceeded', 'invalid_transaction'],
      business: ['new_customer', 'large_order', 'bulk_sale', 'vip_customer_purchase', 'return_received', 'supplier_delivery'],
      analytics: ['daily_target_reached', 'monthly_milestone', 'performance_boost', 'unusual_activity', 'system_check', 'backup_complete'],
      other: ['countdown_timer', 'shift_change', 'employee_checkin', 'customer_alert', 'loyalty_earned'],
    };

    return (categoryMap[category] || []).map(type => SOUND_DEFINITIONS[type]);
  }
}

/**
 * Global singleton instance
 */
export const audioNotificationService = new AudioNotificationService();
