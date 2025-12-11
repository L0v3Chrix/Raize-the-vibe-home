import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'text',
    question: "If your website could be a superpower for your business, what would it do?",
    subtext: "Dream big. We want to know what magic you're imagining.",
    placeholder: "Type your superpower vision here...",
    examples: [
      "Turn browsers into buyers automatically",
      "Make my customers feel like VIPs every time they visit",
      "Handle all the boring stuff so I can focus on what I love"
    ]
  },
  {
    id: 2,
    type: 'cards',
    question: "What kind of business magic do you create in the world?",
    subtext: "This helps us understand your industry and customers.",
    options: [
      { id: 'healthcare', label: 'Healthcare & Wellness', emoji: '/images/emojis/healthcare.png', value: 'healthcare', description: 'Doctors, therapists, fitness, healing' },
      { id: 'home', label: 'Home Services', emoji: '/images/emojis/home.png', value: 'home', description: 'Contractors, cleaners, landscapers' },
      { id: 'creative', label: 'Creative Services', emoji: '/images/emojis/creative.png', value: 'creative', description: 'Designers, photographers, consultants' },
      { id: 'local', label: 'Local Business', emoji: '/images/emojis/local.png', value: 'local', description: 'Restaurants, retail, local services' },
      { id: 'professional', label: 'Professional Services', emoji: '/images/emojis/professional.png', value: 'professional', description: 'Lawyers, accountants, coaches' },
      { id: 'other', label: 'Something Else Amazing', emoji: '/images/emojis/lightning.png', value: 'other', description: "Tell us on the call!" }
    ]
  },
  {
    id: 3,
    type: 'multi',
    question: "What's making you want to throw your laptop out the window right now?",
    subtext: "Select all that apply. We've heard 'em all.",
    options: [
      { id: 'outdated', label: 'Website looks like it\'s from 2010', emoji: '/images/emojis/outdated.png', value: 'outdated-website' },
      { id: 'mobile', label: 'Customers can\'t figure out how to book/buy on mobile', emoji: '/images/emojis/mobile.png', value: 'mobile-issues' },
      { id: 'repetitive', label: 'Doing the same repetitive tasks every damn day', emoji: '/images/emojis/repetitive.png', value: 'repetitive-tasks' },
      { id: 'marketing', label: 'No clue if my marketing actually works', emoji: '/images/emojis/marketing.png', value: 'marketing-unclear' },
      { id: 'tools', label: 'Spending money on tools that don\'t talk to each other', emoji: '/images/emojis/tools.png', value: 'disconnected-tools' },
      { id: 'overwhelmed', label: 'Managing everything myself instead of running my business', emoji: '/images/emojis/overwhelmed.png', value: 'overwhelmed' },
      { id: 'ghosted', label: 'My current web person disappeared/sucks', emoji: '/images/emojis/ghosted.png', value: 'bad-provider' },
      { id: 'starting', label: 'Starting from scratch — no online presence yet', emoji: '/images/emojis/starting.png', value: 'starting-fresh' }
    ]
  },
  {
    id: 4,
    type: 'slider',
    question: "How pumped would you be if AI handled your boring work while you focused on what you actually love?",
    subtext: "Be honest. Some people are skeptical, some are ready to go full robot. Both are valid.",
    min: 0,
    max: 10,
    sliderLabels: {
      low: "Meh, I'll stick to doing it myself",
      high: "OMG YES — automate ALL the things!"
    },
    emojiScale: [
      '/images/emojis/quiz/slider/slider-0-skeptical.png',
      '/images/emojis/quiz/slider/slider-1-doubtful.png',
      '/images/emojis/quiz/slider/slider-2-thinking.png',
      '/images/emojis/quiz/slider/slider-3-hmm.png',
      '/images/emojis/quiz/slider/slider-4-neutral-positive.png',
      '/images/emojis/quiz/slider/slider-5-interested.png',
      '/images/emojis/quiz/slider/slider-6-smiling.png',
      '/images/emojis/quiz/slider/slider-7-happy.png',
      '/images/emojis/quiz/slider/slider-8-excited.png',
      '/images/emojis/quiz/slider/slider-9-thrilled.png',
      '/images/emojis/quiz/slider/slider-10-ecstatic.png'
    ]
  },
  {
    id: 5,
    type: 'cards',
    question: "What feels right for investing in your digital growth?",
    subtext: "No judgment here. We work with all kinds of budgets.",
    options: [
      {
        id: 'one-time',
        label: 'Less than $1,000 one-time',
        emoji: '/images/emojis/quiz/budget/budget-lightbulb.png',
        value: 'one-time-small',
        description: 'A focused project with clear scope'
      },
      {
        id: 'weekly',
        label: '$250/week ongoing',
        emoji: '/images/emojis/quiz/budget/budget-rocket.png',
        value: 'weekly-250',
        description: 'Steady growth with consistent partnership'
      },
      {
        id: 'investment',
        label: 'This is an investment that will make me money',
        emoji: '/images/emojis/quiz/budget/budget-chart.png',
        value: 'roi-focused',
        description: 'Looking at long-term returns, not just cost'
      },
      {
        id: 'all-in',
        label: 'I\'ll give you all my money to solve my problems',
        emoji: '/images/emojis/quiz/budget/budget-money-bag.png',
        value: 'money-no-object',
        description: 'Whatever it takes to get it done right'
      },
      {
        id: 'depends',
        label: 'Show me the value first',
        emoji: '/images/emojis/quiz/budget/budget-shrug.png',
        value: 'value-first',
        description: "Let's talk about what I'd get"
      }
    ]
  },
  {
    id: 6,
    type: 'timeline',
    question: "When do you want this masterpiece to go live?",
    subtext: "We'll be honest about what's actually possible.",
    options: [
      { id: 'yesterday', label: 'Yesterday', emoji: '/images/emojis/quiz/timeline/timeline-lightning.png', value: 'urgent', description: "I'm desperate" },
      { id: 'month', label: 'Next month', emoji: '/images/emojis/quiz/timeline/timeline-calendar.png', value: 'next-month', description: 'would be amazing' },
      { id: 'quarter', label: '2-3 months', emoji: '/images/emojis/quiz/timeline/timeline-calendar-page.png', value: '2-3-months', description: 'sounds reasonable' },
      { id: 'planning', label: '3-6 months', emoji: '/images/emojis/quiz/timeline/timeline-seedling.png', value: '3-6-months', description: "I'm planning ahead" },
      { id: 'exploring', label: 'Just exploring', emoji: '/images/emojis/quiz/timeline/timeline-thinking.png', value: 'exploring', description: 'options right now' }
    ]
  },
  {
    id: 7,
    type: 'single',
    question: "How do you like working with creative partners?",
    subtext: "This helps us know if we're a good fit for each other.",
    options: [
      {
        id: 'magic',
        label: 'Tell me what you need, I\'ll tell you what I want, let\'s make magic',
        emoji: '/images/emojis/quiz/collaboration/collaboration-target.png',
        value: 'magic-maker',
        description: 'True collaboration, mutual trust'
      },
      {
        id: 'collaborative',
        label: 'Collaborative — I want to be involved but trust your expertise',
        emoji: '/images/emojis/quiz/collaboration/collaboration-handshake.png',
        value: 'collaborative',
        description: 'Regular check-ins and input'
      },
      {
        id: 'surprise',
        label: 'You\'re the creative genius — surprise me with something awesome',
        emoji: '/images/emojis/quiz/collaboration/collaboration-palette.png',
        value: 'hands-off',
        description: 'Trust the process, love the reveal'
      },
      {
        id: 'specific',
        label: 'I know exactly what I want — just build what I specify',
        emoji: '/images/emojis/quiz/collaboration/collaboration-clipboard.png',
        value: 'spec-driven',
        description: 'Clear direction, execution focus'
      },
      {
        id: 'communication',
        label: 'Lots of communication and check-ins keep me happy',
        emoji: '/images/emojis/quiz/collaboration/collaboration-chat.png',
        value: 'high-communication',
        description: 'Frequent updates are essential'
      }
    ]
  }
];

