import { Platform } from "react-native";

export const COLORS = {
  light: {
    primary: "#322214", // Deep ink/wood
    background: "#FDFCF8", // Parchment
    surface: "#FFFFFF",
    border: "#E8E4D9",
    borderLight: "#F0EEE6",
    textSecondary: "#6B5B4E",
    textTertiary: "#9C9284",
    gold: "#D4AF37",
    goldDark: "#B8860B",
    error: "#8B3030",
  },
  dark: {
    primary: "#FDFCF8", // Parchment for text in dark mode
    background: "#1A1A1A", // Deep dark background
    surface: "#262626", // Darker surface
    border: "#333333",
    borderLight: "#404040",
    textSecondary: "#A0A0A0",
    textTertiary: "#808080",
    gold: "#E5C158",
    goldDark: "#D4AF37",
    error: "#E57373",
  },
};

export const FONTS = {
  serif: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "serif",
  }),
  sans: Platform.select({
    ios: "Helvetica",
    android: "sans-serif",
    default: "sans-serif",
  }),
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24, // was missing — caused silent undefined in PaywallScreen, BlitzGame, etc.
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#322214",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Also keep the original boilerplate exports just in case some other components use them
export const Colors = {
  light: {
    text: COLORS.light.primary,
    background: COLORS.light.background,
    tint: COLORS.light.gold,
    icon: COLORS.light.textTertiary,
    tabIconDefault: COLORS.light.textTertiary,
    tabIconSelected: COLORS.light.gold,
  },
  dark: {
    text: COLORS.dark.primary,
    background: COLORS.dark.background,
    tint: COLORS.dark.gold,
    icon: COLORS.dark.textTertiary,
    tabIconDefault: COLORS.dark.textTertiary,
    tabIconSelected: COLORS.dark.gold,
  },
};
