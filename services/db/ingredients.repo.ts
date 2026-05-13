import type { Ingredient, IngredientId } from '@/types/ingredient';
import { getDb } from './client';

interface IngredientRow {
  id: string;
  name: string;
  display_name: string;
  is_staple: number;
  added_at: number;
}

function rowToIngredient(row: IngredientRow): Ingredient {
  return {
    id: row.id,
    name: row.name,
    displayName: row.display_name,
    isStaple: row.is_staple === 1,
    addedAt: row.added_at,
  };
}

export async function getAll(): Promise<Ingredient[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<IngredientRow>(
    'SELECT id, name, display_name, is_staple, added_at FROM ingredients ORDER BY added_at DESC',
  );
  return rows.map(rowToIngredient);
}

export async function insert(ingredient: Ingredient): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR IGNORE INTO ingredients (id, name, display_name, is_staple, added_at)
     VALUES (?, ?, ?, ?, ?)`,
    [
      ingredient.id,
      ingredient.name,
      ingredient.displayName,
      ingredient.isStaple ? 1 : 0,
      ingredient.addedAt,
    ],
  );
}

export async function remove(id: IngredientId): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM ingredients WHERE id = ?', [id]);
}

export async function clear(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM ingredients');
}
