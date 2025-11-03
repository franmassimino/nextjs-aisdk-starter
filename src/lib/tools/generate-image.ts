import { z } from 'zod';
import { tool } from 'ai';
import { openai } from '@ai-sdk/openai';

export const generateImageTool = tool({
  description: 'Generate an image based on a text prompt using DALL-E',
  parameters: z.object({
    prompt: z.string().describe('The text prompt describing the image to generate'),
  }),
  execute: async ({ prompt }) => {
    try {
      const response = await openai.image.generate({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });

      const imageData = response.data[0]?.b64_json;

      if (!imageData) {
        throw new Error('No image data returned from DALL-E');
      }

      return {
        image: imageData,
        prompt,
      };
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});
