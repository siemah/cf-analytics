import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

/**
 * Get database connection to turso db
 * 
 * @param url turso/sqlite/other database url
 * @param authToken related to turso within drizzle orm
 * @returns turso database connection
 */
function getDatabase(url: string, authToken: string) {
  const client = createClient({
    url,
    authToken
  });
  const database = drizzle(client);

  return database;
}

export default getDatabase;