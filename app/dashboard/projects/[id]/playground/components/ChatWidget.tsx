'use client';

import { motion, useDragControls } from 'framer-motion'
import { Send, GripHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface ChatWidgetProps {
  className?: string;
  projectId?: string;
  isEmbedded?: boolean;
}

export function ChatWidget({ className, projectId, isEmbedded = false }: ChatWidgetProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const dragControls = useDragControls();

  useEffect(() => {
    if (projectId) {
      console.log('ChatWidget initialized for projectId:', projectId);
    }
  }, [projectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulated AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a sample AI reply for project ${projectId}.`,
        role: 'assistant',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleClose = () => {
    if (isEmbedded && window.parent) {
      // Send a message to the parent window to close the chat
      // The '*' is a wildcard for the target origin. For production, you should
      // specify the exact origin of the parent page for security.
      window.parent.postMessage('nexweb-chat-close', '*');
    }
  };
  return (
    <motion.div
      drag={!isEmbedded}
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col bg-white/90 backdrop-blur-md',
        isEmbedded
          ? 'w-full h-full'
          : 'fixed bottom-4 right-4 rounded-2xl border shadow-md w-[90vw] max-w-md h-[70vh]',
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'h-8 flex items-center justify-between px-2 border-b bg-gray-50/60',
          isEmbedded ? '' : 'cursor-move rounded-t-2xl'
        )}
        onPointerDown={isEmbedded ? undefined : (e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          {!isEmbedded && <GripHorizontal className="h-4 w-4" />}
          Chat
        </div>
        {isEmbedded && (
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-6 w-6">
            <X className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Close chat</span>
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                'flex w-full',
                m.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                  m.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t bg-white/70">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center py-2 text-xs text-gray-400">
        Powered by NexWeb
      </div>
    </motion.div>
  );
}
