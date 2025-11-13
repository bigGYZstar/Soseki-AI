import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      setLocation(`/chat?q=${encodeURIComponent(input)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Soseki AI Concierge
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground serif">
            漱石があなたに語りかける日常の文話（bunwa）
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Input Area - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <label
                htmlFor="question-input"
                className="block text-sm font-medium mb-3 text-foreground"
              >
                あなたの悩みや質問を入力してください
              </label>
              <Textarea
                id="question-input"
                placeholder="例：人間関係が難しい、仕事で行き詰まっています..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[120px] resize-none text-base"
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  送信
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Introduction Text */}
            <div className="mt-8 prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Soseki AI
                Conciergeは、文豪・夏目漱石の文体と思想を通じて、現代の悩みに新しい視点を与えるAI対話システムです。青空文庫に収録された漱石の作品から関連する一節を引用し、あなたの質問に応答します。
              </p>
            </div>
          </div>

          {/* Quote of the Day - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <QuoteOfTheDay />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            このアプリケーションは教育・文化用途のデモンストレーションです。
          </p>
          <p className="mt-2">
            引用元：青空文庫（著作権保護期間満了作品）
          </p>
        </footer>
      </div>
    </div>
  );
}
