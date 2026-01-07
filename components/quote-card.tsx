import { StyleSheet, View, Pressable, Linking } from "react-native";
import { ThemedText } from "./themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BorderRadius, Spacing } from "@/constants/theme";

export interface Quote {
  text: string;
  work: string;
  chapter?: string;
  source?: string;
  sourceUrl?: string;
}

interface QuoteCardProps {
  quote: Quote;
  showEnglish?: boolean;
}

export function QuoteCard({ quote, showEnglish }: QuoteCardProps) {
  const backgroundColor = useThemeColor({}, "quoteBackground");
  const borderColor = useThemeColor({}, "quoteBorder");
  const quoteTextColor = useThemeColor({}, "quoteText");
  const accentColor = useThemeColor({}, "accent");

  const handleSourcePress = () => {
    if (quote.sourceUrl) {
      Linking.openURL(quote.sourceUrl);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <View style={styles.quoteMarkContainer}>
        <ThemedText style={[styles.quoteMark, { color: accentColor }]}>「</ThemedText>
      </View>
      <ThemedText style={[styles.quoteText, { color: quoteTextColor }]}>
        {quote.text}
      </ThemedText>
      <View style={styles.quoteMarkContainerEnd}>
        <ThemedText style={[styles.quoteMark, { color: accentColor }]}>」</ThemedText>
      </View>
      
      <View style={styles.sourceContainer}>
        <ThemedText style={styles.workTitle}>
          『{quote.work}』
          {quote.chapter && <ThemedText style={styles.chapter}> {quote.chapter}</ThemedText>}
        </ThemedText>
        
        {quote.source && (
          <Pressable onPress={handleSourcePress} disabled={!quote.sourceUrl}>
            <ThemedText style={[styles.source, quote.sourceUrl && { color: accentColor }]}>
              出典: {quote.source}
              {showEnglish && " (Source)"}
            </ThemedText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  quoteMarkContainer: {
    position: "absolute",
    top: Spacing.sm,
    left: Spacing.md,
  },
  quoteMarkContainerEnd: {
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
  },
  quoteMark: {
    fontSize: 24,
    fontWeight: "300",
    opacity: 0.6,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 28,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    fontStyle: "italic",
  },
  sourceContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  workTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  chapter: {
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.8,
  },
  source: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: Spacing.xs,
    opacity: 0.7,
  },
});
