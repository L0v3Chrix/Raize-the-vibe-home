# Raize The Vibe - The Vibe Journey

An interactive, AI-infused landing page experience that merges quiz mechanics, brand storytelling, and conversion optimization into a seamless "treasure hunt" funnel.

## 🚀 Quick Start

```bash
cd /Users/chrixcolvard/projects/2025-12-raize-the-vibe-journey

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx           # Animated hero with "Cosmic Playground" aesthetic
│   ├── VibeQuiz.tsx       # 7-question interactive quiz
│   ├── VibeResults.tsx    # Email-gated results with treasure unlocks
│   ├── StoryTimeline.tsx  # Scroll-animated brand story
│   ├── ServicesSection.tsx # Expandable service cards
│   ├── ProofSection.tsx   # Testimonials + case studies
│   ├── BookingModal.tsx   # Popup-only booking flow
│   └── Footer.tsx         # Footer with hidden coupon easter egg
├── data/
│   ├── quizData.ts        # Quiz questions + scoring config
│   └── servicesData.ts    # Services, testimonials, case studies
├── store/
│   └── vibeStore.ts       # Zustand state management
├── types/
│   └── index.ts           # TypeScript definitions
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── index.css              # Tailwind + custom styles
```

## ✨ Features

### Quiz Experience
- 7 progressive questions with forced progression
- Text, cards, multi-select, slider, and timeline inputs
- Live "Vibe Meter" progress bar
- Auto-advancing on option selection
- Visible "Next Step" button for text inputs

### Results & Gamification
- Email gate to unlock results (lead capture)
- Animated score counting up
- Persona assignment (Creative Collaborator, Innovation Seeker, etc.)
- Service recommendations based on quiz answers
- Treasure chest with unlockable content
- Hidden coupon hunt (VIBECHECK10 in footer)

### Financial Question Options (Q5)
1. Less than $1,000 one-time
2. $250/week ongoing
3. This is an investment that will make me money
4. I'll give you all my money to solve my problems
5. Show me the value first

### Services (from Master Blueprint)
- Digital Concierge ($250/$400/$600 per week)
- Brand & Website Creation
- Infotainment Funnels™ ($2,000-$5,000)
- Pay-What-You-Can Build Studio

### Design System: "Cosmic Playground"
- Primary gradient: Hot Pink → Electric Cyan → Purple
- Dark backgrounds with mesh gradients
- Framer Motion animations throughout
- Glass card effects with backdrop blur
- Responsive mobile-first design

## 🔧 Tech Stack

- **Framework:** Vite + React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** Zustand (persisted)
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## 📝 Next Steps

1. **CRM Integration:** Connect to GoHighLevel V2 API
2. **Calendar:** Embed Calendly or Cal.com
3. **AI Chat:** Add OpenAI-powered chat widget
4. **Analytics:** Set up Posthog or similar
5. **Email Automation:** Configure nurture sequences
6. **Treasure Downloads:** Create actual PDF reports

## 🎯 Conversion Flow

1. Hero → Start Quiz
2. Quiz (7 questions) → Email Gate
3. Results Reveal → Service Recommendation
4. Story + Services → Book Call (popup)
5. Thank You → Nurture Sequence

## 🔒 Lead Scoring

- Quiz completion: 10 points
- Vision answer: +5
- Pain points: +3 each
- AI interest: +1 per slider point
- Budget (ROI/All-in): +12-15
- Timeline (urgent): +10
- Collaboration (magic-maker): +10

**Tiers:**
- 0-30: Nurture
- 31-50: Warm
- 51-70: Hot
- 71+: Priority

---

Built with ❤️ by Raize The Vibe
