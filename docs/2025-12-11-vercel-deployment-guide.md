# Vercel Deployment Guide - GHL Integration

**Date:** 2025-12-11
**Project:** Raize The Vibe Journey
**Status:** Ready for Deployment ✅

## What's Deployed

This project uses **Vite + React** with **Vercel Serverless Functions** for the GoHighLevel integration.

### Architecture

```
Frontend: Vite + React (deployed to Vercel Edge Network)
Backend: Vercel Serverless Functions (/api folder)
CRM: GoHighLevel V2 API
```

## File Structure

```
/
├── api/                           # Vercel Serverless Functions
│   └── ghl/
│       ├── create-contact.js      # POST /api/ghl/create-contact
│       └── calendar/
│           ├── availability.js    # GET /api/ghl/calendar/availability
│           └── book-appointment.js # POST /api/ghl/calendar/book-appointment
│
├── src/
│   ├── components/journey/        # Form components
│   ├── utils/sms-trigger.ts       # SMS magic trick utility
│   └── pages/TestBooking.tsx      # Test page
│
├── .env.local                     # Local development env vars
└── vercel.json                    # Vercel configuration
```

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### 2. Link Project to Vercel

```bash
vercel login
vercel link
```

### 3. Set Environment Variables in Vercel

You need to add these environment variables to your Vercel project:

#### Via Vercel Dashboard:
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add the following:

```
GHL_LOCATION_ID=7ZJdt5x1U0qMsPSjL8Ge
GHL_API_KEY=pit-1382e1c1-714e-4436-b17a-494ad68a490c
GHL_CALENDAR_ID=3T0qxuJ6UKGxrGeC5X65
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### Via Vercel CLI:

```bash
vercel env add GHL_LOCATION_ID
# Paste: 7ZJdt5x1U0qMsPSjL8Ge
# Select: Production, Preview, Development

vercel env add GHL_API_KEY
# Paste: pit-1382e1c1-714e-4436-b17a-494ad68a490c
# Select: Production, Preview, Development

vercel env add GHL_CALENDAR_ID
# Paste: 3T0qxuJ6UKGxrGeC5X65
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_SITE_URL
# Paste: https://your-domain.vercel.app
# Select: Production, Preview, Development
```

### 4. Deploy to Vercel

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Testing the Deployment

### Test Booking Form

Once deployed, visit:
```
https://your-domain.vercel.app/?test=booking
```

This will show the test booking page with mock journey data.

### Test API Endpoints

#### Test Contact Creation:
```bash
curl -X POST https://your-domain.vercel.app/api/ghl/create-contact \
  -H "Content-Type: application/json" \
  -d '{
    "contact": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "555-123-4567"
    },
    "journeyData": {
      "leadScore": 75,
      "vibePersona": "Innovation Seeker",
      "industryType": "creative"
    }
  }'
```

#### Test Calendar Availability:
```bash
curl https://your-domain.vercel.app/api/ghl/calendar/availability
```

## Local Development Testing

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Run Vercel Dev Server
```bash
vercel dev
```

This will:
- Run Vite dev server for frontend
- Run serverless functions locally
- Use your `.env.local` file for environment variables

### 3. Access Test Page
```
http://localhost:3000/?test=booking
```

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `GHL_LOCATION_ID` | Your GoHighLevel location ID | `7ZJdt5x1U0qMsPSjL8Ge` |
| `GHL_API_KEY` | Private Integration Token (PIT) | `pit-1382e1c1-...` |
| `GHL_CALENDAR_ID` | Target calendar for bookings | `3T0qxuJ6UKGxrGeC5X65` |
| `NEXT_PUBLIC_SITE_URL` | Your deployed domain | `https://journey.raizethevibe.com` |

## Vercel Function Limits

**Free Tier:**
- 100 GB-Hours of function execution
- 10 second max execution time
- 1024 MB memory per function

**Pro Tier:**
- 1000 GB-Hours of function execution
- 60 second max execution time
- Up to 3008 MB memory per function

Our functions are lightweight and should work fine on the free tier.

## Monitoring & Debugging

### View Function Logs
```bash
vercel logs
```

### Real-time Logs
```bash
vercel logs --follow
```

### Check Deployment Status
```bash
vercel ls
```

## Troubleshooting

### Issue: API routes return 404
**Solution:** Make sure `vercel.json` exists and functions are in `/api` folder

### Issue: Environment variables not working
**Solution:**
1. Check they're added in Vercel dashboard
2. Redeploy after adding env vars
3. For local dev, check `.env.local` exists

### Issue: CORS errors
**Solution:** Vercel automatically handles CORS for same-domain requests. If calling from external domain, you may need to add CORS headers to function responses.

### Issue: Function timeout
**Solution:**
1. Check if GHL API is responding slowly
2. Add timeout handling in function code
3. Consider upgrading to Pro tier for longer timeouts

## Integration with Results Page

To integrate into your quiz results page:

```typescript
import { VibeJourneyForm } from '@/components/journey/VibeJourneyForm'

// In your VibeResults component
<VibeJourneyForm
  journeyData={{
    answers: quizAnswers,
    vibePersona: calculatedPersona,
    leadScore: calculatedScore,
    painPoints: selectedPainPoints,
    industryType: selectedIndustry,
    budgetTier: selectedBudget,
    timelineUrgency: selectedTimeline,
    collaborationStyle: selectedStyle,
    aiAutomationInterest: sliderValue
  }}
  aiResponse={generatedAIResponse}
  onComplete={(appointmentId) => {
    console.log('Booked:', appointmentId)
  }}
/>
```

## Production Checklist

Before going live:

- [ ] Test all 3 API endpoints in production
- [ ] Verify GHL contacts are being created
- [ ] Verify calendar availability shows correct slots
- [ ] Verify appointments are being booked
- [ ] Test SMS magic trick on mobile device
- [ ] Check function logs for errors
- [ ] Test form validation (all fields)
- [ ] Test error handling (network failures)
- [ ] Verify email notifications from GHL
- [ ] Test on multiple browsers
- [ ] Test on iOS and Android devices

## Support

If you encounter issues:

1. Check Vercel function logs: `vercel logs`
2. Check GHL API status
3. Verify environment variables are set correctly
4. Test locally with `vercel dev` first

## Next Steps

1. **Deploy to Vercel** following steps above
2. **Test the booking flow** at `/?test=booking`
3. **Integrate into quiz results** when ready
4. **Monitor function usage** in Vercel dashboard
5. **Set up custom domain** (optional)

Generated with Claude Code