// Scoring configuration
export const scoringConfig = {
  questionWeights: {
    1: { hasAnswer: 5 }, // Vision - any substantive answer
    2: { segmentation: true }, // Industry - no points, just routing
    3: { perSelection: 3 }, // Pain points - 3 per pain
    4: { perPoint: 1 }, // AI interest - 1 per slider point
    5: { // Budget
      'one-time-small': 3,
      'weekly-250': 8,
      'roi-focused': 12,
      'money-no-object': 15,
      'value-first': 5
    },
    6: { // Timeline
      'urgent': 10,
      'next-month': 8,
      '2-3-months': 5,
      '3-6-months': 3,
      'exploring': 0
    },
    7: { // Collaboration style
      'magic-maker': 10,
      'collaborative': 8,
      'hands-off': 6,
      'spec-driven': 2,
      'high-communication': 5
    }
  },
  engagementBonuses: {
    resultsPageTime: 5, // >3 min on results
    serviceCardExpansion: 5,
    caseStudyInteraction: 5,
    aiChatEngagement: 3,
    bookingInitiated: 10,
    bookingCompleted: 15
  },
  scoreTiers: {
    nurture: { min: 0, max: 30, label: 'Nurture' },
    warm: { min: 31, max: 50, label: 'Warm' },
    hot: { min: 51, max: 70, label: 'Hot' },
    priority: { min: 71, max: 100, label: 'Priority' }
  }
};

// Vibe persona mappings
export const vibePersonas = {
  'Creative Collaborator': {
    description: "You thrive on partnership and creative energy. You want a team that gets your vision and brings something extra to the table.",
    color: '#FF1493',
    emoji: '🎨'
  },
  'Innovation Seeker': {
    description: "You're excited about AI and automation. You want cutting-edge solutions that put you ahead of competitors.",
    color: '#00FFFF',
    emoji: '🚀'
  },
  'Growth Accelerator': {
    description: "You see digital investment as fuel for growth. ROI matters, but so does doing it right.",
    color: '#10B981',
    emoji: '📈'
  },
  'Systems Builder': {
    description: "You want everything to work together seamlessly. Automation, integration, efficiency — that's your jam.",
    color: '#8B5CF6',
    emoji: '⚙️'
  },
  'Brand Visionary': {
    description: "You care deeply about how your business shows up. The vibe, the feel, the experience — it all matters.",
    color: '#F97316',
    emoji: '✨'
  }
};
