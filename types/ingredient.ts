export type IngredientId = string;

export interface Ingredient {
  id: IngredientId;
  name: string;
  displayName: string;
  isStaple?: boolean;
  addedAt: number;
}
