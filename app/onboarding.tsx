import { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  FlatList,
  ViewToken,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useOnboarding } from "@/hooks/use-settings";
import { BorderRadius, Spacing } from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "漱石AIへようこそ",
    description: "夏目漱石の文体と思索を模した対話AIが、あなたの悩みや迷いに寄り添います。",
    icon: "📚",
  },
  {
    id: "2",
    title: "引用と問い返し",
    description: "漱石作品からの引用を交えながら、答えを与えるのではなく、考えるきっかけを提供します。",
    icon: "💭",
  },
  {
    id: "3",
    title: "静かな対話の時間",
    description: "一般的なAIとは異なる、知的で落ち着いた距離感で、あなたの内省を促します。",
    icon: "🌙",
  },
];

const disclaimer = `【免責事項】
本アプリは、夏目漱石の文体を模したAIによる対話体験を提供するものです。

・医療、法律、金融等の専門的なアドバイスを提供するものではありません
・深刻な悩みをお持ちの方は、専門家にご相談ください
・引用は青空文庫等のパブリックドメイン作品から取得しています

相談窓口：
よりそいホットライン 0120-279-338（24時間）
いのちの電話 0570-783-556`;

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { completeOnboarding } = useOnboarding();

  const accentColor = useThemeColor({}, "accent");
  const textSecondary = useThemeColor({}, "textSecondary");
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");

  const scrollX = useSharedValue(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setShowDisclaimer(true);
    }
  };

  const handleStart = async () => {
    await completeOnboarding();
    router.replace("/(tabs)");
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
    return (
      <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
        <View style={styles.iconContainer}>
          <ThemedText style={styles.icon}>{item.icon}</ThemedText>
        </View>
        <ThemedText type="title" style={styles.slideTitle}>
          {item.title}
        </ThemedText>
        <ThemedText style={[styles.slideDescription, { color: textSecondary }]}>
          {item.description}
        </ThemedText>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? accentColor : textSecondary,
                opacity: index === currentIndex ? 1 : 0.3,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  if (showDisclaimer) {
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
        <View style={styles.disclaimerContainer}>
          <ThemedText type="subtitle" style={styles.disclaimerTitle}>
            ご利用にあたって
          </ThemedText>
          <View style={[styles.disclaimerBox, { backgroundColor: surfaceColor }]}>
            <ThemedText style={styles.disclaimerText}>{disclaimer}</ThemedText>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={handleStart}
          >
            <ThemedText style={styles.buttonText}>同意して始める</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

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
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
      />

      {renderDots()}

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: accentColor }]}
          onPress={handleNext}
        >
          <ThemedText style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "次へ" : "次へ"}
          </ThemedText>
        </Pressable>

        {currentIndex < slides.length - 1 && (
          <Pressable
            style={styles.skipButton}
            onPress={() => setShowDisclaimer(true)}
          >
            <ThemedText style={[styles.skipText, { color: textSecondary }]}>
              スキップ
            </ThemedText>
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 72,
  },
  slideTitle: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  slideDescription: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    paddingHorizontal: Spacing.lg,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  button: {
    height: 52,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  skipButton: {
    marginTop: Spacing.md,
    alignItems: "center",
    padding: Spacing.sm,
  },
  skipText: {
    fontSize: 15,
  },
  disclaimerContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  disclaimerTitle: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  disclaimerBox: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 24,
  },
});
