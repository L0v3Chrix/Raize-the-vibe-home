import { Service, Testimonial, CaseStudy, TimelineEvent, Treasure } from '../types';

export const services: Service[] = [
  {
    id: 'custom-build',
    name: 'The Build Studio',
    tagline: 'Pay It Forward. Get It Built.',
    icon: '/images/emojis/site/icon-wrench.png',
    priceDisplay: 'Suggested: $50-100/hr',
    description: 'Some people can pay more. Some people can\'t. Everyone gets the same work.\nThat\'s it. That\'s the model.\n\nWhen you pay above our suggested rate, you\'re funding a founder who can\'t. When you pay what you can, someone already covered you. Either way — you\'re part of the crew.',
    features: [
      'Websites • Logos • Email campaigns',
      'Landing pages • Automations • Dashboards',
      'Forms • Social campaigns • Brand kits',
      'That one thing you\'ve been Googling for months',
      'Real conversation. Clear scope. Quality work.',
      'No judgment.'
    ],
    deliverables: [
      {
        category: 'The Process',
        items: [
          'Vision session (recorded)',
          'Asset organization',
          'Scope document',
          'Build timeline',
          'Delivery + walkthrough'
        ]
      },
      {
        category: 'Examples We Build',
        items: [
          'Custom calculators',
          'Intake forms',
          'Dashboards',
          'Quoting systems',
          'Small apps & tools',
          'Database interfaces'
        ]
      }
    ],
    idealFor: [
      'Bootstrapped founders with more vision than budget',
      'Nonprofits and mission-driven organizations',
      'Side hustles and passion projects',
      'Anyone testing an MVP before going all-in',
      'Creators who just need ONE thing built right',
      'People who value transparency and trust over transactions'
    ],
    ctaText: 'Share Your Vision'
  },
  {
    id: 'website',
    name: 'Brand & Website Creation',
    tagline: 'Finally Feel Like You Online',
    icon: '/images/emojis/site/icon-palette.png',
    priceDisplay: 'Custom Quote',
    description: "You don't need a giant rebrand. You need a presence you're proud of — one that matches who you are and converts without manipulation.",
    features: [
      'Clean, modern, honest design',
      'Clear messaging that resonates',
      'Simple, intuitive navigation',
      'Mobile-first approach',
      'Conversion-focused without sleaze',
      'Brand identity that feels human'
    ],
    deliverables: [
      {
        category: 'Brand Foundation',
        items: [
          'Color palette & typography',
          'Logo refinement (if needed)',
          'Voice & tone guidelines',
          'Visual style direction'
        ]
      },
      {
        category: 'Website Build',
        items: [
          'Custom design (not templates)',
          'Responsive across devices',
          'SEO foundation built-in',
          'Speed optimized',
          'Contact/booking integration'
        ]
      }
    ],
    idealFor: [
      'Businesses embarrassed by current site',
      'Those starting fresh',
      'Rebrands and pivots',
      'Anyone who wants to feel proud'
    ],
    ctaText: "Let's Design Together"
  },
  {
    id: 'funnel',
    name: 'Infotainment Funnels™',
    tagline: 'Education That Sells',
    icon: '/images/emojis/site/icon-target.png',
    priceDisplay: '$2,000-$5,000',
    description: 'People buy when they feel educated, not pressured. We design funnels that explain, build trust, filter leads, and make next steps feel natural.',
    features: [
      'Story-driven long-form pages',
      'Progressive quiz experiences',
      'AI-powered personalization',
      'Lead qualification built-in',
      'Automated nurture sequences',
      'Conversion tracking & optimization'
    ],
    deliverables: [
      {
        category: 'Funnel Build',
        items: [
          'Interactive quiz/assessment',
          'Personalized results engine',
          'Email capture integration',
          'CRM tagging & routing',
          'Thank you / next steps flow'
        ]
      },
      {
        category: 'Content & Copy',
        items: [
          'Conversion-focused copywriting',
          'Story sequencing',
          'Trust-building elements',
          'Objection handling'
        ]
      },
      {
        category: 'Automation',
        items: [
          'Email nurture sequences',
          'SMS follow-up (optional)',
          'Lead scoring logic',
          'Booking integration'
        ]
      }
    ],
    idealFor: [
      'Complex services needing explanation',
      'High-trust industries',
      'Consultative sales processes',
      'Anyone tired of cold leads'
    ],
    ctaText: 'Build My Funnel'
  },
  {
    id: 'concierge-400',
    name: 'Done-For-You Digital',
    tagline: 'We Handle Everything',
    icon: '/images/emojis/site/icon-rocket.png',
    priceDisplay: '$400/week',
    description: 'Everything in the $250 tier plus we post and publish across your channels, engage on your behalf, and optimize your presence.',
    features: [
      'Everything in $250 tier',
      'We post and publish for you',
      'Community engagement on your behalf',
      'On-page SEO improvements',
      'AI search optimization',
      'Review response management'
    ],
    deliverables: [
      {
        category: 'Content & Posting',
        items: [
          '10-20 branded posts weekly',
          'Published across all platforms',
          'Optimal timing for engagement',
          'Stories and reels included'
        ]
      },
      {
        category: 'Engagement',
        items: [
          'Comment responses',
          'DM management (light)',
          'Community interaction',
          'Review monitoring'
        ]
      },
      {
        category: 'Optimization',
        items: [
          'On-page SEO updates',
          'Structured data / schema',
          'Local SEO improvements',
          'AI search preparation'
        ]
      }
    ],
    idealFor: [
      'Busy owners who need it handled',
      'Businesses ready to grow',
      'Those who want consistent presence',
      'Local service providers'
    ],
    ctaText: 'Go Hands-Free'
  },
  {
    id: 'concierge-250',
    name: 'Digital Concierge',
    tagline: 'You Run It, We Create It',
    icon: '/images/emojis/site/icon-phone-mobile.png',
    priceDisplay: '$250/week',
    description: 'We create all your weekly content one week in advance. You stay hands-on, but with professional creative direction.',
    features: [
      'Weekly content created in advance',
      'Social creatives for FB, IG, Nextdoor, GMB',
      'Captions, prompts, and talking points',
      'Simple calendar with exact posting instructions',
      'Brand-consistent messaging'
    ],
    deliverables: [
      {
        category: 'Social Content',
        items: [
          '10-20 branded posts weekly',
          'Platform-specific formatting',
          'Hashtag strategy included',
          'Content calendar with dates'
        ]
      },
      {
        category: 'Support',
        items: [
          'Weekly creative review',
          'Posting instructions',
          'Response templates',
          'Async communication support'
        ]
      }
    ],
    idealFor: [
      'Owners who want to stay hands-on',
      'Those building posting habits',
      'Businesses testing the waters',
      'Side hustlers with day jobs'
    ],
    ctaText: 'Start Creating'
  },
  {
    id: 'concierge-600',
    name: 'Full Digital Management',
    tagline: 'Your Complete Digital Team',
    icon: '/images/emojis/site/icon-crown.png',
    priceDisplay: '$600/week',
    description: 'Full digital management plus either office support OR video creation. This is for businesses ready for real momentum.',
    features: [
      'Everything in $400 tier',
      'Choose: Office Support OR Video Creation',
      'Email triage and management',
      'Call & text coordination',
      'Lead routing and follow-up',
      'Short-form video content'
    ],
    deliverables: [
      {
        category: 'Path A: Office Support',
        items: [
          'Email inbox management',
          'Call/text routing',
          'Lead qualification',
          'Customer coordination',
          'Appointment confirmations'
        ]
      },
      {
        category: 'Path B: Video Creation',
        items: [
          'Short-form videos weekly',
          'Testimonial-style content',
          'Educational clips',
          'Story-driven micro-content',
          'Platform-optimized formats'
        ]
      }
    ],
    idealFor: [
      'Growing businesses with volume',
      'Owners drowning in admin',
      'Those ready for video content',
      'Businesses scaling fast'
    ],
    ctaText: 'Scale With Us'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "They made my website actually feel like ME for the first time. Not just another template — something that resonates.",
    author: "Sarah M.",
    role: "Owner",
    industry: "Wellness Studio",
    metrics: {
      label: "Lead increase",
      value: "340%"
    }
  },
  {
    id: '2',
    quote: "Finally, someone who speaks human instead of tech jargon. They got what I needed without making me feel stupid.",
    author: "Marcus R.",
    role: "Owner",
    industry: "Local Trades"
  },
  {
    id: '3',
    quote: "The automation alone saves me 10+ hours a week. I can actually focus on my clients instead of admin chaos.",
    author: "Jennifer L.",
    role: "Director",
    industry: "Sober Living Home",
    metrics: {
      label: "Hours saved weekly",
      value: "10+"
    }
  },
  {
    id: '4',
    quote: "Our booking rate went through the roof after the quiz funnel. People come in already educated and ready.",
    author: "David K.",
    role: "Founder",
    industry: "Financial Services",
    metrics: {
      label: "Booking rate",
      value: "87%"
    }
  },
  {
    id: '5',
    quote: "I was skeptical about AI, but they showed me how it could handle the stuff I hate doing. Game changer.",
    author: "Rachel T.",
    role: "Owner",
    industry: "Massage Therapy"
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'helpnow-atx',
    clientName: 'HelpNow ATX Recovery Services',
    industry: 'Recovery / Sober Living',
    challenge: 'Confusing navigation, no clear next step for families in crisis. Leads were falling through the cracks.',
    solution: 'Complete website redesign with clear pathways, booking automation, and educational content funnel.',
    results: [
      { metric: 'Qualified Inquiries', value: '340%', improvement: 'increase' },
      { metric: 'Form Completion', value: '87%', improvement: 'rate' },
      { metric: 'Response Time', value: '< 5 min', improvement: 'automated' }
    ]
  },
  {
    id: 'wellness-studio',
    clientName: 'Local Wellness Studio',
    industry: 'Health & Wellness',
    challenge: 'Posting inconsistently, no brand voice, losing potential clients to competitors with better online presence.',
    solution: 'Digital Concierge at $400/week with full content management and local SEO optimization.',
    results: [
      { metric: 'Monthly Bookings', value: '+45', improvement: 'new clients' },
      { metric: 'Google Ranking', value: 'Top 3', improvement: 'local search' },
      { metric: 'Time Saved', value: '8 hrs/week', improvement: 'on marketing' }
    ]
  }
];

