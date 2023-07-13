import statytics from "@/db/schema/statytics";
import { gte, sql, and, lte, desc, } from "drizzle-orm";
import { ResolverSharedArgs, ResolverSharedContext } from "@/graphql/types";
import { maxItemPerPage, oneWeekTimestamp } from "@/config/constants";
import logToAPM from "@/libs/apm-logs";

interface GeolocationByCountryArgs extends ResolverSharedArgs {
  country: string;
}
/**
 * Get visitors location of a given country
 * 
 * @param _ 
 * @param args query argument which is optional
 * @param context resolver context
 * @returns number of visit on each region within a country with the region name
 */
export default async function geolocationByCountry(_: {}, args: GeolocationByCountryArgs, context: ResolverSharedContext) {
  let results: { name: string | null; total: number }[];
  const _to = args?.to ?? Date.now();
  const _from = args?.from ?? _to - oneWeekTimestamp;
  const _page = args?.page ?? 1;

  try {
    results = await context.dbOrm
      .select({
        total: sql<number>`COUNT(region) as total`,
        name: statytics.region
      })
      .from(statytics)
      .where(
        and(
          gte(statytics.createdAt, _from),
          lte(statytics.createdAt, _to),
          sql`LOWER(country)=${args.country.toLowerCase()}`,
        )
      )
      .groupBy(statytics.region)
      .orderBy(desc(sql<number>`total`))
      .limit(maxItemPerPage)
      .offset((_page - 1) * maxItemPerPage)
      .all();
  } catch (error) {
    logToAPM(
      context.request.raw.tracer,
      JSON.stringify(error)
    );
    results = [];
  }

  return results;
}