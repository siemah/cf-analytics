import type { Config } from "drizzle-kit";
import { config } from 'dotenv'
config();

export default {
  dbCredentials: {
    url: `${process.env.turso_database_url}`,
    authToken: `${process.env.turso_database_token}`,
  },
  schema: "./src/db/schema/*",
  driver: "turso",
  out: "./src/db/turso-migration/"
} satisfies Config;