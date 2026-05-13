import { StyleSheet, View } from 'react-native';

import { EmptyState, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';

export default function FavoritesScreen() {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="display">Saved</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Your favorite recipes, ready to cook again.
        </Text>
      </View>

      <EmptyState
        icon="heart-outline"
        title="No saved recipes yet"
        description="Tap the heart on any recipe to save it here for later."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: Spacing.sm, marginBottom: Spacing.xl },
  subtitle: { marginTop: Spacing.xs, maxWidth: 320 },
});
