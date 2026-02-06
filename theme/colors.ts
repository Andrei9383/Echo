import { Platform } from 'react-native';

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'BricolageGrotesque_400Regular',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'Georgia',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'Menlo',
  },
  default: {
    sans: 'BricolageGrotesque_400Regular',
    serif: 'Georgia',
    rounded: 'normal',
    mono: 'Menlo',
  },
  web: {
    sans: "'Bricolage Grotesque', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "Menlo, SFMono-Regular, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const lightColors = {
  // Base colors
  background: '#f1f0e5',
  foreground: '#56453f',

  // Card colors
  card: '#f1f0e5',
  cardForeground: '#56453f',

  // Popover colors
  popover: '#ffffff',
  popoverForeground: '#56453f',

  // Primary colors
  primary: '#a37764',
  primaryForeground: '#ffffff',

  // Secondary colors
  secondary: '#baab92',
  secondaryForeground: '#ffffff',

  // Muted colors
  muted: '#e4c7b8',
  mutedForeground: '#8a655a',

  // Accent colors
  accent: '#e4c7b8',
  accentForeground: '#56453f',

  // Destructive colors
  destructive: '#1f1a17',
  destructiveForeground: '#ffffff',

  // Border and input
  border: '#baab92',
  input: '#baab92',
  ring: '#a37764',

  // Text colors
  text: '#56453f',
  textMuted: '#8a655a',

  // Legacy support for existing components
  tint: '#a37764',
  icon: '#8a655a',
  tabIconDefault: '#8a655a',
  tabIconSelected: '#a37764',

  // Default buttons, links, Send button, selected tabs
  blue: '#a37764',

  // Success states, FaceTime buttons, completed tasks
  green: '#34C759',

  // Delete buttons, error states, critical alerts
  red: '#1f1a17',

  // VoiceOver highlights, warning states
  orange: '#FF9500',

  // Notes app accent, Reminders highlights
  yellow: '#FFCC00',

  // Pink accent color for various UI elements
  pink: '#FF2D92',

  // Purple accent for creative apps and features
  purple: '#AF52DE',

  // Teal accent for communication features
  teal: '#5AC8FA',

  // Indigo accent for system features
  indigo: '#5856D6',
};

export const darkColors = {
  // Base colors
  background: '#2d2521',
  foreground: '#f1f0e5',

  // Card colors
  card: '#3c332e',
  cardForeground: '#f1f0e5',

  // Popover colors
  popover: '#3c332e',
  popoverForeground: '#f1f0e5',

  // Primary colors
  primary: '#c39e88',
  primaryForeground: '#2d2521',

  // Secondary colors
  secondary: '#8a655a',
  secondaryForeground: '#f1f0e5',

  // Muted colors
  muted: '#56453f',
  mutedForeground: '#c5aa9b',

  // Accent colors
  accent: '#baab92',
  accentForeground: '#2d2521',

  // Destructive colors
  destructive: '#e57373',
  destructiveForeground: '#2d2521',

  // Border and input - using alpha values for better blending
  border: '#56453f',
  input: '#56453f',
  ring: '#c39e88',

  // Text colors
  text: '#f1f0e5',
  textMuted: '#c5aa9b',

  // Legacy support for existing components
  tint: '#f1f0e5',
  icon: '#c5aa9b',
  tabIconDefault: '#c5aa9b',
  tabIconSelected: '#f1f0e5',

  // Default buttons, links, Send button, selected tabs
  blue: '#c39e88',

  // Success states, FaceTime buttons, completed tasks
  green: '#30D158',

  // Delete buttons, error states, critical alerts
  red: '#e57373',

  // VoiceOver highlights, warning states
  orange: '#FF9F0A',

  // Notes app accent, Reminders highlights
  yellow: '#FFD60A',

  // Pink accent color for various UI elements
  pink: '#FF375F',

  // Purple accent for creative apps and features
  purple: '#BF5AF2',

  // Teal accent for communication features
  teal: '#64D2FF',

  // Indigo accent for system features
  indigo: '#5E5CE6',
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};
