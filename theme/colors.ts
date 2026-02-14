import { Platform } from 'react-native';

/**
 * Echo Design System — "Playful Nocturnal"
 * 
 * Inspired by Echo the bat mascot:
 *   • Deep indigo nights
 *   • Lavender & violet wings
 *   • Warm cream belly
 *   • Rosy pink inner ears
 *   • Bouncy, cartoonish, Duolingo-style personality
 * 
 * Font: Bricolage Grotesque — quirky, chunky, full of character
 */

export const Fonts = Platform.select({
  ios: {
    sans: 'BricolageGrotesque_400Regular',
    sansBold: 'BricolageGrotesque_700Bold',
    serif: 'Georgia',
    rounded: 'ui-rounded',
    mono: 'Menlo',
  },
  default: {
    sans: 'BricolageGrotesque_400Regular',
    sansBold: 'BricolageGrotesque_700Bold',
    serif: 'Georgia',
    rounded: 'normal',
    mono: 'Menlo',
  },
  web: {
    sans: "'Bricolage Grotesque', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    sansBold: "'Bricolage Grotesque', system-ui, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "Menlo, SFMono-Regular, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// ─── Brand Palette ─────────────────────────────────────────
// Extracted from the Echo bat mascot

export const brand = {
  // Core indigo/navy — the night sky
  indigo900: '#13103a',
  indigo800: '#1c1650',
  indigo700: '#251d68',
  indigo600: '#302680',
  indigo500: '#3d32a0',

  // Lavender/violet — Echo's body
  lavender900: '#4a3d7a',
  lavender700: '#6b5d99',
  lavender500: '#9081b8',
  lavender400: '#a99bcc',
  lavender300: '#c4b9e0',
  lavender200: '#ddd6f0',
  lavender100: '#efe9f8',

  // Cream/ivory — Echo's belly & wings
  cream: '#f5f0e3',
  creamLight: '#faf8f0',
  creamDark: '#e8e0cc',

  // Rosy pink — Echo's inner ears
  pink500: '#e8879b',
  pink400: '#f0a0b2',
  pink300: '#f5bdc8',

  // Accent colors — fun & cartoonish
  mint: '#58d4a0',
  mintLight: '#7de8bb',
  mintDark: '#3cbf85',

  coral: '#ff7b6b',
  coralLight: '#ff9e92',
  coralDark: '#e8574a',

  sunflower: '#ffc63e',
  sunflowerLight: '#ffd76e',
  sunflowerDark: '#e8a820',

  sky: '#5cc5ff',
  skyLight: '#8ed9ff',
  skyDark: '#3aacf0',

  // Neutrals
  dark: '#1a1530',
  darkCard: '#231e42',
  darkMuted: '#3a3358',
  darkBorder: '#4a4270',
};

export const lightColors = {
  // Base colors
  background: brand.creamLight,
  foreground: brand.indigo800,

  // Card colors
  card: '#ffffff',
  cardForeground: brand.indigo800,

  // Popover colors
  popover: '#ffffff',
  popoverForeground: brand.indigo800,

  // Primary colors — rich violet
  primary: brand.indigo600,
  primaryForeground: '#ffffff',

  // Secondary colors — soft lavender
  secondary: brand.lavender200,
  secondaryForeground: brand.indigo700,

  // Muted colors
  muted: brand.lavender100,
  mutedForeground: brand.lavender700,

  // Accent colors — warm pink
  accent: brand.pink400,
  accentForeground: '#ffffff',

  // Destructive colors
  destructive: brand.coralDark,
  destructiveForeground: '#ffffff',

  // Success colors
  success: brand.mint,
  successForeground: '#ffffff',

  // Warning colors
  warning: brand.sunflower,
  warningForeground: brand.indigo800,

  // Info colors
  info: brand.sky,
  infoForeground: '#ffffff',

  // Border and input
  border: brand.lavender300,
  input: brand.lavender200,
  ring: brand.indigo500,

  // Text colors
  text: brand.indigo800,
  textMuted: brand.lavender700,

  // Legacy support for existing components
  tint: brand.indigo600,
  icon: brand.lavender700,
  tabIconDefault: brand.lavender500,
  tabIconSelected: brand.indigo600,

  // Semantic accent colors
  blue: brand.sky,
  green: brand.mint,
  red: brand.coral,
  orange: brand.sunflower,
  yellow: brand.sunflowerLight,
  pink: brand.pink500,
  purple: brand.lavender500,
  teal: brand.mintLight,
  indigo: brand.indigo500,

  // Echo-specific brand tokens
  echoBody: brand.lavender500,
  echoBelly: brand.cream,
  echoEar: brand.pink400,
  echoNight: brand.indigo800,

  // Streak / gamification
  streakActive: brand.sunflower,
  streakInactive: brand.lavender200,
  xpGain: brand.mint,
  levelBadge: brand.indigo500,
};

export const darkColors = {
  // Base colors — deep midnight
  background: brand.dark,
  foreground: brand.cream,

  // Card colors
  card: brand.darkCard,
  cardForeground: brand.cream,

  // Popover colors
  popover: brand.darkCard,
  popoverForeground: brand.cream,

  // Primary colors — bright lavender on dark
  primary: brand.lavender400,
  primaryForeground: brand.dark,

  // Secondary colors
  secondary: brand.darkMuted,
  secondaryForeground: brand.lavender200,

  // Muted colors
  muted: brand.darkMuted,
  mutedForeground: brand.lavender300,

  // Accent colors — bright pink
  accent: brand.pink500,
  accentForeground: '#ffffff',

  // Destructive colors
  destructive: brand.coral,
  destructiveForeground: brand.dark,

  // Success colors
  success: brand.mintLight,
  successForeground: brand.dark,

  // Warning colors
  warning: brand.sunflowerLight,
  warningForeground: brand.dark,

  // Info colors
  info: brand.skyLight,
  infoForeground: brand.dark,

  // Border and input
  border: brand.darkBorder,
  input: brand.darkMuted,
  ring: brand.lavender400,

  // Text colors
  text: brand.cream,
  textMuted: brand.lavender300,

  // Legacy support
  tint: brand.lavender300,
  icon: brand.lavender300,
  tabIconDefault: brand.lavender500,
  tabIconSelected: brand.lavender300,

  // Semantic accent colors
  blue: brand.skyLight,
  green: brand.mintLight,
  red: brand.coralLight,
  orange: brand.sunflowerLight,
  yellow: brand.sunflowerLight,
  pink: brand.pink400,
  purple: brand.lavender400,
  teal: brand.mintLight,
  indigo: brand.lavender400,

  // Echo-specific brand tokens
  echoBody: brand.lavender400,
  echoBelly: brand.creamDark,
  echoEar: brand.pink400,
  echoNight: brand.indigo900,

  // Streak / gamification
  streakActive: brand.sunflower,
  streakInactive: brand.darkMuted,
  xpGain: brand.mintLight,
  levelBadge: brand.lavender400,
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};
