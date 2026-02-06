import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";

export const DATABASE_NAME = "activities";

export const createDb = () => {
	const expoDb = openDatabaseSync(DATABASE_NAME);
	return drizzle(expoDb);
};

export const useDb = () => {
	const expoDb = useSQLiteContext();
	return useMemo(() => drizzle(expoDb), [expoDb]);
};