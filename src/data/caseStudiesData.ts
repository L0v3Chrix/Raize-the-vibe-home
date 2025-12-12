export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  metrics: {
    label: string;
    value: string;
    icon: string;
  }[];
  tags: string[];
  expandedContent?: {
    whatWeBuilt: {
      headline: string;
      details: string[];
    };
    whyItWorked: {
      headline: string;
      details: string[];
    };
    howWeDidIt: {
      headline: string;
      details: string[];
    };
    deepDive?: {
      headline: string;
      content: string;
    };
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'simsco',
    client: 'SimsCo Mechanical Plumbing',
    industry: 'HVAC / Plumbing',
    challenge: "Great plumbers, invisible online. In the service business, that's called 'starving with full toolboxes.' They needed to stand out in the local market without spending $5K/month that most agencies charge.",
    solution: "Complete local SEO domination for $400/week. Google Business Profile optimization, social media that actually generates leads (not stock photos or abandoned accounts), website improvements, and strategic consulting. Multiple paying jobs per week, every week.",
    results: [
      "30-40 new opportunities monthly from our work",
      "300-900% ROI (client pays $1,600/month, generates $5K-$15K monthly)",
      "Multiple paying jobs every single week for 7 months straight",
      "First page rankings for primary local keywords, Local 3-Pack regular"
    ],
    testimonial: {
      quote: "You guys are amazing. Best decision we made. We're getting jobs every week from what you're doing. Don't change anything. This is working.",
      author: "Justin Sims",
      role: "Owner, SimsCo Mechanical Plumbing"
    },
    metrics: [
      { label: "Monthly ROI", value: "300-900%", icon: "/images/emojis/site/icon-money-bag.png" },
      { label: "Weekly Qualified Leads", value: "8-12", icon: "/images/emojis/site/icon-phone.png" },
      { label: "Revenue Impact", value: "$5K-$15K", icon: "/images/emojis/site/icon-money-bills.png" }
    ],
    tags: ['Local SEO', 'Lead Generation', 'HVAC & Plumbing'],
    expandedContent: {
      whatWeBuilt: {
        headline: "The $400/Week All-In Package That Delivers $5K+ Value",
        details: [
          "Complete local SEO domination: Google Business Profile optimization, citation building across 40+ directories, on-page SEO, and schema markup for maximum visibility",
          "Social media that actually generates leads: 3-4x weekly posts with before/after job photos, educational content, and community engagement — not stock photos or abandoned accounts",
          "Lead generation machine: 30-40 new opportunities monthly from organic search, social media, and website improvements, converting at 30-40% to booked jobs",
          "Website optimization: Mobile-first responsive design, fast page loads, clear CTAs, service area pages, and 24/7 emergency service prominence that turns visitors into calls",
          "Strategic consulting: Monthly strategy sessions, seasonal promotion planning, competitive intelligence, and whatever else they need — because trust = going the extra mile"
        ]
      },
      whyItWorked: {
        headline: "Trust Without Bureaucracy + Results Over Reports",
        details: [
          "We actually care: No templated 'plumber SEO package' — we treat $400/week clients like $4K/month clients because that's how we operate",
          "Local market mastery: Not pushing national SEO strategies. We're dominating the local service area. Different game, better results",
          "Consistent execution: Every. Single. Week. No gaps. No excuses. No 'we'll get to it next month' — 7 months of flawless delivery",
          "Results-focused tracking: We don't report on impressions or engagement rate. We track: Did the phone ring? Did they book jobs? End of story",
          "The relationship factor: They love us. We love them. Some clients pay $4K/month and we debate canceling them. SimsCo pays $400/week and we'd never let them go"
        ]
      },
      howWeDidIt: {
        headline: "SEO + Social + Strategy = Phone Rings Weekly",
        details: [
          "Google Business Profile: Professional photos, service area expansion, regular posts, review generation system, Q&A optimization, and local keyword domination",
          "Social proof engine: Direct messages from Facebook → booked jobs. Customer testimonials (with permission). Before/after job photos. Educational content that gets shared by neighbors",
          "Technical excellence: Mobile responsiveness (emergencies happen on phones), page speed optimization, trust indicators, and clear CTAs that convert",
          "The math that works: Client pays $1,600/month, generates $5K-$15K monthly (conservative), 300-900% ROI, multiple paying jobs we can trace every single week",
          "Built on trust: No approval committees. No three-week revision cycles. They trust us, we execute, results speak louder than reports"
        ]
      },
      deepDive: {
        headline: "What 'Multiple Paying Jobs Per Week' Actually Looks Like",
        content: "Real example from June 2025: Monday's Facebook post about AC maintenance generated 2 service calls. Wednesday's Google Business post about water heater special got 3 quote requests. Friday's customer review response was seen by a neighbor who booked a new install job. That's one week. Multiply that by 7 months of consistency, and you get a local plumbing company that went from 'starving with full toolboxes' to predictable pipeline and phone calls from Google searches daily. The best part? They can't say enough great things about us, and we love them right back."
      }
    }
  },
  {
    id: 'ob1-insurance',
    client: 'OB1 Insurance',
    industry: 'Medicare / Insurance',
    challenge: "Medicare is confusing. People take MONTHS to decide. Traditional lead gen = form spam. Most funnels feel like used car sales. Kyle wanted a 'Think Different' approach that treats 65-year-olds like intelligent adults.",
    solution: "Three complete Medicare funnels with intent-based qualification, AI personalization, GoHighLevel V2 integration, plus $3,200 in surprise bonuses (30-day social calendar, 20 HeyGen scripts, complete debug suite). Delivered in 2 days instead of 21.",
    results: [
      "Delivered 19 days early with 160% ROI",
      "$2K investment → $5.2K value delivered",
      "67% conversion (up from 23%)",
      "$3.2M qualified pipeline Q4 2024",
      "Kyle's exact reaction: 'Holy shit'"
    ],
    testimonial: {
      quote: "This isn't just a funnel — it's like having a compliance-trained assistant who never sleeps. We 4x'd our qualified appointments without adding staff. During peak season, this system was worth its weight in gold.",
      author: "Kyle O'Brien",
      role: "CEO, OB1 Insurance"
    },
    metrics: [
      { label: "Conversion Rate", value: "67%", icon: "/images/emojis/site/icon-chart-up.png" },
      { label: "Q4 Pipeline", value: "$3.2M", icon: "/images/emojis/site/icon-diamond.png" },
      { label: "Time Saved", value: "-60%", icon: "/images/emojis/site/icon-lightning.png" }
    ],
    tags: ['Insurance', 'Funnel Design', 'Compliance', 'AI'],
    expandedContent: {
      whatWeBuilt: {
        headline: "Intent-Based Medicare Funnels + $3,200 in Surprise Bonuses (Delivered 19 Days Early)",
        details: [
          "Three complete Medicare funnels: 'Medicare Made Simple' (progressive assessment), 'Coverage Gap Analyzer' (AI-powered analysis), and 'Open Enrollment Expert' (urgency-driven with countdown timers)",
          "GoHighLevel V2 API integration: Friction-free duplicate handling, smart contact creation, email-phone verification, automatic tagging, lead scoring, and seamless CRM sync",
          "Production deployment perfection: Critical phone validation bug fixed, Vercel hosting with SSL/HTTPS, mobile-first responsive design, cross-browser testing, and performance optimization",
          "30-day social media calendar: Ready-to-paste post copy, custom graphics, Medicare + local NY hashtags, optimal posting schedule, direct funnel links, and performance tracking ($200+ value, FREE)",
          "20 HeyGen video scripts + complete setup: 8 education videos, 6 promotional videos, 3 testimonial-style, 3 seasonal/urgent, plus HeyGen profile setup, 11Labs voice cloning guide, and production workflow ($200+ value, FREE)",
          "Comprehensive debug suite + documentation: Console logging, form validation testing, API monitoring, error tracking, production bug reports, testing procedures, and Notion dashboard architecture ($400+ value, included)"
        ]
      },
      whyItWorked: {
        headline: "'Think Different' Actually Meant Treating Seniors Like Intelligent Adults",
        details: [
          "Education over pressure: Most Medicare funnels use high-pressure sales tactics and form spam. We built progressive, intent-based qualification that educates without manipulating",
          "Respect-first approach: Medicare decisions are high-stakes ($30K+ over lifetime). We treated 65-year-olds like the intelligent adults they are, not targets to manipulate",
          "AI personalization done right: Custom response generation based on coverage needs and urgency, not generic template responses. Real insights, real value",
          "Over-delivery as standard: Kyle paid $2,000 for three funnels. He got $5,200+ in value delivered 19 days early, including bonuses worth more than the project itself",
          "Speed with excellence: 2-day delivery doesn't mean rushed. It means we know what we're doing and execute without bureaucracy or approval theater"
        ]
      },
      howWeDidIt: {
        headline: "Multi-Step Funnels + GHL V2 API + Production Excellence",
        details: [
          "Progressive assessment architecture: Multi-step question flows with real-time qualification, Medicare knowledge education, soft-sell conversion, and calendar booking integration",
          "Technical execution: Phone validation that actually works (fixed critical bug in production), GoHighLevel V2 API with smart duplicate handling, mobile-optimized responsive design",
          "AI-powered gap analysis: Intelligent coverage gap detection, personalized recommendations based on existing Medicare plans, educational content that builds trust, not fear",
          "Countdown timer urgency (non-scammy): Live timers for Open Enrollment period, express booking system, priority consultation fast-tracking, limited-time positioning that respects intelligence",
          "The surprise bonuses: Social media calendar with 30 days of ready-to-post content, HeyGen video production complete setup guide, debugging suite for self-service troubleshooting, comprehensive docs package"
        ]
      },
      deepDive: {
        headline: "What '$2K → $5.2K Value, 19 Days Early' Teaches About Excellence",
        content: "Kyle paid $2,000 for three Medicare funnels with a 21-day timeline. We delivered in 2 days with GoHighLevel V2 integration, AI personalization, production debugging, and bonuses including a 30-day social calendar and 20 HeyGen scripts. His exact reaction: 'Holy shit.' The lesson? Speed doesn't compromise quality when you know what you're doing. Over-delivery isn't a 'bonus strategy' — it's how we operate. And treating insurance clients with respect instead of sales pressure isn't revolutionary, it's just right. The result: 67% funnel conversion (up from 23%), $3.2M qualified pipeline in Q4 2024, Kyle's call load reduced 60%, and 100% CMS compliance maintained. That's what happens when 'Think Different' is real, not marketing speak."
      }
    }
  },
  {
    id: 'legacy-strategies',
    client: '1322 Legacy Strategies',
    industry: 'Financial Education',
    challenge: "Teaching infinite banking is complex. Text-heavy sites convert at 4% and feel intimidating. Chris needed to educate skeptical entrepreneurs without overwhelming them or sounding like a scam.",
    solution: "Complete ecosystem transformation: Educational platform (~$30K value), Legacy Command Center AI (~$100K+ value with 250+ field extraction), 12+ applications and tools, multi-AI orchestration, GoHighLevel V2 with 250+ custom fields, Three.js visualizations.",
    results: [
      "$20K investment → $180K+ value (900% ROI)",
      "Site conversion: 4% → 19%",
      "Time on site: 47 sec → 7 min 23 sec",
      "49 blog posts, 340% SEO traffic increase",
      "Idea → multi-million dollar empire"
    ],
    testimonial: {
      quote: "Y'all made infinite banking feel accessible. Before this site, people were intimidated. Now they're excited to learn. The blog integration alone has brought us more qualified leads than any ad campaign we've ever run.",
      author: "Brad Raschke",
      role: "Founder, 1322 Legacy Strategies"
    },
    metrics: [
      { label: "Conversion Rate", value: "19%", icon: "/images/emojis/site/icon-target.png" },
      { label: "Time on Site", value: "7:23", icon: "/images/emojis/site/icon-stopwatch.png" },
      { label: "SEO Traffic", value: "+340%", icon: "/images/emojis/site/icon-rocket.png" }
    ],
    tags: ['Education', 'Financial Services', 'Content Strategy'],
    expandedContent: {
      whatWeBuilt: {
        headline: "From Idea to Multi-Million Dollar Empire + $100K AI Intelligence Platform (900% ROI)",
        details: [
          "Educational platform ecosystem (~$30K value): Next.js 14 learning hub with complete curriculum, interactive calculators showing real policy illustrations, video journey progressively revealing concepts, 49+ educational articles",
          "Legacy Command Center AI (~$100K+ value): Revolutionary 250+ field extraction system, 10 integrated modules, spaceship-style dashboard, multi-AI orchestration (Whisper, Claude, GPT-4, HeyGen)",
          "Complete business ecosystem (~$50K value): 12+ applications, tools, and automation systems. Three.js 3D visualizations. GoHighLevel V2 with 250+ custom fields. 14GB organized master repository",
          "Content strategy that converts: Notion-powered blog integration for SEO, personality-infused design on every pixel, education-first approach that doesn't overwhelm or sound like a scam",
          "Technical excellence foundation: Performance optimization (<3s load times), accessibility compliance (WCAG 2.1 AA), production-ready deployments, mobile-first responsive design"
        ]
      },
      whyItWorked: {
        headline: "Education Over Hard-Sell + Exceptional Design + AI Innovation",
        details: [
          "Made the complex feel accessible: Teaching infinite banking is hard. Text-heavy, intimidating sites convert at 4%. We made it feel human, approachable, and exciting to learn",
          "Time on site explosion: 47 seconds → 7 minutes 23 seconds average. People don't just visit, they stay, explore, and engage with the content journey",
          "SEO compounding: 49 blog posts published, 340% traffic increase in 6 months. Content that educates brings more qualified leads than any ad campaign they've run",
          "Value over budget: $20K investment (5 months × $4K retainer) delivered $180K+ in value. Educational platform + $100K AI system + tools ecosystem. That's 900% ROI",
          "Long-term partnership: This wasn't a transaction. This was transforming an idea into a multi-million dollar educational empire with technology that competitors can't touch"
        ]
      },
      howWeDidIt: {
        headline: "Next.js 14 + Multi-AI Orchestration + Classical Design Aesthetic",
        details: [
          "Interactive learning systems: Calculators with real policy illustrations, video journey with progressive concept reveals, Q&A systems, mobile-optimized UX",
          "AI intelligence platform: Whisper for transcription, Claude for analysis, GPT-4 for generation, HeyGen for video. 250+ field extraction from documents, 10 integrated workflow modules",
          "Content as SEO strategy: Notion integration for easy publishing, education-first content that ranks, personality on every page that converts skeptics into learners",
          "Classical educational aesthetic: Clean, professional design that feels academic but human. Trust-building visual language. Typography and spacing that invites 7-minute reading sessions",
          "Positioned as 'the human, approachable' IBC educators: Not another financial bro selling hard. The team that makes complex concepts feel accessible and exciting"
        ]
      },
      deepDive: {
        headline: "What Happens When You Transform Ideas Into Empire",
        content: "Chris Colvard (founder of 1322, also founder of Raize The Vibe) started with a vision for making infinite banking accessible. Over 5 months at $4K/month, we didn't just build a website — we created an educational platform that turns skeptical entrepreneurs into excited learners. The site conversion went from 4% (text-heavy intimidation) to 19% (engaging education). But the real transformation? The $100K+ AI Intelligence Platform that processes documents with 250+ field extraction, orchestrates multiple AI systems, and runs on a spaceship dashboard. That's the difference between hiring a dev shop and partnering with a studio that over-delivers as standard. $20K investment, $180K+ value delivered, multi-million dollar empire potential unlocked."
      }
    }
  },
  {
    id: 'help-now-atx',
    client: 'Help Now of Austin',
    industry: 'Community Services',
    challenge: "Families in crisis need help at 2am when they're stressed and can't sleep. The old intake process was a 45-minute phone nightmare. Caseworkers spent 15 hours/week just collecting basic information.",
    solution: "Crisis-responsive Progressive Web App with smart branching logic, multilingual support (English/Spanish), 100+ verified Travis County resources, one-click emergency calling, 24/7 accessibility. Intake time: 45 min → 8 min.",
    results: [
      "2,000+ monthly visitors finding help",
      "Caseworkers freed up 60 hours/month",
      "95% completion rate (families don't drop off)",
      "Families get resources 3x faster",
      "Priceless community impact"
    ],
    testimonial: {
      quote: "Built and managed by Raize The Vibe as a community impact project. 2,000+ monthly visitors, thousands of hours saved for caseworkers, families getting help 3x faster. Some projects aren't measured in ROI — they're measured in lives changed.",
      author: "Raize The Vibe Team",
      role: "Community Impact Project"
    },
    metrics: [
      { label: "Time Saved Monthly", value: "60 hrs", icon: "/images/emojis/site/icon-clock.png" },
      { label: "Completion Rate", value: "95%", icon: "/images/emojis/site/icon-check.png" },
      { label: "Families Served", value: "+180%", icon: "/images/emojis/site/icon-heart.png" }
    ],
    tags: ['Nonprofit', 'Forms', 'Accessibility', 'Impact'],
    expandedContent: {
      whatWeBuilt: {
        headline: "2,000+ Monthly Visitors, Thousands of Hours Saved, Priceless Community Impact",
        details: [
          "Crisis-responsive Progressive Web App: Mobile-first emergency resource platform designed for families in crisis who need help at 2am when they're stressed and can't sleep",
          "Compassionate intake funnel: Smart branching logic with 6-8 questions, immediate connection to relevant resources, pre-qualified organized information for caseworkers",
          "Accessibility excellence: Multilingual support (English/Spanish), mobile-optimized for any device, anonymous fast access design, one-click emergency calling",
          "100+ verified Travis County resources: Curated, verified community resources. Families get resource connections 3x faster than before with 95% completion rate",
          "Time-saving infrastructure: Intake reduced from 45 minutes per family to 8 minutes. Caseworkers freed up 60 hours monthly for actual service delivery instead of paperwork"
        ]
      },
      whyItWorked: {
        headline: "Compassion + Speed + Accessibility = Lives Changed",
        details: [
          "Human-centered crisis design: Families don't drop off like they used to. 95% completion because the system respects the stress they're under and meets them where they are",
          "Caseworkers got their time back: 60 hours monthly saved from paperwork → redirected to actually helping people. That's the whole point of technology in community services",
          "2am accessibility matters: People in crisis don't wait for office hours. They need help when they need help. Mobile-first PWA means help is always available",
          "Priceless impact measurement: Some results can't be captured in dollar signs. Families getting help faster, caseworkers serving more people, community resources actually reaching those who need them",
          "Mission over margin: This project wasn't about maximizing profit. It was about maximizing impact. Some work just matters more"
        ]
      },
      howWeDidIt: {
        headline: "Progressive Web App + Smart Branching + Mobile-First UX",
        details: [
          "PWA technology: Works offline, installs like an app, fast loading even on slow connections, accessible from any device at any time",
          "Smart branching logic: 6-8 questions adapt based on crisis type, immediate relevant resource connections, no wasted time on irrelevant questions",
          "Multilingual by default: English/Spanish support built in, not as an afterthought. Families shouldn't have to struggle with language when they're already struggling with life",
          "One-click emergency calling: Crisis response can't wait for form completion. Emergency numbers are always one tap away, no navigation required",
          "Verified resource database: 100+ Travis County resources, all verified and current. Families don't get sent to outdated phone numbers or closed services"
        ]
      },
      deepDive: {
        headline: "What 'Mission Over Margin' Looks Like in Practice",
        content: "Help Now ATX serves families in crisis. Their old intake process was a 45-minute phone nightmare that left caseworkers spending 15 hours weekly just collecting basic information. We built a compassionate intake system that reduced intake time to 8 minutes, freed up 60 hours monthly for actual service delivery, and achieved a 95% completion rate (families don't drop off anymore). The system handles 2,000+ monthly visitors, works at 2am when families can't sleep, supports English and Spanish, and connects people to resources 3x faster than before. Some projects aren't measured in ROI percentages — they're measured in lives changed, hours saved, and families helped. This is one of those projects. And it's exactly the kind of work that reminds us why we do what we do."
      }
    }
  },
  {
    id: 'relid',
    client: 'ReLid',
    industry: 'Industrial B2B / Manufacturing',
    challenge: "Making can lids. Not sexy, right? They needed to move from Etsy shop (losing 6.5% on every sale) to own brand presence that positions American innovation as premium. Shopify was overkill and limiting.",
    solution: "Custom Next.js e-commerce with visual product configurator (real-time 3D previews), bold American industrial design system, Stripe checkout, zero monthly platform fees. Made aluminum packaging technology look like the future.",
    results: [
      "Etsy → Own brand domain (100% profit, not 93.5%)",
      "45% AOV increase through configurator upsells",
      "$347/month Shopify fees saved (paid for itself in 4 months)",
      "28% fewer support tickets",
      "Client 'extremely happy'"
    ],
    testimonial: {
      quote: "We went from being an Etsy shop to having our own brand. The configurator is slick — customers love seeing exactly what they're ordering before they buy. And no more Shopify fees eating into our margins.",
      author: "ReLid USA",
      role: "Aluminum Packaging Technology"
    },
    metrics: [
      { label: "AOV Increase", value: "+45%", icon: "/images/emojis/site/icon-money-bills.png" },
      { label: "Monthly Savings", value: "$347", icon: "/images/emojis/site/icon-money-bag.png" },
      { label: "Support Tickets", value: "-28%", icon: "/images/emojis/site/icon-chart-down.png" }
    ],
    tags: ['E-commerce', 'Custom Build', 'Product Config'],
    expandedContent: {
      whatWeBuilt: {
        headline: "When Your Product IS The Design: Making Can Lids Look Like The Future",
        details: [
          "Complete brand transformation: Bold American industrial design system that positioned US innovation above European parent brand. Engineering-focused messaging that speaks to quality",
          "Custom Next.js e-commerce site: Visual product configurator with real-time 3D previews, checkout integration with Stripe, automated order routing to production workflow",
          "One-page scroll website experience: B2B positioning excellence, 3D renders and technical diagrams, complete aluminum packaging technology showcase",
          "Zero monthly platform fees: Custom solution paid for itself in 4 months (saved $347/month in Shopify fees). Moved off Etsy to own brand domain, kept 100% of profit (not 6.5% to Etsy)",
          "Product configurator that sells: Customers see exactly what they're ordering before they buy. 45% average order value increase through upsells, 28% fewer customer service questions"
        ]
      },
      whyItWorked: {
        headline: "Premium Positioning + Visual Product Config + American Innovation",
        details: [
          "Your product IS the design: ReLid makes can lids. Not sexy, right? Wrong. We made aluminum packaging technology look like the future of American manufacturing",
          "Own brand presence matters: Etsy was eating 6.5% of every sale. Own domain means 100% profit retention, complete brand control, and premium positioning",
          "Visual configurator reduces friction: Real-time 3D preview means customers know exactly what they're getting. Colors, sizes, engraving options — all visible before checkout",
          "Custom build ROI: Shopify would cost $347/month forever. Custom Next.js solution paid for itself in 4 months and will never charge monthly fees again",
          "Engineering + design excellence: B2B customers want to know the product is serious. Bold industrial design + technical diagrams + quality messaging = trust and conversions"
        ]
      },
      howWeDidIt: {
        headline: "Next.js E-commerce + 3D Product Config + Bold Industrial Design",
        details: [
          "Visual product configurator: Real-time 3D renders as customers select options (colors, sizes, engraving). Upsells integrated naturally into the visual experience",
          "Stripe checkout integration: Secure payment processing, automated order routing to production workflow, inventory management, customer account system",
          "One-page scroll storytelling: American innovation narrative, technical product diagrams, engineering quality messaging, B2B trust indicators",
          "3D renders and technical excellence: Product photography that showcases precision manufacturing, engineering diagrams that build confidence, industrial aesthetic that feels premium",
          "No platform fees forever: Custom build means no Shopify subscription, no Etsy commission, no monthly SaaS costs. One-time investment, infinite runway"
        ]
      },
      deepDive: {
        headline: "From Etsy Shop to American Manufacturing Brand",
        content: "ReLid makes custom replacement lids for Stanley/Yeti tumblers. Sounds simple, right? But they needed to move from being an Etsy shop (losing 6.5% on every sale) to having their own brand presence that positions American innovation as premium. We built a custom Next.js e-commerce site with a visual product configurator that shows real-time 3D previews as customers select colors, sizes, and engraving. The result: 45% increase in average order value (configurator upsells work), $347 monthly savings in Shopify fees (custom solution paid for itself in 4 months), 28% fewer support tickets (customers know exactly what they're ordering), and a brand that feels like American industrial excellence. Sometimes it's not about the can lid — it's about making precision manufacturing look like the future it deserves to be."
      }
    }
  },
  {
    id: 'recovery-centered-living',
    client: 'Recovery Centered Living',
    industry: 'Healthcare / Recovery Services',
    challenge: "Running sober living homes means juggling operations, compliance, resident management, and constant state reporting. Most homes use spreadsheets, paper files, and prayer. They needed a complete platform transformation but couldn't afford $445K upfront.",
    solution: "Pay-what-you-want for Phase 1 website ($10K value), then 7-phase platform transformation: Operations management, HIPAA-compliant resident system, compliance automation, analytics dashboard, mobile apps (Flutter iOS/Android), and commercial multi-tenant SaaS. Building the industry's operating system.",
    results: [
      "Started with pay-what-you-want (generosity works)",
      "$445K total platform value across 7 phases",
      "Phase 1 website delivered (full value, zero pressure)",
      "White-label vision for 15,000+ US sober living homes",
      "$15M-$30M projected SaaS exit potential"
    ],
    testimonial: {
      quote: "They believed in our mission before we could afford to pay what it's worth. That's rare. Now we're building something that could transform the entire industry.",
      author: "Slade and Chloe Skaggs",
      role: "Founders, Recovery Centered Living"
    },
    metrics: [
      { label: "Platform Value", value: "$445K", icon: "/images/emojis/site/icon-diamond.png" },
      { label: "Exit Potential", value: "$15M-$30M", icon: "/images/emojis/site/icon-rocket.png" },
      { label: "Homes (Target)", value: "15,000+", icon: "/images/emojis/site/icon-heart.png" }
    ],
    tags: ['Healthcare', 'Platform Development', 'HIPAA', 'Mission-Driven'],
    expandedContent: {
      whatWeBuilt: {
        headline: "Pay-What-You-Want → $445K Platform: Proving Generosity Works",
        details: [
          "Phase 1 professional website: Pay-what-you-want model ($10K value delivered with zero pressure), warm hope-focused design, complete brand foundation",
          "7-phase platform roadmap: Operations Management System, HIPAA-compliant Resident Management, Compliance Automation, Analytics Dashboard, Mobile Apps (Flutter iOS/Android)",
          "Commercial multi-tenant SaaS vision: White-label solution for 15,000+ US sober living homes, industry transformation potential, $15M-$30M projected exit value",
          "HIPAA-compliant infrastructure: Healthcare-grade security, resident privacy protection, state reporting automation, audit trail systems",
          "Scalable architecture: Multi-tenant SaaS foundation, mobile-first design philosophy, enterprise-level platform engineering"
        ]
      },
      whyItWorked: {
        headline: "Mission Over Margin + Long-Term Partnership Vision",
        details: [
          "Generosity creates abundance: Pay-what-you-want Phase 1 built trust and proved our mission alignment. Now building a $445K platform together",
          "Industry transformation potential: Not just building software for one home — creating the operating system for 15,000+ sober living facilities nationwide",
          "Long-term partnership thinking: This isn't a transaction. This is years of collaboration to build something that could change recovery care forever",
          "White-label SaaS strategy: Commercial platform with exit potential ($15M-$30M) while maintaining mission-driven values",
          "From website to empire: Started with pay-what-you-want, evolved into platform that could transform an entire industry"
        ]
      },
      howWeDidIt: {
        headline: "Next.js + Flutter + HIPAA Compliance + Multi-Tenant Architecture",
        details: [
          "Phase 1 foundation: Next.js website with warm, hope-focused design. Complete brand identity. Professional presence that reflects their mission",
          "HIPAA compliance from day one: Healthcare-grade security architecture, encrypted resident data, audit logging, state reporting compliance",
          "Mobile-first platform: Flutter apps for iOS/Android, operations management on the go, resident check-ins and compliance tracking from anywhere",
          "Multi-tenant SaaS architecture: Scalable infrastructure for 15,000+ homes, white-label customization, enterprise-level performance and reliability",
          "Phased transformation approach: 7 phases allow manageable investment over time, continuous value delivery, iterative improvement and feedback"
        ]
      },
      deepDive: {
        headline: "What 'Pay-What-You-Want for a $445K Platform' Teaches About Business",
        content: "Slade and Chloe run Recovery Centered Living and needed a complete digital transformation. The problem? A full HIPAA-compliant platform with operations management, resident tracking, compliance automation, analytics, and mobile apps would cost $445K. They couldn't afford it upfront. So we started with pay-what-you-want for Phase 1 (professional website worth $10K). Zero pressure. Full value. Mission alignment over margin. That trust turned into a 7-phase platform partnership worth $445K total. But the real vision? White-label this platform for 15,000+ US sober living homes. Create the industry's operating system. Projected exit value: $15M-$30M. This is what happens when you believe in people's mission before they can afford to pay what it's worth. Generosity isn't charity — it's the foundation of transformation."
      }
    }
  },
  {
    id: 'rcl',
    client: 'Raize The Vibe (You\'re Here!)',
    industry: 'Digital Agency',
    challenge: "Most agencies have boring websites. We needed to practice what we preach AND qualify leads without wasting time on discovery calls with people who aren't a fit.",
    solution: "This interactive vibe check quiz you just took. It's lead qualification + personality test + product demonstration. The treasure hunt, custom emojis, PDF generation, AI personalization — all stuff we'd build for clients, applied to ourselves.",
    results: [
      "65-75% quiz completion rate (industry average is 35-40%)",
      "Qualified leads book calls 3x more often than cold outreach",
      "Reduced discovery call time by 40% (quiz pre-qualifies needs)",
      "This case study exists because you read this far (you're awesome)"
    ],
    testimonial: {
      quote: "If you're reading this, you already know if we vibe or not. That's the whole point. We're not for everyone, and that's okay. We're for the people who get it.",
      author: "The Raize The Vibe Team",
      role: "Nerds with Good Taste"
    },
    metrics: [
      { label: "Completion Rate", value: "65%", icon: "/images/emojis/site/icon-target.png" },
      { label: "Qualified Leads", value: "+3x", icon: "/images/emojis/site/icon-rocket.png" },
      { label: "Vibe Score", value: "100", icon: "/images/emojis/site/icon-sparkles.png" }
    ],
    tags: ['Meta', 'Lead Qualification', 'Interactive'],
    expandedContent: {
      whatWeBuilt: {
        headline: "Practicing What We Preach: The Interactive Vibe Check You Just Took",
        details: [
          "Interactive vibe check quiz: Part lead qualification, part personality test, part demonstration of what we build for clients. You know if we vibe or not before you ever book a call",
          "Treasure hunt gamification: Custom emojis, PDF generation, personality-based results, AI-powered personalization, hidden easter eggs — all the stuff we'd build for clients, applied to ourselves",
          "Intent-based lead qualification: 65-75% completion rate (industry average is 35-40%). People who finish the quiz book calls 3x more often than cold outreach ever delivered",
          "Modern tech stack showcase: Next.js 14, TypeScript, Framer Motion, AI integration, GoHighLevel CRM, real-time personalization — all deployed and performing in production",
          "Discovery call optimization: 40% reduction in discovery time because quiz pre-qualifies needs, captures pain points, identifies budget/timeline, and determines if we're a good fit"
        ]
      },
      whyItWorked: {
        headline: "Dogfooding + Personality + Exceptional Design = Perfect Filtering",
        details: [
          "We're not for everyone (and that's okay): The vibe check filters out people who want boring, corporate, template approaches. We only talk to people who get it",
          "Qualification before conversation: Why waste 30 minutes on a call with someone who's not a fit? Quiz tells us everything we need to know before calendars get involved",
          "Demonstration beats explanation: Most agencies have boring websites. We built something that feels human, fun, and actually demonstrates our capabilities. You've experienced what we can build",
          "65-75% completion rate proves it: Industry average is 35-40%. Our quiz completion is nearly double because the experience is delightful, valuable, and worth finishing",
          "3x qualified lead conversion: People who complete the quiz book calls 3x more often than cold outreach. They're pre-sold, pre-qualified, and actually excited to talk"
        ]
      },
      howWeDidIt: {
        headline: "Next.js 14 + AI Personalization + Gamification + Design Excellence",
        details: [
          "Progressive question flow: 7 questions that feel conversational, not interrogational. Multi-step design with progress indicators. Smart branching that adapts to answers",
          "AI-powered personalization: OpenAI GPT-4o generates custom response based on your exact answers. Not template responses — actual insights about your specific situation",
          "Vibe scoring algorithm: Calculates 0-100 score with personality assignment (Creative Collaborator, Innovation Seeker, Growth Accelerator, Systems Builder, Brand Visionary)",
          "Treasure hunt elements: Custom emoji generation with transparency post-processing, PDF report generation, hidden secrets, personality-based recommendations, service tier matching",
          "Design that delights: Every pixel inspires engagement, micro-animations on all interactions, custom iconography, scroll storytelling, screenshot-worthy moments throughout"
        ]
      },
      deepDive: {
        headline: "This Case Study Exists Because You Read This Far (You're Awesome)",
        content: "Most agency websites have a contact form and some stock photos. We built an interactive vibe check quiz that doubles as lead qualification, personality assessment, and product demonstration. The quiz you just took? That's what we build for clients — intent-based funnels that convert at 65-75% (industry average is 35-40%), qualify leads before calls happen, and create delightful experiences people actually want to complete. The result: qualified leads book calls 3x more often than cold outreach, discovery time reduced 40% because we already know what they need, and we only talk to people who actually vibe with our approach. If you're reading this case study, you already know if we're a good fit or not. That's the whole point. We're not for everyone, and that's perfectly okay. We're for the people who get it."
      }
    }
  }
];
