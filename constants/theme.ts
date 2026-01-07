/**
 * SOSEKI AI Theme Configuration
 * 夏目漱石の知的で落ち着いた雰囲気を表現するカラーパレット
 */

import { Platform } from "react-native";

// Brand Colors
const brandColors = {
  // 墨色 - Primary text and elements
  ink: "#2C2C2C",
  // 藍色 - Accent color
  indigo: "#1E4D6B",
  indigoLight: "#4A8DB7",
  // 和紙色 - Warm background
  washi: "#F5F1E8",
  washiDark: "#E8E4DB",
  // 引用カード用
  quoteBackground: "#F0EBE0",
  quoteBorder: "#D4C9B8",
};

export const Colors = {
  light: {
    text: brandColors.ink,
    textSecondary: "#6B6B6B",
    background: "#FAFAF7",
    surface: "#FFFFFF",
    tint: brandColors.indigo,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: brandColors.indigo,
    // Custom colors for SOSEKI AI
    quoteBackground: brandColors.quoteBackground,
    quoteBorder: brandColors.quoteBorder,
    quoteText: "#4A4A4A",
    userBubble: brandColors.indigo,
    userBubbleText: "#FFFFFF",
    aiBubble: brandColors.washiDark,
    aiBubbleText: brandColors.ink,
    accent: brandColors.indigo,
    border: "#E0E0E0",
    inputBackground: "#FFFFFF",
  },
  dark: {
    text: brandColors.washi,
    textSecondary: "#A0A0A0",
    background: "#1A1A1A",
    surface: "#2C2C2C",
    tint: brandColors.indigoLight,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: brandColors.indigoLight,
    // Custom colors for SOSEKI AI
    quoteBackground: "#3A3A3A",
    quoteBorder: "#4A4A4A",
    quoteText: "#E0E0E0",
    userBubble: brandColors.indigoLight,
    userBubbleText: "#FFFFFF",
    aiBubble: "#3A3A3A",
    aiBubbleText: brandColors.washi,
    accent: brandColors.indigoLight,
    border: "#404040",
    inputBackground: "#2C2C2C",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "'Hiragino Mincho ProN', 'Yu Mincho', Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Spacing constants
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Border radius constants
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};
