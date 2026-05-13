export type RecipeId = string;

export interface RecipeIngredient {
  name: string;
  normalizedName: string;
  measure?: string;
}

export interface RecipeSummary {
  id: RecipeId;
  title: string;
  imageUrl?: string;
  tags: string[];
  source: 'themealdb' | 'curated';
}

export interface Recipe extends RecipeSummary {
  ingredients: RecipeIngredient[];
  instructions: string;
  youtubeUrl?: string;
  servings?: number;
  estimatedCaloriesPerServing?: number;
  caloriesAreEstimated?: boolean;
}

export interface RecipeMatch {
  recipe: RecipeSummary;
  haveCount: number;
  totalCount: number;
  missingIngredients: string[];
  score: number;
}
