import { useEffect, useRef, useState } from 'react';
import { Send, MessageCircle, Sparkles, Bot, User, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { exampleQuestions, getAssistantResponse } from '@/data/mockData';
import type { ChatMessage } from '@/types';

export function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "Hello! I'm the LivestockGuard AI assistant. I can help you understand health alerts, detected indicators, and risk scores for your monitored animals. Try asking me a question below, or pick one of the suggested questions.",
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendQuestion = (question: string) => {
    const q = question.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      content: q,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAssistantResponse(q);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-a`,
          role: 'assistant',
          content: response,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-140px)] max-w-3xl flex-col">
      {/* Header */}
      <Card className="mb-4 flex items-center gap-3 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
          <Sparkles className="h-5.5 w-5.5" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-base font-bold text-ink-900">AI Assistant</h2>
          <p className="text-sm text-ink-500">Ask about monitored animals, alerts, and health indicators</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success-100 px-2.5 py-1 text-xs font-semibold text-success-700">
          <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
          Online
        </span>
      </Card>

      {/* Chat area */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-ink-700 text-white'
                    : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white'
                }`}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-brand-600 text-white'
                      : 'rounded-tl-sm bg-ink-50 text-ink-700'
                  }`}
                >
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                <p className={`mt-1 text-xs text-ink-400 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-ink-50 px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-ink-400" />
              </div>
            </div>
          )}
        </div>

        {/* Example questions */}
        {messages.length <= 1 && (
          <div className="border-t border-ink-100 p-4">
            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
              <Lightbulb className="h-3.5 w-3.5" />
              Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendQuestion(q)}
                  className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-600 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-ink-100 p-3 sm:p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); sendQuestion(input); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about an animal, alert, or indicator..."
              className="flex-1 rounded-xl border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm text-ink-800 placeholder-ink-400 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-all hover:bg-brand-700 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
          <p className="mt-2 text-center text-xs text-ink-400">
            Demo responses · AI-assisted prototype — not a veterinary diagnosis
          </p>
        </div>
      </Card>
    </div>
  );
}
