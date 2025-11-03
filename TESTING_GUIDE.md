# Testing Guide - Image Generation

## Setup

1. **Ensure you have your OpenAI API key configured:**
   ```bash
   # Check if .env.local exists
   cat .env.local

   # Should show:
   # OPENAI_API_KEY=sk-proj-...
   ```

2. **The dev server should already be running on port 3000 or 3001**
   - If not, run: `npm run dev`

## Test Steps

### 1. Open the Application
- Navigate to: http://localhost:3000 (or 3001 if 3000 is in use)
- Open Browser DevTools (F12)
- Go to the Console tab

### 2. Test Text Chat First
Send a simple message:
```
Hello, how are you?
```

You should see:
- ✅ Message appears in the chat
- ✅ AI responds with streaming text
- ✅ No errors in console

### 3. Test Image Generation

Send this message:
```
Generate an image of a cute robot
```

**Expected Behavior:**

1. **AI Text Response** (~2-3 seconds):
   - AI will respond with something like "I'll generate that image for you..."

2. **Loading Indicator** (appears immediately):
   - You should see an animated icon with "Generating image..."

3. **Console Logs** (check DevTools Console):
   ```
   Non-text part: { type: 'tool-generateImage', state: 'input-available', ... }
   Image part: { state: 'input-available', hasInput: true, hasOutput: false, ... }
   ```

4. **Image Generation** (15-30 seconds):
   - DALL-E 3 is generating the image
   - The loading indicator stays visible

5. **Image Appears** (after generation):
   - Console should show:
   ```
   Non-text part: { type: 'tool-generateImage', state: 'output-available', ... }
   Image part: { state: 'output-available', hasInput: true, hasOutput: true, imageLength: 50000+ }
   ```
   - The image should render in the chat
   - The prompt should appear below the image

## Troubleshooting

### Images Not Showing?

**Check Console Logs:**

1. **If you see `type: 'tool-generateImage'` but no image:**
   - Check `imageLength` in the logs
   - If imageLength is a large number (>10000), data is there but rendering failed
   - If imageLength is undefined or small, the tool didn't return proper data

2. **If you don't see any `tool-generateImage` logs:**
   - The AI is not calling the tool
   - Check API key has credits
   - Check the API route is receiving the tool correctly

3. **If you see errors:**
   - Look for CORS errors, API errors, or image rendering errors
   - Copy the error message

### Network Tab Check

1. Go to Network tab in DevTools
2. Find the POST request to `/api/chat`
3. Look at the Response
4. You should see streaming data with the tool call

### Common Issues

**"Image data too large" or similar:**
- This is expected - DALL-E returns ~50KB+ base64 images
- Make sure `unoptimized` prop is on the Image component

**API Rate Limits:**
- DALL-E 3 has rate limits (5 images/minute for tier 1)
- Wait a minute if you hit limits

**Slow Generation:**
- Normal! DALL-E 3 takes 15-30 seconds per image
- Be patient

## Alternative Test Prompts

Try these if the first one doesn't work:

```
Create an image of a sunset over mountains
```

```
Draw a futuristic city
```

```
Generate a picture of a cat wearing a hat
```

## What to Report

If images still don't work, provide:

1. **Console logs** (copy the entire output)
2. **Network tab** response for /api/chat
3. **Screenshot** of what you see
4. **Error messages** if any

This will help identify exactly where the issue is!
