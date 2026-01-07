import { Message } from "@/components/message-bubble";
import { Quote } from "@/components/quote-card";

// 漱石作品からの引用データ（モック）
export const sosekiQuotes: Quote[] = [
  {
    text: "智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。",
    work: "草枕",
    chapter: "冒頭",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/776_14941.html",
  },
  {
    text: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。",
    work: "吾輩は猫である",
    chapter: "第一章",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/789_14547.html",
  },
  {
    text: "自分の弱点を知っている者は強い。自分の弱点を知らない者は弱い。",
    work: "こころ",
    chapter: "先生と遺書",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/773_14560.html",
  },
  {
    text: "精神的に向上心のないものは馬鹿だ。",
    work: "こころ",
    chapter: "先生と遺書",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/773_14560.html",
  },
  {
    text: "人間はね、自分が困らない程度内で、なるべく人に親切がしてみたいものだ。",
    work: "吾輩は猫である",
    chapter: "第三章",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/789_14547.html",
  },
  {
    text: "恋は罪悪で神聖なものだ。",
    work: "それから",
    chapter: "第十四章",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/1742_14914.html",
  },
  {
    text: "真面目に考えよ。誠実に語れ。摯実に行え。",
    work: "私の個人主義",
    source: "青空文庫",
    sourceUrl: "https://www.aozora.gr.jp/cards/000148/files/772_33100.html",
  },
];

// テーマ別の応答テンプレート
export const responseTemplates = {
  loneliness: {
    quote: sosekiQuotes[0],
    context: "この一節は、漱石が人間社会の本質的な難しさを詠んだものである。知性で物事を判断すれば他者と衝突し、感情に任せれば流されてしまう。どちらを選んでも窮屈さを感じるのが人の世の常であろう。",
    reflection: "孤独を感じるということは、君が自分自身と向き合おうとしている証左でもある。",
    question: "君は今、何から距離を置きたいと感じているのだろうか？",
  },
  work: {
    quote: sosekiQuotes[3],
    context: "漱石は『こころ』において、人間の精神的成長について深く考察している。向上心とは、単なる野心ではなく、自己を見つめ、より良い人間になろうとする意志のことを指すのであろう。",
    reflection: "仕事における悩みは、往々にして自分自身への期待と現実との乖離から生じるものである。",
    question: "君が仕事において本当に求めているものは、成果なのか、それとも成長なのか？",
  },
  relationships: {
    quote: sosekiQuotes[4],
    context: "この言葉は、人間関係における利他と利己のバランスを示唆している。自分を犠牲にしすぎず、かといって自己中心的にもならない、その中庸を見出すことの難しさを漱石は知っていたのであろう。",
    reflection: "人間関係の悩みは、相手を変えようとするところから始まることが多い。",
    question: "君は相手に何を求め、そして自分は何を与えているのだろうか？",
  },
  self: {
    quote: sosekiQuotes[2],
    context: "自己認識の重要性を説いたこの一節は、漱石の人間観察の鋭さを示している。弱点を認めることは恥ではなく、むしろ強さの源泉となりうるのである。",
    reflection: "自分を知ることは、時に痛みを伴う。しかし、その痛みこそが成長の糧となる。",
    question: "君が認めたくない自分の一面とは、どのようなものだろうか？",
  },
  love: {
    quote: sosekiQuotes[5],
    context: "漱石は恋愛を、罪悪感と神聖さが同居する複雑な感情として捉えていた。人を愛することは、時に自分を傷つけ、相手を傷つけることでもある。しかし、それでもなお人は愛さずにはいられない。",
    reflection: "恋に悩むということは、君が真剣に人と向き合おうとしている証である。",
    question: "君にとって、その人を愛することと、自分を大切にすることは、両立できるものだろうか？",
  },
  anxiety: {
    quote: sosekiQuotes[6],
    context: "漱石は『私の個人主義』において、真摯に生きることの重要性を説いた。不安とは、未来への関心の表れであり、それ自体は決して悪いものではない。",
    reflection: "不安を感じるのは、君が現状に満足せず、より良い未来を求めているからであろう。",
    question: "君の不安の根源にあるものは、失敗への恐れか、それとも変化への恐れか？",
  },
};

// 初期メッセージ
export const initialMessage: Message = {
  id: "initial",
  role: "assistant",
  content: "私は漱石の言葉を借りて、君の思考の整理を手伝う者である。悩みや迷いがあれば、遠慮なく話してみてくれたまえ。",
  timestamp: new Date(),
};

// ユーザー入力からテーマを判定する関数
export function detectTheme(input: string): keyof typeof responseTemplates {
  const themes: { keywords: string[]; theme: keyof typeof responseTemplates }[] = [
    { keywords: ["孤独", "一人", "寂しい", "ひとり", "独り"], theme: "loneliness" },
    { keywords: ["仕事", "職場", "上司", "部下", "キャリア", "転職"], theme: "work" },
    { keywords: ["人間関係", "友人", "友達", "家族", "親", "兄弟"], theme: "relationships" },
    { keywords: ["自分", "自己", "アイデンティティ", "存在", "意味"], theme: "self" },
    { keywords: ["恋", "愛", "好き", "恋人", "彼氏", "彼女", "結婚"], theme: "love" },
    { keywords: ["不安", "心配", "怖い", "将来", "未来"], theme: "anxiety" },
  ];

  for (const { keywords, theme } of themes) {
    if (keywords.some(keyword => input.includes(keyword))) {
      return theme;
    }
  }

  // デフォルトは孤独テーマ
  return "loneliness";
}

// モック応答を生成する関数
export function generateMockResponse(userInput: string): Message {
  const theme = detectTheme(userInput);
  const template = responseTemplates[theme];

  return {
    id: Date.now().toString(),
    role: "assistant",
    content: "君の言葉を聞いて、ある一節が浮かんだ。",
    quote: template.quote,
    context: template.context,
    reflection: template.reflection,
    question: template.question,
    timestamp: new Date(),
  };
}

// 別の引用を取得する関数
export function getAlternativeQuote(currentQuoteText: string): Quote {
  const availableQuotes = sosekiQuotes.filter(q => q.text !== currentQuoteText);
  return availableQuotes[Math.floor(Math.random() * availableQuotes.length)] || sosekiQuotes[0];
}
