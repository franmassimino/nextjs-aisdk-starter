import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { generateImageTool } from '@/lib/tools/generate-image';

// Allow streaming responses up to 60 seconds for image generation
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful AI assistant. Be concise and friendly. When users ask you to create, generate, or show images, use the generateImage tool.',
    messages: convertToModelMessages(messages),
    tools: {
      generateImage: generateImageTool,
    },
  });

  return result.toUIMessageStreamResponse();
}
