import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AIResponseCard from "@/components/AIResponseCard";
import RelatedWorks from "@/components/RelatedWorks";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { sampleResponses, ResponsePattern } from "@/data/responses";

interface Message {
  type: "user" | "ai";
  content: string;
  response?: ResponsePattern;
}

export default function Chat() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "user",
      content: "人間関係が難しいです",
    },
    {
      type: "ai",
      content: "",
      response: sampleResponses[0],
    },
  ]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: "user",
      content: input,
    };

    // Generate AI response (random for demo)
    const randomResponse =
      sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    const aiMessage: Message = {
      type: "ai",
      content: "",
      response: randomResponse,
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");

    // Scroll to bottom after a short delay
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAskMore = () => {
    toast.info("「もう少し聞く」機能は実装予定です");
  };

  const handleNewQuote = () => {
    const randomResponse =
      sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    const aiMessage: Message = {
      type: "ai",
      content: "",
      response: randomResponse,
    };
    setMessages([...messages, aiMessage]);
  };

  const handleSettings = () => {
    toast.info("設定機能は実装予定です");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-sm border-b border-border">
        <div className="container max-w-7xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <h1 className="text-xl font-bold">Soseki AI Concierge</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSettings}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area - 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.type === "user"
                    ? "flex justify-end animate-fade-in"
                    : "flex animate-fade-in"
                }
              >
                {message.type === "user" ? (
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3 max-w-[80%]">
                    <p className="text-sm">{message.content}</p>
                  </div>
                ) : (
                  <div className="w-full">
                    {message.response && (
                      <AIResponseCard
                        response={message.response}
                        onAskMore={handleAskMore}
                        onNewQuote={handleNewQuote}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Input Area */}
            <div className="bg-card border border-border rounded-lg shadow-sm p-4 sticky bottom-4">
              <Textarea
                placeholder="続けて質問を入力してください..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end mt-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  送信
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column on large screens, hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <RelatedWorks />
          </div>
        </div>
      </div>
    </div>
  );
}
