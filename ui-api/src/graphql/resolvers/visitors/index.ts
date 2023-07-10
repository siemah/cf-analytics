import { DrizzleD1Database } from "drizzle-orm/d1";
import statytics from "../../../db/schema/statytics";
import { gte, sql, and, lte } from "drizzle-orm";

type VisitorsArgs = {
  from?: number;
  to?: number;
}

type ResolverContext = {
  dbOrm: DrizzleD1Database<Record<string, never>>;
};

/**
 * Get number of visitors
 * 
 * @param _ 
 * @param args query argument which is optional
 * @param context resolver context
 * @returns number of visitors
 */
export default async function visitors(_: {}, args: VisitorsArgs, context: ResolverContext) {
  const weekTimestamp = 60 * 60 * 24 * 7 * 1000;
  const _to = args?.to ?? Date.now();
  const _from = args?.from ?? _to - weekTimestamp;
  const results = await context.dbOrm
    .select({
      count: sql<number>`COUNT(id)`
    })
    .from(statytics)
    .where(
      and(
        gte(statytics.createdAt, _from),
        lte(statytics.createdAt, _to)
      )
    )
    .get();
  return results.count;
}