import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { QuoteCard, Quote } from "./quote-card";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BorderRadius, Spacing } from "@/constants/theme";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  quote?: Quote;
  context?: string;
  reflection?: string;
  question?: string;
  timestamp?: Date;
}

interface MessageBubbleProps {
  message: Message;
  showEnglish?: boolean;
}

// 英語併記用のヘルパー関数
function addEnglishGloss(text: string, showEnglish: boolean): string {
  if (!showEnglish) return text;
  
  const glossary: Record<string, string> = {
    "内省": "内省（reflection）",
    "俯瞰": "俯瞰（bird's-eye view）",
    "抽象": "抽象（abstract）",
    "葛藤": "葛藤（conflict）",
    "寂寞": "寂寞（loneliness）",
    "孤独": "孤独（solitude）",
    "自我": "自我（ego）",
    "煩悶": "煩悶（anguish）",
    "懊悩": "懊悩（agony）",
    "諦観": "諦観（resignation）",
    "超然": "超然（detachment）",
    "虚無": "虚無（nihilism）",
  };
  
  let result = text;
  for (const [jp, withEn] of Object.entries(glossary)) {
    result = result.replace(new RegExp(jp, "g"), withEn);
  }
  return result;
}

export function MessageBubble({ message, showEnglish = false }: MessageBubbleProps) {
  const userBubbleColor = useThemeColor({}, "userBubble");
  const userTextColor = useThemeColor({}, "userBubbleText");
  const aiBubbleColor = useThemeColor({}, "aiBubble");
  const aiTextColor = useThemeColor({}, "aiBubbleText");
  const textSecondary = useThemeColor({}, "textSecondary");

  const isUser = message.role === "user";
  const bubbleColor = isUser ? userBubbleColor : aiBubbleColor;
  const textColor = isUser ? userTextColor : aiTextColor;

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      <View style={[styles.bubble, { backgroundColor: bubbleColor }, isUser ? styles.userBubble : styles.assistantBubble]}>
        <ThemedText style={[styles.content, { color: textColor }]}>
          {addEnglishGloss(message.content, showEnglish)}
        </ThemedText>
      </View>
      
      {!isUser && message.quote && (
        <QuoteCard quote={message.quote} showEnglish={showEnglish} />
      )}
      
      {!isUser && message.context && (
        <View style={styles.contextContainer}>
          <ThemedText style={[styles.sectionLabel, { color: textSecondary }]}>
            {showEnglish ? "文脈（Context）" : "文脈"}
          </ThemedText>
          <ThemedText style={styles.contextText}>
            {addEnglishGloss(message.context, showEnglish)}
          </ThemedText>
        </View>
      )}
      
      {!isUser && message.reflection && (
        <View style={styles.reflectionContainer}>
          <ThemedText style={[styles.sectionLabel, { color: textSecondary }]}>
            {showEnglish ? "所感（Reflection）" : "所感"}
          </ThemedText>
          <ThemedText style={styles.reflectionText}>
            {addEnglishGloss(message.reflection, showEnglish)}
          </ThemedText>
        </View>
      )}
      
      {!isUser && message.question && (
        <View style={styles.questionContainer}>
          <ThemedText style={styles.questionText}>
            {addEnglishGloss(message.question, showEnglish)}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
    maxWidth: "85%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  assistantContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  userBubble: {
    borderBottomRightRadius: Spacing.xs,
  },
  assistantBubble: {
    borderBottomLeftRadius: Spacing.xs,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  contextContainer: {
    marginTop: Spacing.md,
    paddingLeft: Spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: "rgba(30, 77, 107, 0.3)",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: Spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contextText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.9,
  },
  reflectionContainer: {
    marginTop: Spacing.md,
    paddingLeft: Spacing.md,
  },
  reflectionText: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: "italic",
  },
  questionContainer: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: "rgba(30, 77, 107, 0.08)",
    borderRadius: BorderRadius.md,
  },
  questionText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
  },
});
