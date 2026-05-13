/**
 * Normalize an ingredient name for matching.
 *
 * The goal is to compare what's in the fridge ("chopped tomatoes") to what
 * a recipe calls for ("2 large tomatoes, diced") and decide they're the same
 * thing. We strip quantities, prep words, and trailing s.
 */

const PREP_WORDS = new Set([
  'fresh', 'frozen', 'dried', 'cooked', 'raw',
  'chopped', 'diced', 'sliced', 'minced', 'crushed', 'grated', 'shredded',
  'peeled', 'cored', 'seeded', 'pitted', 'halved', 'quartered',
  'large', 'medium', 'small', 'whole', 'extra',
  'fine', 'finely', 'coarse', 'coarsely',
  'organic', 'free-range', 'boneless', 'skinless',
]);

const UNITS = new Set([
  'cup', 'cups', 'tbsp', 'tbsps', 'tsp', 'tsps',
  'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons',
  'g', 'gram', 'grams', 'kg', 'kilogram', 'kilograms',
  'oz', 'ounce', 'ounces', 'lb', 'lbs', 'pound', 'pounds',
  'ml', 'l', 'liter', 'liters', 'litre', 'litres',
  'pinch', 'pinches', 'dash', 'dashes',
  'can', 'cans', 'jar', 'jars', 'pack', 'packs', 'packet', 'packets',
  'clove', 'cloves', 'sprig', 'sprigs', 'bunch', 'bunches',
  'slice', 'slices', 'piece', 'pieces',
]);

export function normalizeIngredient(input: string): string {
  if (!input) return '';

  let s = input.toLowerCase().trim();

  s = s.replace(/[(),.;:!?"'`]/g, ' ');
  s = s.replace(/\d+([./]\d+)?/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();

  const tokens = s.split(' ').filter((t) => {
    if (!t) return false;
    if (PREP_WORDS.has(t)) return false;
    if (UNITS.has(t)) return false;
    return true;
  });

  const singularized = tokens.map(singularize);
  return singularized.join(' ').trim();
}

function singularize(word: string): string {
  if (word.length < 4) return word;
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('ses') || word.endsWith('xes')) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}
