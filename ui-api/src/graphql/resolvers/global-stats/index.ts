import { DrizzleD1Database } from "drizzle-orm/d1";
import statytics from "../../../db/schema/statytics";
import { gte, sql, and, lte, eq, asc, desc } from "drizzle-orm";

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
export default async function gobalStats(_: {}, args: VisitorsArgs, context: ResolverContext) {
  let results;
  const weekTimestamp = 60 * 60 * 24 * 7 * 1000;
  const _to = args?.to ?? Date.now();
  const _from = args?.from ?? _to - weekTimestamp;

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

  try {
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
    results = {
      visitors: 0,
      country: null,
      browser: null,
      os: null
    };
  }

  return results;
}