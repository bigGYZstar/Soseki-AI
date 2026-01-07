import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BorderRadius, Spacing } from "@/constants/theme";

const disclaimer = `【免責事項】

本アプリ「SOSEKI AI」は、夏目漱石の文体を模したAIによる対話体験を提供するエンターテインメント・教育目的のアプリケーションです。

■ 専門的アドバイスについて
本アプリは、医療、法律、金融、心理カウンセリング等の専門的なアドバイスを提供するものではありません。深刻な悩みや問題をお持ちの方は、必ず適切な専門家にご相談ください。

■ AIの応答について
本アプリのAI応答は、夏目漱石の作品を参考にした創作的なものであり、漱石本人の見解や意図を正確に反映するものではありません。

■ 引用について
本アプリで使用している引用は、青空文庫等のパブリックドメイン（著作権の保護期間が満了した）作品から取得しています。引用の正確性には注意を払っていますが、誤りがある可能性があります。

■ プライバシーについて
本アプリは、ユーザーの入力データを原則として端末内にのみ保存します。クラウド機能を有効にした場合、一部のデータがサーバーに送信される場合があります。

■ 相談窓口
深刻な悩みをお持ちの方は、以下の相談窓口をご利用ください：

・よりそいホットライン
  0120-279-338（24時間対応）

・いのちの電話
  0570-783-556

・こころの健康相談統一ダイヤル
  0570-064-556

■ 著作権
夏目漱石の作品は著作権の保護期間が満了しており、パブリックドメインとして自由に利用できます。本アプリのオリジナルコンテンツの著作権は開発者に帰属します。`;

export default function DisclaimerModal() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const accentColor = useThemeColor({}, "accent");
  const surfaceColor = useThemeColor({}, "surface");
  const textSecondary = useThemeColor({}, "textSecondary");

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          免責事項・ご利用にあたって
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={[styles.disclaimerBox, { backgroundColor: surfaceColor }]}>
          <ThemedText style={styles.disclaimerText}>{disclaimer}</ThemedText>
        </ThemedView>
      </ScrollView>

      <ThemedView style={styles.footer}>
        <Pressable
          style={[styles.closeButton, { backgroundColor: accentColor }]}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.closeButtonText}>閉じる</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  disclaimerBox: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  closeButton: {
    height: 52,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
