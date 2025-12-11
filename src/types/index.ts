// Quiz Types
export interface QuizQuestion {
  id: number;
  type: 'text' | 'single' | 'multi' | 'slider' | 'timeline' | 'cards';
  question: string;
  subtext?: string;
  options?: QuizOption[];
  placeholder?: string;
  examples?: string[];
  min?: number;
  max?: number;
  sliderLabels?: { low: string; high: string };
  emojiScale?: string[];
}

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
  value: string | number;
}

export interface QuizAnswer {
  questionId: number;
  value: string | string[] | number;
  timestamp: Date;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isComplete: boolean;
  startTime: Date | null;
  vibeScore: number;
  vibeType: string;
}

// Vibe Score Types
export interface VibeResult {
  score: number;
  type: VibePersona;
  recommendedService: ServiceType;
  personalizedInsight: string;
  topPriorities: string[];
  treasuresUnlocked: TreasureType[];
}

export type VibePersona = 
  | 'Creative Collaborator'
  | 'Innovation Seeker'
  | 'Growth Accelerator'
  | 'Systems Builder'
  | 'Brand Visionary';

export type ServiceType = 
  | 'concierge-250'
  | 'concierge-400'
  | 'concierge-600'
  | 'website'
  | 'funnel'
  | 'custom-build';

export type TreasureType = 
  | 'vibe-report'
  | 'ai-playbook'
  | 'priority-booking'
  | 'secret-coupon'
  | 'bonus-consultation';

// Service Types
export interface Service {
  id: ServiceType;
  name: string;
  tagline: string;
  icon: string;
  priceDisplay: string;
  description: string;
  features: string[];
  deliverables: ServiceDeliverable[];
  idealFor: string[];
  ctaText: string;
}

export interface ServiceDeliverable {
  category: string;
  items: string[];
}

// Lead & Contact Types
export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessType?: string;
  quizAnswers?: QuizAnswer[];
  vibeScore?: number;
  vibeType?: string;
  leadScore: number;
  tags: string[];
  createdAt: Date;
  source: 'quiz' | 'booking' | 'chat' | 'coupon';
}

export interface BookingRequest {
  lead: Lead;
  preferredTime?: string;
  notes?: string;
  serviceInterest?: ServiceType;
  urgency: 'immediate' | 'this-week' | 'this-month' | 'exploring';
}

// Gamification Types
export interface Treasure {
  id: TreasureType;
  name: string;
  description: string;
  icon: string;
  unlockCondition: string;
  isUnlocked: boolean;
  content?: string;
  downloadUrl?: string;
}

export interface CouponHunt {
  code: string;
  discount: string;
  validUntil: Date;
  found: boolean;
  hints: string[];
}

// UI State Types
export interface ModalState {
  isOpen: boolean;
  type: 'booking' | 'email-gate' | 'service-detail' | 'treasure' | 'coupon' | null;
  data?: unknown;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'celebration';
  message: string;
  duration?: number;
}

// Animation Types
export interface ScrollProgress {
  sectionId: string;
  progress: number;
  isVisible: boolean;
}

// Story Timeline Types
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  icon?: string;
  illustration?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  industry: string;
  avatar?: string;
  metrics?: {
    label: string;
    value: string;
  };
}

// Case Study Types
export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  beforeImage?: string;
  afterImage?: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement?: string;
  }[];
}
