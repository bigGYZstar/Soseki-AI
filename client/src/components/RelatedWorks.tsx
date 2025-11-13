import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

interface Work {
  title: string;
  year: number;
  description: string;
}

const works: Work[] = [
  {
    title: "吾輩は猫である",
    year: 1905,
    description: "猫の視点から人間社会を風刺した代表作",
  },
  {
    title: "こころ",
    year: 1914,
    description: "人間の心の奥底を描いた後期の傑作",
  },
  {
    title: "三四郎",
    year: 1908,
    description: "青年の成長と恋愛を描いた前期三部作の一つ",
  },
  {
    title: "坊っちゃん",
    year: 1906,
    description: "正義感溢れる青年教師の奮闘記",
  },
];

export default function RelatedWorks() {
  return (
    <Card className="bg-card border-border shadow-sm sticky top-4">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Book className="h-4 w-4 text-accent" />
          Related Works
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {works.map((work, index) => (
          <div key={index} className="border-l-2 border-accent pl-3">
            <h3 className="text-sm font-medium serif">{work.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {work.year} · {work.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
