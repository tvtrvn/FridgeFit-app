export const ALLERGENS = [
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'tree-nuts', label: 'Tree nuts' },
  { id: 'shellfish', label: 'Shellfish' },
  { id: 'fish', label: 'Fish' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'soy', label: 'Soy' },
  { id: 'sesame', label: 'Sesame' },
  { id: 'wheat', label: 'Wheat' },
  { id: 'milk', label: 'Milk' },
] as const;

export type AllergenId = (typeof ALLERGENS)[number]['id'];