export const storyTimeline: TimelineEvent[] = [
  {
    id: 'chaos',
    title: 'We started in the chaos',
    description: "Agency life. Revolving doors. Disappearing freelancers. Clients frustrated. Us too. We saw small business owners collecting marketing people like Pokemon cards — and none of them ever stuck.",
    icon: '/images/emojis/site/icon-swirl.png'
  },
  {
    id: 'question',
    title: 'We asked a different question',
    description: "What if we just... partnered with fewer people, but actually showed up for them? What if instead of scaling to 200 clients, we went deep with a handful who felt like family?",
    icon: '/images/emojis/site/icon-lightbulb.png'
  },
  {
    id: 'birth',
    title: 'Raize The Vibe was born',
    description: "A tiny studio. Family-owned. AI-powered. Built for businesses with heart. We're not trying to be the biggest agency. We're trying to be your crew.",
    icon: '/images/emojis/site/icon-star.png'
  },
  {
    id: 'philosophy',
    title: 'Our philosophy crystallized',
    description: "No revolving doors. No junior staff. No outsourcing to strangers. We serve owner-operators, mission-driven founders, people who build their communities — not just their revenue.",
    icon: '/images/emojis/site/icon-target.png'
  }
];

export const treasures: Treasure[] = [
  {
    id: 'vibe-report',
    name: 'Your Vibe Report',
    description: 'A personalized PDF breakdown of your quiz results, recommended services, and next steps.',
    icon: '/images/emojis/site/icon-document.png',
    unlockCondition: 'Complete the quiz',
    isUnlocked: false
  },
  {
    id: 'ai-playbook',
    name: 'AI Automation Playbook',
    description: 'Our internal guide to the automations we use for clients — and how you could use them too.',
    icon: '/images/emojis/site/icon-robot.png',
    unlockCondition: 'AI interest score 8+',
    isUnlocked: false
  },
  {
    id: 'priority-booking',
    name: 'Priority Booking Slot',
    description: 'Skip the queue and get a same-week consultation slot reserved for high-vibe prospects.',
    icon: '/images/emojis/site/icon-lightning.png',
    unlockCondition: 'Book a call or share results',
    isUnlocked: false
  },
  {
    id: 'secret-coupon',
    name: 'Secret Coupon',
    description: "A hidden discount code for the observant. 10% off your first project or bonus consultation time.",
    icon: '/images/emojis/site/icon-gift.png',
    unlockCondition: 'Find the hidden code',
    isUnlocked: false
  }
];

// Who we serve avatars
export const whoWeServe = [
  { id: 'trades', label: 'Local trades', emoji: '/images/emojis/local.png', description: 'Trades pros who need online presence' },
  { id: 'sober-living', label: 'Sober living homes', emoji: '/images/emojis/home.png', description: 'Recovery communities serving families' },
  { id: 'wellness', label: 'Wellness centers', emoji: '/images/emojis/healthcare.png', description: 'Healers and therapists' },
  { id: 'mission', label: 'Mission-driven founders', emoji: '/images/emojis/site/icon-heart.png', description: 'Purpose over pure profit' },
  { id: 'service-pros', label: 'Service professionals', emoji: '/images/emojis/professional.png', description: 'Consultants, coaches, experts' }
];
