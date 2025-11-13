import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2 serif">
          ページが見つかりません
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Button
          onClick={() => setLocation("/")}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Home className="mr-2 h-5 w-5" />
          ホームに戻る
        </Button>
      </div>
    </div>
  );
}
