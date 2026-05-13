/**
 * SQLite client and schema migrations.
 *
 * Holds a single shared connection per app session. `getDb()` opens the DB
 * lazily on first call and runs migrations idempotently — safe to call from
 * anywhere.
 */

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'fridgefit.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = openAndMigrate();
  }
  return dbPromise;
}

async function openAndMigrate(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS ingredients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      is_staple INTEGER NOT NULL DEFAULT 0,
      added_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_ingredients_added_at
      ON ingredients(added_at DESC);
  `);
  return db;
}

/**
 * Wipe every user-owned table. Bound to Settings → "Reset app data".
 */
export async function resetAllData(): Promise<void> {
  const db = await getDb();
  await db.execAsync('DELETE FROM ingredients;');
}
