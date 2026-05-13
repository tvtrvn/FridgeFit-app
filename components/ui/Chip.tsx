import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from './Text';

interface ChipProps {
  label: string;
  onPress?: () => void;
  onRemove?: () => void;
  selected?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  tone?: 'default' | 'success' | 'warning';
}

export function Chip({ label, onPress, onRemove, selected, leftIcon, tone = 'default' }: ChipProps) {
  const palette = paletteFor(tone, selected);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && onPress ? styles.pressed : null,
      ]}
    >
      {leftIcon ? <Ionicons name={leftIcon} size={14} color={palette.text} /> : null}
      <Text variant="smallStrong" style={{ color: palette.text }}>
        {label}
      </Text>
      {onRemove ? (
        <Pressable onPress={onRemove} hitSlop={10} style={styles.remove}>
          <Ionicons name="close" size={14} color={palette.text} />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

function paletteFor(tone: 'default' | 'success' | 'warning', selected?: boolean) {
  if (tone === 'success') {
    return { bg: Colors.successSoft, border: Colors.success, text: Colors.brandDeep };
  }
  if (tone === 'warning') {
    return { bg: Colors.accentSoft, border: Colors.accent, text: Colors.text };
  }
  if (selected) {
    return { bg: Colors.brandSoft, border: Colors.brand, text: Colors.brandDeep };
  }
  return { bg: Colors.surfaceElevated, border: Colors.border, text: Colors.text };
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.pill,
    borderWidth: 1,
  },
  pressed: { opacity: 0.7 },
  remove: { marginLeft: Spacing.xs },
});
