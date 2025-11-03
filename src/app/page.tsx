import { Chat } from '@/components/chat';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Chat Assistant
          </h1>
          <Sparkles className="w-8 h-8 text-pink-400" />
        </div>
        <p className="text-slate-400 text-lg">
          Powered by GPT-4 & DALL-E 3 • Chat and generate stunning images
        </p>
      </div>

      {/* Chat Interface */}
      <Chat />

      {/* Footer */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        Built with Next.js, Vercel AI SDK & OpenAI
      </div>
    </div>
  );
}
