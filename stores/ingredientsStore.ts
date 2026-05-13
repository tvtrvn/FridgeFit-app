import { create } from 'zustand';

import { normalizeIngredient } from '@/lib/normalize';
import * as repo from '@/services/db/ingredients.repo';
import type { Ingredient, IngredientId } from '@/types/ingredient';

interface IngredientsState {
  ingredients: Ingredient[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  add: (raw: string) => void;
  remove: (id: IngredientId) => void;
  clear: () => void;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useIngredientsStore = create<IngredientsState>((set, get) => ({
  ingredients: [],
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    try {
      const ingredients = await repo.getAll();
      set({ ingredients, hydrated: true });
    } catch (err) {
      console.warn('[ingredients] hydrate failed:', err);
      set({ hydrated: true });
    }
  },

  add: (raw) => {
    const display = raw.trim();
    const normalized = normalizeIngredient(display);
    if (!normalized) return;
    if (get().ingredients.some((i) => i.name === normalized)) return;

    const ingredient: Ingredient = {
      id: makeId(),
      name: normalized,
      displayName: display.toLowerCase(),
      addedAt: Date.now(),
    };

    set((state) => ({ ingredients: [ingredient, ...state.ingredients] }));

    repo.insert(ingredient).catch((err) => {
      console.warn('[ingredients] insert failed, rolling back:', err);
      set((state) => ({ ingredients: state.ingredients.filter((i) => i.id !== ingredient.id) }));
    });
  },

  remove: (id) => {
    const snapshot = get().ingredients;
    set({ ingredients: snapshot.filter((i) => i.id !== id) });
    repo.remove(id).catch((err) => {
      console.warn('[ingredients] remove failed, rolling back:', err);
      set({ ingredients: snapshot });
    });
  },

  clear: () => {
    const snapshot = get().ingredients;
    set({ ingredients: [] });
    repo.clear().catch((err) => {
      console.warn('[ingredients] clear failed, rolling back:', err);
      set({ ingredients: snapshot });
    });
  },
}));
