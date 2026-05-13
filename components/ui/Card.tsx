import { StyleSheet, View, type ViewProps } from 'react-native';

import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';

interface CardProps extends ViewProps {
  elevated?: boolean;
  padding?: keyof typeof Spacing;
}

export function Card({ elevated, padding = 'lg', style, children, ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding: Spacing[padding] },
        elevated ? Shadows.md : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
