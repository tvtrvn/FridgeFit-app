import type { DietId } from '@/constants/diets';
import type { AllergenId } from '@/constants/allergens';

export interface Preferences {
  diets: DietId[];
  allergens: AllergenId[];
  caloriePreference?: 'low' | 'moderate' | 'high';
}
