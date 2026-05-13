import { ScrollView, StyleSheet, View, type ViewProps, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

interface ScreenProps extends ViewProps {
  scroll?: boolean;
  padded?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
}

export function Screen({
  scroll = false,
  padded = true,
  style,
  contentContainerStyle,
  children,
  ...rest
}: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={[styles.body, style]}
          contentContainerStyle={[
            padded ? styles.padded : null,
            { paddingBottom: Spacing['3xl'] },
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={[styles.body, padded && styles.padded, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  body: { flex: 1, backgroundColor: Colors.surface },
  padded: { paddingHorizontal: Spacing.xl },
});
