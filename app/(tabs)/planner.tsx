import { StyleSheet, View } from 'react-native';

import { EmptyState, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';

export default function PlannerScreen() {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="display">Planner</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Plan meals for the week ahead.
        </Text>
      </View>

      <EmptyState
        icon="calendar-outline"
        title="Meal planning arrives in v1"
        description="Once recipe matching lands, you'll be able to drop favorites onto specific dates."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: Spacing.sm, marginBottom: Spacing.xl },
  subtitle: { marginTop: Spacing.xs, maxWidth: 320 },
});
