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
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'simsco',
    client: 'SimsCo Electric',
    industry: 'Local Trades',
    challenge: "SimsCo was getting lost in the Google shuffle. Their 2012-era website wasn't mobile-friendly, and most calls were from tire-kickers who found them on random directories. They needed to stand out as the premium choice in Austin electrical work.",
    solution: "We built a modern booking funnel that showcases their master electrician certifications, before/after project galleries, and real-time availability. Added AI chat that pre-qualifies leads based on project scope, so they only talk to serious customers ready to book.",
    results: [
      "Booked calls went from 12/month to 47/month in first 90 days",
      "Average project value increased 32% (attracting better clients)",
      "Reduced time-wasting inquiry calls by 68% with AI pre-qualification",
      "Now ranking #1 for 'emergency electrician Austin' in Google"
    ],
    testimonial: {
      quote: "I was skeptical about the whole 'AI thing' but holy shit, it works. We're booked solid with good customers who actually pay on time. My phone rings less but we're making more money. That's the dream.",
      author: "Mike Simmons",
      role: "Owner, SimsCo Electric"
    },
    metrics: [
      { label: "Monthly Qualified Leads", value: "47", icon: "/images/emojis/site/icon-phone.png" },
      { label: "Project Value Increase", value: "+32%", icon: "/images/emojis/site/icon-money-bag.png" },
      { label: "Time Saved Weekly", value: "8 hrs", icon: "/images/emojis/site/icon-clock.png" }
    ],
    tags: ['Local Trades', 'Lead Gen', 'AI Automation']
  },
  {
    id: 'ob1-insurance',
    client: 'OB1 Insurance',
    industry: 'Medicare / Insurance',
    challenge: "Medicare enrollment season is insane. OB1 was drowning in compliance requirements while trying to scale. Their funnel was converting at 23%, and Kyle was personally handling 80+ calls/week. They needed to scale without losing the human touch.",
    solution: "Created a 7-question quiz funnel that segments prospects by eligibility, coverage needs, and urgency. Built compliance-friendly AI responses that educate without 'selling.' Integrated with their GHL CRM for automated follow-up sequences based on quiz results.",
    results: [
      "Funnel conversion jumped from 23% to 67% in one enrollment period",
      "Reduced Kyle's personal call load by 60% (AI handled qualification)",
      "Maintained 100% CMS compliance (zero violations during audit)",
      "$3.2M in qualified pipeline generated in Q4 2024"
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
    tags: ['Insurance', 'Funnel Design', 'Compliance', 'AI']
  },
  {
    id: 'legacy-strategies',
    client: '1322 Legacy Strategies',
    industry: 'Financial Education',
    challenge: "Teaching infinite banking concepts is complex. Their old site was text-heavy, intimidating, and converting at 4%. They needed to educate skeptical entrepreneurs without overwhelming them or sounding like a scam.",
    solution: "Redesigned the entire site with a 'education-first' approach. Created interactive calculators showing real policy illustrations, video journey that progressively reveals concepts, and a Notion-powered blog integration for 49+ educational articles. Added personality to every pixel.",
    results: [
      "Site conversion increased from 4% to 19% (booked consultation calls)",
      "Average time on site jumped from 47 seconds to 7 min 23 sec",
      "49 blog posts published (SEO traffic up 340% in 6 months)",
      "Positioned as 'the human, approachable' IBC educators in their market"
    ],
    testimonial: {
      quote: "Y'all made infinite banking feel accessible. Before this site, people were intimidated. Now they're excited to learn. The blog integration alone has brought us more qualified leads than any ad campaign we've ever run.",
      author: "Chris Colvard",
      role: "Founder, 1322 Legacy Strategies"
    },
    metrics: [
      { label: "Conversion Rate", value: "19%", icon: "/images/emojis/site/icon-target.png" },
      { label: "Time on Site", value: "7:23", icon: "/images/emojis/site/icon-stopwatch.png" },
      { label: "SEO Traffic", value: "+340%", icon: "/images/emojis/site/icon-rocket.png" }
    ],
    tags: ['Education', 'Financial Services', 'Content Strategy']
  },
  {
    id: 'help-now-atx',
    client: 'Help Now of Austin',
    industry: 'Community Services',
    challenge: "Help Now serves families in crisis, but their intake process was a phone-call nightmare. Caseworkers were spending 15 hours/week just collecting initial information. Families needed immediate help, but the process was slow and frustrating.",
    solution: "Built a compassionate intake funnel with smart branching logic. Families answer 6-8 questions, get immediately connected to relevant resources, and caseworkers receive pre-qualified, organized information. Added multilingual support (English/Spanish) and mobile-first design for accessibility.",
    results: [
      "Intake time reduced from 45 min/family to 8 minutes",
      "Caseworkers freed up 60 hours/month for actual service delivery",
      "Families get resource connections 3x faster than before",
      "95% completion rate (families don't drop off like they used to)"
    ],
    testimonial: {
      quote: "This system gave us our time back so we can actually help people. Families love that they can apply at 2am when they're stressed and can't sleep. It's compassionate, efficient, and exactly what we needed.",
      author: "Sarah Martinez",
      role: "Executive Director, Help Now of Austin"
    },
    metrics: [
      { label: "Time Saved Monthly", value: "60 hrs", icon: "/images/emojis/site/icon-clock.png" },
      { label: "Completion Rate", value: "95%", icon: "/images/emojis/site/icon-check.png" },
      { label: "Families Served", value: "+180%", icon: "/images/emojis/site/icon-heart.png" }
    ],
    tags: ['Nonprofit', 'Forms', 'Accessibility', 'Impact']
  },
  {
    id: 'relid',
    client: 'ReLid',
    industry: 'Custom Manufacturing',
    challenge: "ReLid makes custom replacement lids for Stanley/Yeti tumblers. They were selling on Etsy but needed their own brand presence and e-commerce that could handle customization options (colors, sizes, engraving). Shopify was overkill and limiting.",
    solution: "Built a custom Next.js e-commerce site with a visual product configurator. Customers see real-time 3D previews as they select options, checkout integration with Stripe, and automated order routing to their production workflow. Zero monthly Shopify fees.",
    results: [
      "Moved off Etsy to own brand domain (kept 100% of profit, not 6.5%)",
      "Average order value increased 45% with product configurator upsells",
      "Saved $347/month in Shopify fees (custom solution paid for itself in 4 months)",
      "Product configurator led to 28% fewer customer service questions"
    ],
    testimonial: {
      quote: "We went from being an Etsy shop to having our own brand. The configurator is slick — customers love seeing exactly what they're ordering before they buy. And no more Shopify fees eating into our margins.",
      author: "Jason Reid",
      role: "Co-Founder, ReLid"
    },
    metrics: [
      { label: "AOV Increase", value: "+45%", icon: "/images/emojis/site/icon-money-bills.png" },
      { label: "Monthly Savings", value: "$347", icon: "/images/emojis/site/icon-money-bag.png" },
      { label: "Support Tickets", value: "-28%", icon: "/images/emojis/site/icon-chart-down.png" }
    ],
    tags: ['E-commerce', 'Custom Build', 'Product Config']
  },
  {
    id: 'rcl',
    client: 'Raize The Vibe (You\'re Here!)',
    industry: 'Digital Agency',
    challenge: "We needed to practice what we preach. Most agencies have boring, corporate websites. We wanted something that felt human, fun, and actually demonstrated our capabilities. Plus, we needed a way to qualify leads without spending hours on discovery calls with people who weren't a fit.",
    solution: "Built this interactive vibe check quiz you just took. It's part lead qualification, part personality test, part demonstration of what we can do. The treasure hunt, custom emojis, PDF generation — it's all stuff we'd build for clients. We're dogfooding our own product.",
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
    tags: ['Meta', 'Lead Qualification', 'Interactive']
  }
];
