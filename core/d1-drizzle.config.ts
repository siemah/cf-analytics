import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  driver: "better-sqlite",
  out: "./src/db/migration/"
} satisfies Config;