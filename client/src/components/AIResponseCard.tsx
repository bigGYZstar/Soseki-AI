import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, RefreshCw, BookOpen } from "lucide-react";
import { useState } from "react";
import DetailDialog from "@/components/DetailDialog";
import { ResponsePattern } from "@/data/responses";

interface AIResponseCardProps {
  response: ResponsePattern;
  onAskMore?: () => void;
  onNewQuote?: () => void;
}

export default function AIResponseCard({
  response,
  onAskMore,
  onNewQuote,
}: AIResponseCardProps) {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { quote, explanation, source, year } = response;
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="pt-6">
        {/* Quote Section */}
        <blockquote className="quote text-base leading-relaxed mb-6">
          {quote}
        </blockquote>

        {/* Explanation Section */}
        <div className="text-sm text-foreground leading-relaxed mb-4">
          {explanation}
        </div>

        {/* Citation */}
        <div className="text-xs text-muted-foreground border-t border-border pt-3 mb-4">
          出典：{source} ({year})
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDetailDialogOpen(true)}
            className="text-xs"
          >
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            もう少し聞く
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNewQuote}
            className="text-xs"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            別の一節を
          </Button>
        </div>

        <DetailDialog
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          response={response}
        />
      </CardContent>
    </Card>
  );
}
