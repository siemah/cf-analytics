import statytics from "@/db/schema/statytics";
import { gte, sql, and, lte, desc, } from "drizzle-orm";
import { ResolverSharedArgs, ResolverSharedContext } from "@/graphql/types";
import { maxItemPerPage, oneWeekTimestamp } from "@/config/constants";

/**
 * Get number of visitors
 * 
 * @param _ 
 * @param args query argument which is optional
 * @param context resolver context
 * @returns number of visitors
 */
export default async function technologies(_: {}, args: ResolverSharedArgs, context: ResolverSharedContext) {
  let results = {};
  const _to = args?.to ?? Date.now();
  const _from = args?.from ?? _to - oneWeekTimestamp;
  const _page = args?.page ?? 1;

  try {
    const browsers = await context.dbOrm
      .select({
        name: sql<string>`json_extract(browser, '$.name') as name`,
        total: sql<number>`count(json_extract(browser, '$.name')) as total`
      })
      .from(statytics)
      .where(
        and(
          gte(statytics.createdAt, _from),
          lte(statytics.createdAt, _to)
        )
      )
      .groupBy(statytics.browser)
      .orderBy(desc(sql<number>`total`))
      .offset((_page - 1) * maxItemPerPage)
      .limit(maxItemPerPage)
      .all();
    const os = await context.dbOrm
      .select({
        name: sql<string>`json_extract(os, '$.name') as name`,
        total: sql<number>`count(json_extract(os, '$.name')) as total`
      })
      .from(statytics)
      .where(
        and(
          gte(statytics.createdAt, _from),
          lte(statytics.createdAt, _to)
        )
      )
      .groupBy(sql<string>`name`)
      .orderBy(desc(sql<number>`total`))
      .offset((_page - 1) * maxItemPerPage)
      .limit(maxItemPerPage)
      .all();
    const networks = await context.dbOrm
      .select({
        name: statytics.asOrganization,
        total: sql<number>`count(${statytics.asOrganization}) as total`
      })
      .from(statytics)
      .where(
        and(
          gte(statytics.createdAt, _from),
          lte(statytics.createdAt, _to)
        )
      )
      .groupBy(statytics.asOrganization)
      .orderBy(desc(sql<number>`total`))
      .offset((_page - 1) * maxItemPerPage)
      .limit(maxItemPerPage)
      .all();

    console.log(JSON.stringify(networks, null, 2));
    results = {
      browsers,
      os,
      networks,
    }
  } catch (error) {
    console.log(error)
    results = {
      browsers: [],
      os: [],
      networks: [],
    };
  }

  return results;
}