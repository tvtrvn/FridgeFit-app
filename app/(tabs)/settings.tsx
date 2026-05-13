import { StyleSheet, View } from 'react-native';

import { Card, Screen, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';

export default function SettingsScreen() {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="display">Settings</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Dietary preferences, allergies, and app info.
        </Text>
      </View>

      <Section title="Diet">
        <Card>
          <Text color="textSecondary">Dietary filters are wired up in M5. You&apos;ll be able to select Vegetarian, Vegan, Gluten-free, Dairy-free, and Nut-free.</Text>
        </Card>
      </Section>

      <Section title="Allergies">
        <Card>
          <Text color="textSecondary">Allergen filters arrive in M5. Filters apply across Discover and the meal planner.</Text>
        </Card>
      </Section>

      <Section title="About">
        <Card>
          <Text variant="bodyStrong">FridgeFit</Text>
          <Text variant="small" color="textSecondary" style={styles.mt}>Version 0.1.0 · MVP scaffold (M1)</Text>
          <Text variant="small" color="textSecondary" style={styles.mt}>
            Nutrition figures are estimates, not medical advice.
          </Text>
        </Card>
      </Section>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="heading" color="textSecondary" style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: Spacing.sm, marginBottom: Spacing.xl },
  subtitle: { marginTop: Spacing.xs, maxWidth: 320 },
  section: { marginTop: Spacing.xl },
  sectionTitle: {
    color: Colors.textMuted,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.6,
    marginBottom: Spacing.sm,
    fontWeight: '700',
  },
  mt: { marginTop: Spacing.xs },
});
