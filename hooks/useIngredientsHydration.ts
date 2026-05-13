import { useEffect } from 'react';

import { useIngredientsStore } from '@/stores/ingredientsStore';

/**
 * Run once at app start to load ingredients from SQLite into the in-memory
 * store. Safe to mount more than once — hydration is idempotent and short-
 * circuits on the second call.
 */
export function useIngredientsHydration(): boolean {
  const hydrated = useIngredientsStore((s) => s.hydrated);
  const hydrate = useIngredientsStore((s) => s.hydrate);

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrated, hydrate]);

  return hydrated;
}
