import { DrizzleD1Database } from "drizzle-orm/d1";
import statytics from "../../../db/schema/statytics";

export default async function visitors(_: {}, args: {}, e: {dbOrm: DrizzleD1Database<Record<string, never>>}) {
  const results = await e.dbOrm.select().from(statytics).all();
  console.log("<<<<[[[results]]]>>>>", results)
  return "100";
}