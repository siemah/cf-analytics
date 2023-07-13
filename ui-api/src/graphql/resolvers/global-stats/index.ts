import statytics from "@/db/schema/statytics";
import { gte, sql, and, lte, desc } from "drizzle-orm";
import { ResolverSharedArgs, ResolverSharedContext } from "@/graphql/types";
import { oneWeekTimestamp } from "@/config/constants";
import logToAPM from "@/libs/apm-logs";

/**
 * Get number of visitors
 * 
 * @param _ 
 * @param args query argument which is optional
 * @param context resolver context
 * @returns number of visitors
 */
export default async function globalStats(_: {}, args: Omit<ResolverSharedArgs, "page">, context: ResolverSharedContext) {
  let results;
  const _to = args?.to ?? Date.now();
  const _from = args?.from ?? _to - oneWeekTimestamp;

  try {
    const { count: visitors } = await context.dbOrm
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
    const browser = await context.dbOrm
      .select({
        name: sql<string>`json_extract(browser, '$.name') as name`,
        total: sql<number>`count(json_extract(browser, '$.name')) as total`
      })
      .from(statytics)
      .groupBy(sql<string>`name`)
      .orderBy(desc(sql<number>`total`))
      .get();
    const os = await context.dbOrm
      .select({
        name: sql<string>`json_extract(os, '$.name') as name`,
        total: sql<number>`count(json_extract(os, '$.name')) as total`
      })
      .from(statytics)
      .groupBy(sql<string>`name`)
      .orderBy(desc(sql<number>`total`))
      .get();
    const country = await context.dbOrm
      .select({
        name: statytics.country,
        total: sql<number>`count(country) as total`
      })
      .from(statytics)
      .groupBy(statytics.country)
      .orderBy(desc(sql<number>`total`))
      .get();

    results = {
      visitors,
      country: country.name,
      browser: browser.name,
      os: os?.name
    };
  } catch (error) {
    logToAPM(
      context.request.raw.tracer,
      JSON.stringify(error)
    );
    results = {
      visitors: 0,
      country: null,
      browser: null,
      os: null
    };
  }

  return results;
}