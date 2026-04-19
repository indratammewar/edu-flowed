
User wants AI image-to-text analysis with a fixed prompt. Use Lovable AI Gateway with google/gemini-2.5-flash (supports vision). No API key needed.

Plan:

## Add AI Image Analyzer

**What it does**: User uploads an image containing text → fixed prompt sent with image to AI → result displayed.

**Use case examples** (pick one or customize):
- Extract text from notes/handwriting
- Summarize textbook page
- Solve math problem from photo
- Explain diagram

### Implementation

1. **Edge function** `supabase/functions/analyze-image/index.ts`
   - Accepts `{ imageBase64 }` from client
   - Calls Lovable AI Gateway (`google/gemini-2.5-flash`) with fixed system prompt + image
   - Returns AI response
   - Handles 429/402 errors
   - Uses pre-configured `LOVABLE_API_KEY` (no setup needed)

2. **New page** `src/pages/AIAssistant.tsx`
   - File input (accept images)
   - Convert to base64, preview thumbnail
   - "Analyze" button → invokes edge function
   - Loading state + result card with markdown rendering
   - Toast on errors

3. **Routing & nav**
   - Add `/ai-assistant` route in `src/App.tsx`
   - Add sidebar item in `AppSidebar.tsx` (Sparkles icon, "AI Assistant")
   - Add to `MobileNav.tsx`

4. **Fixed prompt** (default — confirm/edit after):
   > "Extract all text from this image. If it contains a question or problem, provide a clear step-by-step explanation. Format the response in markdown."

### Tech notes
- No DB changes needed (results are ephemeral). Can add history table later if wanted.
- Free with Lovable AI included credits.
- Image sent as base64 data URL inline to gateway (no storage bucket needed for one-shot use).

### Optional add-ons (ask later)
- Save analysis history to DB
- Multiple preset prompts (OCR, summarize, solve, translate)
- Upload to storage bucket for reuse

