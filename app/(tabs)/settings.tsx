import { useState } from "react";
import {
  StyleSheet,
  View,
  Switch,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useSettings, useOnboarding } from "@/hooks/use-settings";
import { BorderRadius, Spacing } from "@/constants/theme";

interface SettingRowProps {
  label: string;
  sublabel?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  showArrow?: boolean;
  destructive?: boolean;
}

function SettingRow({
  label,
  sublabel,
  value,
  onValueChange,
  onPress,
  showArrow,
  destructive,
}: SettingRowProps) {
  const surfaceColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const accentColor = useThemeColor({}, "accent");
  const borderColor = useThemeColor({}, "border");

  const content = (
    <View style={[styles.settingRow, { backgroundColor: surfaceColor, borderBottomColor: borderColor }]}>
      <View style={styles.settingLabelContainer}>
        <ThemedText
          style={[
            styles.settingLabel,
            destructive && { color: "#FF3B30" },
          ]}
        >
          {label}
        </ThemedText>
        {sublabel && (
          <ThemedText style={[styles.settingSublabel, { color: textSecondary }]}>
            {sublabel}
          </ThemedText>
        )}
      </View>
      
      {onValueChange !== undefined && value !== undefined && (
        <Switch
          value={value}
          onValueChange={(newValue) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onValueChange(newValue);
          }}
          trackColor={{ false: "#E0E0E0", true: accentColor }}
          thumbColor="#FFFFFF"
        />
      )}
      
      {showArrow && (
        <ThemedText style={[styles.arrow, { color: textSecondary }]}>›</ThemedText>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { settings, updateSettings, clearAllData } = useSettings();
  const { resetOnboarding } = useOnboarding();

  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");
  const textSecondary = useThemeColor({}, "textSecondary");

  const handleClearData = () => {
    Alert.alert(
      "データを削除",
      "すべての会話履歴と設定が削除されます。この操作は取り消せません。",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除",
          style: "destructive",
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            await clearAllData();
            Alert.alert("完了", "データが削除されました。");
          },
        },
      ]
    );
  };

  const handleShowDisclaimer = () => {
    router.push("/modal");
  };

  const handleResetOnboarding = async () => {
    await resetOnboarding();
    router.replace("/onboarding");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            設定
          </ThemedText>
        </View>

        {/* 表示設定 */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textSecondary }]}>
            表示設定
          </ThemedText>
          <View style={[styles.sectionContent, { backgroundColor: surfaceColor }]}>
            <SettingRow
              label="英語併記"
              sublabel="高校生レベル以上の語彙に英語を併記します"
              value={settings.showEnglish}
              onValueChange={(value) => updateSettings({ showEnglish: value })}
            />
          </View>
        </View>

        {/* 通信設定 */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textSecondary }]}>
            通信設定
          </ThemedText>
          <View style={[styles.sectionContent, { backgroundColor: surfaceColor }]}>
            <SettingRow
              label="クラウド利用を許可"
              sublabel="端末性能が不足する場合にクラウドを使用します（モック）"
              value={settings.allowCloud}
              onValueChange={(value) => updateSettings({ allowCloud: value })}
            />
          </View>
        </View>

        {/* データ管理 */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textSecondary }]}>
            データ管理
          </ThemedText>
          <View style={[styles.sectionContent, { backgroundColor: surfaceColor }]}>
            <SettingRow
              label="すべてのデータを削除"
              onPress={handleClearData}
              destructive
              showArrow
            />
          </View>
        </View>

        {/* 情報 */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textSecondary }]}>
            情報
          </ThemedText>
          <View style={[styles.sectionContent, { backgroundColor: surfaceColor }]}>
            <SettingRow
              label="免責事項・ご利用にあたって"
              onPress={handleShowDisclaimer}
              showArrow
            />
            <SettingRow
              label="オンボーディングを再表示"
              onPress={handleResetOnboarding}
              showArrow
            />
          </View>
        </View>

        {/* アプリ情報 */}
        <View style={styles.appInfo}>
          <ThemedText style={[styles.appInfoText, { color: textSecondary }]}>
            SOSEKI AI
          </ThemedText>
          <ThemedText style={[styles.appInfoVersion, { color: textSecondary }]}>
            Version 1.0.0 (MVP)
          </ThemedText>
          <ThemedText style={[styles.appInfoNote, { color: textSecondary }]}>
            夏目漱石の文体を模した対話AIアプリ
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionContent: {
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.lg,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 52,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLabelContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    lineHeight: 22,
  },
  settingSublabel: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "300",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  appInfoText: {
    fontSize: 16,
    fontWeight: "600",
  },
  appInfoVersion: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  appInfoNote: {
    fontSize: 12,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
});
