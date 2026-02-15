import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import {
  openDatabaseSync,
  useSQLiteContext,
  SQLiteDatabase,
} from "expo-sqlite";
import { useMemo } from "react";

export const DATABASE_NAME = "activities";

let db: ExpoSQLiteDatabase | null = null;

export const createDb = () => {
  if (!db) {
    const expoDb = openDatabaseSync(DATABASE_NAME);
    db = drizzle(expoDb);
  }

  return db;
};

export const useDb = () => {
  const expoDb = useSQLiteContext();
  return useMemo(() => drizzle(expoDb), [expoDb]);
};
