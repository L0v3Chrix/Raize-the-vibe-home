import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizAnswer, VibeResult, Lead, ModalState, TreasureType } from '../types';
import { scoringConfig, vibePersonas } from '../data/quizData';

interface VibeStore {
  // Quiz State
  currentQuestion: number;
  answers: QuizAnswer[];
  quizStarted: boolean;
  quizComplete: boolean;
  startTime: Date | null;
  
  // Results State
  vibeResult: VibeResult | null;
  emailCaptured: boolean;
  capturedEmail: string;
  
  // Lead State
  lead: Lead | null;
  
  // Gamification State
  unlockedTreasures: TreasureType[];
  couponFound: boolean;
  couponCode: string;
  
  // UI State
  modalState: ModalState;
  activeSection: string;
  scrollProgress: number;
  
  // Quiz Actions
  startQuiz: () => void;
  setAnswer: (questionId: number, value: string | string[] | number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (questionId: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  
  // Results Actions
  calculateResults: () => VibeResult;
  captureEmail: (email: string) => void;
  
  // Lead Actions
  setLead: (lead: Lead) => void;
  updateLead: (updates: Partial<Lead>) => void;
  
  // Gamification Actions
  unlockTreasure: (treasure: TreasureType) => void;
  findCoupon: () => void;
  
  // UI Actions
  setModalState: (state: ModalState) => void;
  closeModal: () => void;
  setActiveSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;
}

export const useVibeStore = create<VibeStore>()(
  persist(
    (set, get) => ({
      // Initial Quiz State
      currentQuestion: 0,
      answers: [],
      quizStarted: false,
      quizComplete: false,
      startTime: null,
      
      // Initial Results State
      vibeResult: null,
      emailCaptured: false,
      capturedEmail: '',
      
      // Initial Lead State
      lead: null,
      
      // Initial Gamification State
      unlockedTreasures: [],
      couponFound: false,
      couponCode: 'VIBECHECK10',
      
      // Initial UI State
      modalState: { isOpen: false, type: null },
      activeSection: 'hero',
      scrollProgress: 0,
      
      // Quiz Actions
      startQuiz: () => set({ 
        quizStarted: true, 
        startTime: new Date(),
        currentQuestion: 1 
      }),
      
      setAnswer: (questionId, value) => {
        const currentAnswers = get().answers;
        const existingIndex = currentAnswers.findIndex(a => a.questionId === questionId);
        
        const newAnswer: QuizAnswer = {
          questionId,
          value,
          timestamp: new Date()
        };
        
        if (existingIndex >= 0) {
          const updated = [...currentAnswers];
          updated[existingIndex] = newAnswer;
          set({ answers: updated });
        } else {
          set({ answers: [...currentAnswers, newAnswer] });
        }
      },
      
      nextQuestion: () => {
        const current = get().currentQuestion;
        if (current < 7) {
          set({ currentQuestion: current + 1 });
        }
      },
      
      prevQuestion: () => {
        const current = get().currentQuestion;
        if (current > 1) {
          set({ currentQuestion: current - 1 });
        }
      },
      
      goToQuestion: (questionId) => set({ currentQuestion: questionId }),
      
      completeQuiz: () => {
        const result = get().calculateResults();
        set({ 
          quizComplete: true,
          vibeResult: result,
          unlockedTreasures: [...get().unlockedTreasures, 'vibe-report']
        });
      },
      
      resetQuiz: () => set({
        currentQuestion: 0,
        answers: [],
        quizStarted: false,
        quizComplete: false,
        startTime: null,
        vibeResult: null,
        emailCaptured: false,
        capturedEmail: ''
      }),
      
      // Results Actions
      calculateResults: () => {
        const answers = get().answers;
        let score = 10; // Base score for completing
        
        // Q1: Vision (has answer = +5)
        const q1 = answers.find(a => a.questionId === 1);
        if (q1 && typeof q1.value === 'string' && q1.value.length > 10) {
          score += 5;
        }
        
        // Q3: Pain points (+3 per selection)
        const q3 = answers.find(a => a.questionId === 3);
        if (q3 && Array.isArray(q3.value)) {
          score += q3.value.length * 3;
        }
        
        // Q4: AI interest (+1 per point)
        const q4 = answers.find(a => a.questionId === 4);
        if (q4 && typeof q4.value === 'number') {
          score += q4.value;
          // Unlock AI playbook if 8+
          if (q4.value >= 8) {
            const treasures = get().unlockedTreasures;
            if (!treasures.includes('ai-playbook')) {
              set({ unlockedTreasures: [...treasures, 'ai-playbook'] });
            }
          }
        }
        
        // Q5: Budget
        const q5 = answers.find(a => a.questionId === 5);
        if (q5 && typeof q5.value === 'string') {
          const budgetScores = scoringConfig.questionWeights[5] as Record<string, number>;
          score += budgetScores[q5.value] || 0;
        }
        
        // Q6: Timeline
        const q6 = answers.find(a => a.questionId === 6);
        if (q6 && typeof q6.value === 'string') {
          const timelineScores = scoringConfig.questionWeights[6] as Record<string, number>;
          score += timelineScores[q6.value] || 0;
        }
        
        // Q7: Collaboration style
        const q7 = answers.find(a => a.questionId === 7);
        if (q7 && typeof q7.value === 'string') {
          const collabScores = scoringConfig.questionWeights[7] as Record<string, number>;
          score += collabScores[q7.value] || 0;
        }
        
        // Cap at 100
        score = Math.min(score, 100);
        
        // Determine vibe type based on answers
        let vibeType: keyof typeof vibePersonas = 'Creative Collaborator';
        
        const aiScore = q4?.value as number || 0;
        const budgetValue = q5?.value as string || '';
        const collabValue = q7?.value as string || '';
        
        if (aiScore >= 8) {
          vibeType = 'Innovation Seeker';
        } else if (budgetValue === 'roi-focused' || budgetValue === 'money-no-object') {
          vibeType = 'Growth Accelerator';
        } else if (collabValue === 'magic-maker' || collabValue === 'collaborative') {
          vibeType = 'Creative Collaborator';
        } else if (Array.isArray(q3?.value) && (q3.value as string[]).includes('repetitive-tasks')) {
          vibeType = 'Systems Builder';
        } else {
          vibeType = 'Brand Visionary';
        }
        
        // Determine recommended service
        let recommendedService: VibeResult['recommendedService'] = 'concierge-400';
        
        if (budgetValue === 'one-time-small') {
          recommendedService = 'custom-build';
        } else if (budgetValue === 'weekly-250') {
          recommendedService = 'concierge-250';
        } else if (budgetValue === 'roi-focused' || budgetValue === 'money-no-object') {
          recommendedService = 'concierge-600';
        }
        
        // Generate personalized insight
        const visionAnswer = q1?.value as string || '';
        const topPain = Array.isArray(q3?.value) ? (q3.value as string[])[0] : '';
        
        const insight = `Based on your vision of "${visionAnswer.slice(0, 50)}${visionAnswer.length > 50 ? '...' : ''}" and your frustration with ${formatPainPoint(topPain)}, here's what we're already thinking for you.`;
        
        // Generate priorities based on pain points
        const painPoints = Array.isArray(q3?.value) ? q3.value as string[] : [];
        const priorities = painPoints.slice(0, 3).map(formatPainPointToSolution);
        
        return {
          score,
          type: vibeType,
          recommendedService,
          personalizedInsight: insight,
          topPriorities: priorities,
          treasuresUnlocked: get().unlockedTreasures
        };
      },
      
      captureEmail: (email) => set({ 
        emailCaptured: true, 
        capturedEmail: email 
      }),
      
      // Lead Actions
      setLead: (lead) => set({ lead }),
      
      updateLead: (updates) => {
        const currentLead = get().lead;
        if (currentLead) {
          set({ lead: { ...currentLead, ...updates } });
        }
      },
      
      // Gamification Actions
      unlockTreasure: (treasure) => {
        const current = get().unlockedTreasures;
        if (!current.includes(treasure)) {
          set({ unlockedTreasures: [...current, treasure] });
        }
      },
      
      findCoupon: () => set({ 
        couponFound: true,
        unlockedTreasures: [...get().unlockedTreasures, 'secret-coupon']
      }),
      
      // UI Actions
      setModalState: (state) => set({ modalState: state }),
      
      closeModal: () => set({ modalState: { isOpen: false, type: null } }),
      
      setActiveSection: (section) => set({ activeSection: section }),
      
      setScrollProgress: (progress) => set({ scrollProgress: progress }),
    }),
    {
      name: 'vibe-journey-storage',
      partialize: (state) => ({
        answers: state.answers,
        quizComplete: state.quizComplete,
        vibeResult: state.vibeResult,
        emailCaptured: state.emailCaptured,
        capturedEmail: state.capturedEmail,
        unlockedTreasures: state.unlockedTreasures,
        couponFound: state.couponFound
      })
    }
  )
);

// Helper functions
function formatPainPoint(painId: string): string {
  const painMap: Record<string, string> = {
    'outdated-website': 'your outdated website',
    'mobile-issues': 'mobile booking problems',
    'repetitive-tasks': 'repetitive daily tasks',
    'marketing-unclear': 'unclear marketing results',
    'disconnected-tools': 'disconnected tools',
    'overwhelmed': 'feeling overwhelmed',
    'bad-provider': 'unreliable providers',
    'starting-fresh': 'starting from scratch'
  };
  return painMap[painId] || 'your current challenges';
}

function formatPainPointToSolution(painId: string): string {
  const solutionMap: Record<string, string> = {
    'outdated-website': 'Modern website that finally matches who you are',
    'mobile-issues': 'Mobile-first booking that actually works',
    'repetitive-tasks': 'AI automation for the stuff you hate doing',
    'marketing-unclear': 'Clear analytics so you know what\'s working',
    'disconnected-tools': 'Integrated systems that talk to each other',
    'overwhelmed': 'Streamlined workflows that free up your time',
    'bad-provider': 'A reliable partner who actually shows up',
    'starting-fresh': 'A complete digital foundation built right'
  };
  return solutionMap[painId] || 'Tailored solutions for your specific needs';
}
