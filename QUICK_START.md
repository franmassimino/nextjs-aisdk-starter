# Quick Start Guide

## Setup (1 minute)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your OpenAI API key:**
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your-key-here" > .env.local
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

## Features

### Chat
- Type any message and get streaming AI responses
- Powered by GPT-4o-mini

### Image Generation
Ask the AI to create images:
- "Generate an image of a sunset over mountains"
- "Create a futuristic city"
- "Draw a cute robot"

Uses DALL-E 3 for high-quality HD images (1024x1024).

## File Structure

```
src/
├── app/
│   ├── api/chat/route.ts     ← AI chat + image generation
│   └── page.tsx              ← Main UI
├── components/
│   └── chat.tsx              ← Chat component
└── lib/tools/
    └── generate-image.ts     ← DALL-E 3 tool
```

## Common Customizations

### Change chat model
Edit `src/app/api/chat/route.ts`:
```typescript
model: openai('gpt-4o')  // or 'gpt-4', 'gpt-3.5-turbo'
```

### Change image size
Edit `src/lib/tools/generate-image.ts`:
```typescript
size: '1792x1024'  // Options: 1024x1024, 1024x1792, 1792x1024
```

### Change image style
Edit `src/lib/tools/generate-image.ts`:
```typescript
style: 'natural'  // Options: 'vivid' (default) or 'natural'
```

## Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Then add `OPENAI_API_KEY` in Vercel dashboard → Settings → Environment Variables.

## Troubleshooting

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Images not showing?**
- Check your OpenAI API key has credits
- Verify DALL-E 3 access in your OpenAI account

**Slow responses?**
- Normal for first request (cold start)
- Image generation takes 10-30 seconds

## Next Steps

- Add more AI tools (web search, code execution, etc.)
- Implement conversation memory
- Add user authentication
- Save chat history to database

See full [README.md](README.md) for detailed documentation.
