# Debug Guide - Image Generation Not Showing

## Issue
Images are being generated but not displayed in the chat UI.

## Debugging Steps

### 1. Check Browser Console
When you send a message asking for image generation (e.g., "Generate an image of a cat"), check the browser console (F12) for:

- Look for the message parts being logged
- Verify the `part.type` value for tool calls
- Check if the image data is present in `part.output`

### 2. Verify API Response
Check the Network tab in browser DevTools:
- Find the `/api/chat` POST request
- Look at the streaming response
- Verify that the tool is being called and returning data

### 3. Common Issues

**Issue: part.type doesn't match**
- Current code expects: `part.type === 'tool-generateImage'`
- But it might be: `'tool-call-generateImage'` or `'tool-result'`

**Issue: Image data format**
- Image should be base64 string in `part.output.image`
- Verify it's not wrapped in another object

**Issue: Next.js Image component**
- Base64 images need `unoptimized` prop
- Format: `data:image/png;base64,${base64String}`

### 4. Quick Fix Test

Add this temporary debug code to see ALL part types:

```tsx
{message.parts.map((part, index) => (
  <div key={index} className="border p-2 my-1">
    <pre className="text-xs">
      {JSON.stringify({ type: part.type, state: (part as any).state }, null, 2)}
    </pre>
  </div>
))}
```

### 5. Verify Tool Name Match

API Route:
```typescript
tools: {
  generateImage: generateImageTool,  // Tool name is "generateImage"
}
```

Client Check:
```typescript
if (part.type === 'tool-generateImage') {  // Must match tool name
```

### 6. Check Image Data

Add this before rendering the image:

```typescript
if (state === 'output-available') {
  console.log('Image data length:', output.image?.length);
  console.log('First 100 chars:', output.image?.substring(0, 100));
}
```

If the image data is present and long (>10000 chars), the problem is in rendering.
If it's short or missing, the problem is in the API/tool.

## Expected Flow

1. User sends message: "Generate an image of X"
2. AI responds with text about generating the image
3. AI calls `generateImage` tool with prompt
4. Part appears with `type: 'tool-generateImage'`, `state: 'input-available'`
5. DALL-E generates image (10-30 seconds)
6. Part updates with `state: 'output-available'`, `output.image: <base64>`
7. UI renders the image

## Testing

Try this exact message:
```
Generate an image of a cute robot
```

You should see:
1. "Generating image..." loading indicator
2. The image appears after ~15-20 seconds
3. The prompt text appears below the image
