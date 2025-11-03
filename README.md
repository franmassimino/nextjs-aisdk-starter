# Next.js 16 + Vercel AI SDK + shadcn/ui Starter

A modern AI chat application built with the latest technologies:

- **Next.js 16** - Latest version with Turbopack, React Compiler, and improved performance
- **Vercel AI SDK** - Streaming AI responses with the `useChat` hook
- **shadcn/ui** - Beautiful, accessible UI components built with Radix UI and Tailwind CSS
- **TypeScript** - Full type safety
- **Tailwind CSS v4** - Modern styling with the latest Tailwind features

## Features

- **Real-time AI chat** with streaming responses
- **AI Image Generation** powered by DALL-E 3 - just ask the AI to generate an image!
- Beautiful, responsive chat UI built with shadcn/ui components
- TypeScript for type safety
- Server-side streaming with Next.js App Router
- Modern design with Tailwind CSS v4
- Built-in dark mode support

## Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys))

## Getting Started

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy the example environment file and add your OpenAI API key:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

3. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the AI chat interface.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint with streaming & tools
│   ├── page.tsx                  # Main page with chat interface
│   └── globals.css               # Global styles
├── components/
│   ├── chat.tsx                  # Main chat component with image rendering
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── scroll-area.tsx
└── lib/
    ├── tools/
    │   └── generate-image.ts     # DALL-E 3 image generation tool
    └── utils.ts                  # Utility functions
```

## Key Technologies

### Next.js 16

This project uses Next.js 16 with:
- **Turbopack**: 5-10x faster Fast Refresh
- **React Compiler**: Automatic memoization for better performance
- **App Router**: Modern routing with Server Components
- **Server Actions**: Simplified server-side logic

### Vercel AI SDK

The AI SDK provides:
- `useChat` hook for easy chat implementation
- Streaming responses for real-time AI interaction
- Support for multiple AI providers (OpenAI, Anthropic, etc.)

### shadcn/ui

Pre-built, customizable components:
- Copy-paste components into your project
- Built on Radix UI primitives
- Fully accessible and customizable
- Styled with Tailwind CSS

## Usage

### Chat with AI

Simply type your message and press Enter. The AI will respond with streaming text in real-time.

### Generate Images

Ask the AI to create images naturally, for example:
- "Generate an image of a sunset over mountains"
- "Create a picture of a cute robot"
- "Show me a futuristic city"

The AI will use DALL-E 3 to generate high-quality images (1024x1024, HD quality).

## Customization

### Change AI Model

Edit `src/app/api/chat/route.ts` to use a different model:

```typescript
const result = streamText({
  model: openai('gpt-4'), // Change to gpt-4, gpt-3.5-turbo, etc.
  messages,
  tools: {
    generateImage: generateImageTool,
  },
});
```

### Customize Image Generation

Edit `src/lib/tools/generate-image.ts` to change image settings:

```typescript
const { image } = await generateImage({
  model: openai.image('dall-e-3'),
  prompt,
  size: '1024x1024',  // Options: 1024x1024, 1024x1792, 1792x1024
  providerOptions: {
    openai: {
      style: 'vivid',    // Options: 'vivid' or 'natural'
      quality: 'hd',     // Options: 'standard' or 'hd'
    },
  },
});
```

### Add More Components

Add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com)

### Styling

This project uses Tailwind CSS v4. Customize the theme in:
- `src/app/globals.css` - CSS variables and global styles
- `components.json` - shadcn/ui configuration

## Learn More

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Vercel AI SDK Documentation](https://ai-sdk.dev/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com)

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

Vercel will automatically detect Next.js and configure everything for you.
