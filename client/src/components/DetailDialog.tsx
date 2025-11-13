import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsePattern } from "@/data/responses";
import { worksDatabase } from "@/data/works";

interface DetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  response: ResponsePattern;
}

export default function DetailDialog({
  open,
  onOpenChange,
  response,
}: DetailDialogProps) {
  const workInfo = worksDatabase[response.source];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="serif text-2xl">
            {response.source}（{response.year}）
          </DialogTitle>
          <DialogDescription>
            引用についてさらに詳しく知ることができます
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="interpretation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interpretation">解釈を深める</TabsTrigger>
            <TabsTrigger value="context">原文を読む</TabsTrigger>
            <TabsTrigger value="work">作品について</TabsTrigger>
          </TabsList>

          <TabsContent value="interpretation" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">引用</h3>
              <blockquote className="quote text-sm leading-relaxed">
                {response.quote}
              </blockquote>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">基本的な解釈</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {response.explanation}
              </p>
            </div>

            {response.deeperInterpretation && (
              <div>
                <h3 className="font-semibold text-lg mb-2">より深い解釈</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {response.deeperInterpretation}
                </p>
              </div>
            )}

            {!response.deeperInterpretation && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  この引用のより深い解釈は現在準備中です。基本的な解釈をご参照ください。
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="context" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">引用部分</h3>
              <blockquote className="quote text-sm leading-relaxed">
                {response.quote}
              </blockquote>
            </div>

            {response.context && (
              <div>
                <h3 className="font-semibold text-lg mb-2">前後の文脈</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="serif text-sm leading-relaxed whitespace-pre-line">
                    {response.context}
                  </p>
                </div>
              </div>
            )}

            {!response.context && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  この引用の前後文脈は現在準備中です。作品全体をお読みいただくことをお勧めします。
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="work" className="space-y-4 mt-4">
            {workInfo ? (
              <>
                <div>
                  <h3 className="font-semibold text-lg mb-2">あらすじ</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {workInfo.synopsis}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">執筆背景</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {workInfo.background}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">主要テーマ</h3>
                  <div className="flex flex-wrap gap-2">
                    {workInfo.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  この作品の詳細情報は現在準備中です。
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
