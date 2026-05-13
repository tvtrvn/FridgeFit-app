import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import * as Haptics from 'expo-haptics';

import { Colors, Radii, Spacing } from '@/constants/theme';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth,
  leftIcon,
  disabled,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  const handlePress = (e: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  const textColor = variantTextColor(variant);

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        pressed && pressedStyles[variant],
        (disabled || loading) && styles.disabled,
        typeof style === 'function' ? null : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.inner}>
          {leftIcon}
          <Text variant={size === 'sm' ? 'smallStrong' : 'bodyStrong'} style={{ color: textColor }}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function variantTextColor(v: Variant): string {
  switch (v) {
    case 'primary':
    case 'destructive':
      return Colors.textInverse;
    case 'secondary':
      return Colors.brandDeep;
    case 'ghost':
      return Colors.text;
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },
});

const sizeStyles = StyleSheet.create({
  sm: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, minHeight: 36 },
  md: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, minHeight: 48 },
  lg: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, minHeight: 56 },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: Colors.brand },
  secondary: { backgroundColor: Colors.brandSoft },
  ghost: { backgroundColor: 'transparent' },
  destructive: { backgroundColor: Colors.error },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: Colors.brandDeep },
  secondary: { backgroundColor: Colors.border },
  ghost: { backgroundColor: Colors.surfaceMuted },
  destructive: { opacity: 0.85 },
});
