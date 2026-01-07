import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MessageBubble, Message } from "@/components/message-bubble";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useSettings, useOnboarding } from "@/hooks/use-settings";
import { BorderRadius, Spacing } from "@/constants/theme";
import {
  initialMessage,
  generateMockResponse,
  getAlternativeQuote,
} from "@/data/mock-responses";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const { settings } = useSettings();
  const { isComplete } = useOnboarding();

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const accentColor = useThemeColor({}, "accent");
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor({}, "border");
  const inputBgColor = useThemeColor({}, "inputBackground");

  // オンボーディング未完了の場合はリダイレクト
  useEffect(() => {
    if (isComplete === false) {
      router.replace("/onboarding");
    }
  }, [isComplete]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // モック応答を生成（実際のAPIコールをシミュレート）
    setTimeout(() => {
      const response = generateMockResponse(userMessage.content);
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
      
      // スクロールを最下部に
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const handleAlternativeQuote = (messageId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId && msg.quote) {
          const newQuote = getAlternativeQuote(msg.quote.text);
          return { ...msg, quote: newQuote };
        }
        return msg;
      })
    );
  };

  const handleDigDeeper = (messageId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const targetMessage = messages.find((m) => m.id === messageId);
    if (!targetMessage?.question) return;

    // 問い返しを新しいユーザー入力として扱う
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `「${targetMessage.question}」について、もう少し考えてみたい。`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const response = generateMockResponse(userMessage.content);
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <MessageBubble message={item} showEnglish={settings.showEnglish} />
      
      {item.role === "assistant" && item.quote && (
        <View style={styles.actionButtons}>
          <Pressable
            style={[styles.actionButton, { borderColor }]}
            onPress={() => handleAlternativeQuote(item.id)}
          >
            <ThemedText style={[styles.actionButtonText, { color: accentColor }]}>
              別の一節を
            </ThemedText>
          </Pressable>
          
          {item.question && (
            <Pressable
              style={[styles.actionButton, { borderColor }]}
              onPress={() => handleDigDeeper(item.id)}
            >
              <ThemedText style={[styles.actionButtonText, { color: accentColor }]}>
                もう少し掘る
              </ThemedText>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );

  // オンボーディング状態を確認中
  if (isComplete === null) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={accentColor} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingTop: Math.max(insets.top, 16),
              backgroundColor: surfaceColor,
              borderBottomColor: borderColor,
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.headerTitle}>
            漱石AI
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: textSecondary }]}>
            {settings.showEnglish ? "SOSEKI AI" : ""}
          </ThemedText>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messagesList,
            { paddingBottom: Spacing.lg },
          ]}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color={accentColor} />
            <ThemedText style={[styles.loadingText, { color: textSecondary }]}>
              漱石が考えております...
            </ThemedText>
          </View>
        )}

        {/* Input area */}
        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: Math.max(insets.bottom, 16),
              backgroundColor: surfaceColor,
              borderTopColor: borderColor,
            },
          ]}
        >
          <View style={[styles.inputWrapper, { backgroundColor: inputBgColor, borderColor }]}>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="悩みや迷いを話してみてください..."
              placeholderTextColor={textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              editable={!isLoading}
            />
          </View>
          
          <Pressable
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() && !isLoading ? accentColor : borderColor,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <ThemedText style={styles.sendButtonText}>送信</ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  messagesList: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  messageContainer: {
    marginBottom: Spacing.md,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  actionButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "500",
  },
  loadingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  loadingText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minHeight: 44,
    maxHeight: 120,
  },
  input: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    lineHeight: 22,
  },
  sendButton: {
    width: 60,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
