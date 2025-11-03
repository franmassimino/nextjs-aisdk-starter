'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, Image as ImageIcon } from 'lucide-react';

export function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const isLoading = status !== 'ready';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  console.log({messages});

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-slate-900/50 border-slate-800 backdrop-blur-xl shadow-2xl">
      <CardHeader className="border-b border-slate-800">
        <CardTitle className="flex items-center gap-2 text-slate-100">
          <Bot className="w-6 h-6 text-blue-400" />
          Chat
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 py-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 py-12">
                <Bot className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Start a conversation</p>
                <p className="text-sm text-slate-600 mt-2">Try asking me to generate an image or answer a question</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-300 shadow-lg'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  <div
                    className={`rounded-lg px-4 py-3 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                        : 'bg-slate-800 text-slate-100 border border-slate-700'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap space-y-2">
                      {message.parts.map((part, index) => {
                        // DEBUG: Log all parts to console
                        if (part.type !== 'text') {
                          console.log('Non-text part:', {
                            type: part.type,
                            state: (part as any).state,
                            hasOutput: !!(part as any).output,
                            hasInput: !!(part as any).input,
                          });
                        }

                        // Render text parts
                        if (part.type === 'text') {
                          return <span key={index}>{part.text}</span>;
                        }

                        // Render generated images
                        if (part.type === 'tool-generateImage') {
                          const { state, toolCallId, input, output } = part as any;

                          console.log('Image part:', { state, hasInput: !!input, hasOutput: !!output, imageLength: output?.image?.length });

                          // Loading state
                          if (state === 'input-available') {
                            return (
                              <div key={toolCallId || index} className="flex items-center gap-2 text-xs text-muted-foreground my-2">
                                <ImageIcon className="w-4 h-4 animate-pulse" />
                                <span>Generating image...</span>
                              </div>
                            );
                          }

                          // Image ready
                          if (state === 'output-available' && output?.image) {
                            return (
                              <div key={toolCallId || index} className="my-2">
                                <Image
                                  src={`data:image/png;base64,${output.image}`}
                                  alt={input?.prompt || 'Generated image'}
                                  width={400}
                                  height={400}
                                  className="rounded-lg"
                                  unoptimized
                                />
                                {input?.prompt && (
                                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <ImageIcon className="w-3 h-3" />
                                    {input.prompt}
                                  </p>
                                )}
                              </div>
                            );
                          }
                        }

                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 shadow-lg">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-lg px-4 py-3 shadow-lg bg-slate-800 text-slate-100 border border-slate-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t border-slate-800 p-4 bg-slate-900/30">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything or generate an image..."
            disabled={isLoading}
            className="flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
