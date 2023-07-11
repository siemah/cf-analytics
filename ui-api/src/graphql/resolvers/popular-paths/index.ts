import statytics from "@/db/schema/statytics";
import { gte, sql, and, lte, desc, } from "drizzle-orm";
import { ResolverSharedArgs, ResolverSharedContext } from "@/graphql/types";
import { maxItemPerPage, oneWeekTimestamp } from "@/config/constants";

/**
 * Get popular paths
 * 
 * @param _ 
 * @param args query argument which is optional
 * @param context resolver context
 * @returns list of popular paths most visited from the most to the least
 */
export default async function popularPaths(_: {}, args: ResolverSharedArgs, context: ResolverSharedContext) {
  let results: { name: string | null; total: number }[];
  const _to = args?.to ?? Date.now();
  const _from = args?.from ?? _to - oneWeekTimestamp;
  const _page = args?.page ?? 1;

  try {
    results = await context.dbOrm
      .select({
        total: sql<number>`COUNT(url) as total`,
        name: statytics.url
      })
      .from(statytics)
      .where(
        and(
          gte(statytics.createdAt, _from),
          lte(statytics.createdAt, _to)
        )
      )
      .groupBy(statytics.url)
      .orderBy(desc(sql<number>`total`))
      .limit(maxItemPerPage)
      .offset((_page - 1) * maxItemPerPage)
      .all();
  } catch (error) {
    results = [];
  }

  return results;
}