import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, type TextInput as RNTextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Chip, EmptyState, Input, Screen, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';
import { useIngredientsStore } from '@/stores/ingredientsStore';

const STARTER_SUGGESTIONS = ['tomato', 'spinach', 'egg', 'chicken', 'rice', 'garlic'];

export default function FridgeScreen() {
  const [text, setText] = useState('');
  const inputRef = useRef<RNTextInput>(null);

  const ingredients = useIngredientsStore((s) => s.ingredients);
  const hydrated = useIngredientsStore((s) => s.hydrated);
  const add = useIngredientsStore((s) => s.add);
  const remove = useIngredientsStore((s) => s.remove);

  const handleAdd = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    add(trimmed);
    setText('');
  }, [text, add]);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="display">Your Fridge</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Add what you have. We&apos;ll find recipes you can cook tonight.
        </Text>
      </View>

      <Input
        ref={inputRef}
        leftIcon="search-outline"
        placeholder="Add an ingredient, e.g. spinach"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
        autoCorrect={false}
        autoCapitalize="none"
        rightElement={text.trim().length > 0 ? <AddButton onPress={handleAdd} /> : null}
      />

      {!hydrated ? null : ingredients.length === 0 ? (
        <EmptyState
          icon="basket-outline"
          title="Your fridge is empty"
          description="Add a few ingredients to start finding recipes you can make right now."
          action={
            <View style={styles.starters}>
              {STARTER_SUGGESTIONS.map((starter) => (
                <Chip key={starter} label={starter} leftIcon="add" onPress={() => add(starter)} />
              ))}
            </View>
          }
        />
      ) : (
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text variant="heading">In your fridge</Text>
            <Text variant="smallStrong" color="textMuted">
              {ingredients.length} item{ingredients.length === 1 ? '' : 's'}
            </Text>
          </View>
          <View style={styles.chipList}>
            {ingredients.map((ing) => (
              <Chip key={ing.id} label={ing.displayName} onRemove={() => remove(ing.id)} />
            ))}
          </View>

          <View style={styles.cta}>
            <Button
              title="Find recipes I can make"
              size="lg"
              fullWidth
              leftIcon={<Ionicons name="sparkles" size={18} color={Colors.textInverse} />}
              onPress={() => {
                /* M3: navigate to Discover tab */
              }}
            />
          </View>
        </View>
      )}
    </Screen>
  );
}

function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.7 }]}
    >
      <Ionicons name="arrow-up" size={18} color={Colors.textInverse} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: Spacing.sm, marginBottom: Spacing.xl },
  subtitle: { marginTop: Spacing.xs, maxWidth: 320 },
  starters: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap', justifyContent: 'center' },
  listSection: { marginTop: Spacing.xl },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.md,
  },
  chipList: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  cta: { marginTop: Spacing['2xl'] },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
