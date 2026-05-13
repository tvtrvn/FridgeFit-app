import type { Ionicons } from '@expo/vector-icons';

type IoniconName = keyof typeof Ionicons.glyphMap;

export const DIETS = [
  { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf-outline' as IoniconName },
  { id: 'vegan', label: 'Vegan', icon: 'leaf' as IoniconName },
  { id: 'gluten-free', label: 'Gluten-free', icon: 'nutrition-outline' as IoniconName },
  { id: 'dairy-free', label: 'Dairy-free', icon: 'water-outline' as IoniconName },
  { id: 'nut-free', label: 'Nut-free', icon: 'ban-outline' as IoniconName },
] as const;

export type DietId = (typeof DIETS)[number]['id'];
