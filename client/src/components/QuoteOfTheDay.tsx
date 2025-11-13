import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleResponses } from "@/data/responses";

export default function QuoteOfTheDay() {
  // Get a consistent quote based on the day of the year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const quote = sampleResponses[dayOfYear % sampleResponses.length];

  return (
    <Card className="w-full max-w-sm bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-accent">Quote of the Day</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="quote text-sm leading-relaxed mb-4">
          {quote.quote}
        </blockquote>
        <p className="text-xs text-muted-foreground text-right">
          出典：{quote.source} ({quote.year})
        </p>
      </CardContent>
    </Card>
  );
}
