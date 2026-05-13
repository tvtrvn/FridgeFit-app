/**
 * FridgeFit design system — light-only.
 *
 * Color philosophy: warm, healthy, calm. Sage as the anchor (food-adjacent
 * without screaming "salad app"), peach as a humanizing accent. Off-white
 * surface so the app feels softer than a generic white phone screen.
 */

import { Platform, type TextStyle } from 'react-native';

export const Colors = {
  brand: '#2F7D5F',
  brandSoft: '#E6F1EB',
  brandDeep: '#235D47',

  accent: '#F4A261',
  accentSoft: '#FCEBD8',

  surface: '#FAF7F2',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F2EFE9',

  text: '#1A1F1B',
  textSecondary: '#5C6660',
  textMuted: '#8A938E',
  textInverse: '#FFFFFF',

  border: '#E8E5DD',
  borderStrong: '#D8D4C9',

  success: '#3B9A6B',
  successSoft: '#E3F2EA',
  warning: '#E9A45B',
  error: '#C25B5B',
  errorSoft: '#F8E4E4',

  overlay: 'rgba(26, 31, 27, 0.45)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    rounded: 'ui-rounded',
    serif: 'ui-serif',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    rounded: 'normal',
    serif: 'serif',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    rounded: "'SF Pro Rounded', system-ui, -apple-system, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
})!;

export const Type = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '700', fontFamily: Fonts.rounded },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700', fontFamily: Fonts.rounded },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: '600', fontFamily: Fonts.rounded },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400', fontFamily: Fonts.sans },
  bodyStrong: { fontSize: 16, lineHeight: 22, fontWeight: '600', fontFamily: Fonts.sans },
  small: { fontSize: 14, lineHeight: 20, fontWeight: '400', fontFamily: Fonts.sans },
  smallStrong: { fontSize: 14, lineHeight: 20, fontWeight: '600', fontFamily: Fonts.sans },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500', fontFamily: Fonts.sans },
} satisfies Record<string, TextStyle>;

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  radii: Radii,
  shadows: Shadows,
  type: Type,
  fonts: Fonts,
} as const;

export type ThemeType = typeof Theme;
