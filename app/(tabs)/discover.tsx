import { StyleSheet, View } from 'react-native';

import { EmptyState, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useIngredientsStore } from '@/stores/ingredientsStore';

export default function DiscoverScreen() {
  const hasIngredients = useIngredientsStore((s) => s.ingredients.length > 0);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="display">Discover</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Recipes ranked by what&apos;s already in your fridge.
        </Text>
      </View>

      <EmptyState
        icon={hasIngredients ? 'sparkles-outline' : 'basket-outline'}
        title={hasIngredients ? 'Recipes are coming soon' : 'Add ingredients first'}
        description={
          hasIngredients
            ? 'Recipe matching arrives in the next build. Stay tuned.'
            : 'Head back to the Fridge tab and add a few ingredients. Then we can find matches.'
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: Spacing.sm, marginBottom: Spacing.xl },
  subtitle: { marginTop: Spacing.xs, maxWidth: 320 },
});
