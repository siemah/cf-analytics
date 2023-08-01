import { LibSQLDatabase } from "drizzle-orm/libsql";
import { ANALYTICS_NAME_PREFIX } from "../config/constants";
import { Env } from "../types/global";
import statytics from "../db/schema/statytics";

/**
 * Construct SQL query to 
 * @param viewsList list of the views(website analytics)
 * @returns an object contains a perpared sql query for insertion and its prepared values
 */
function constructSQLQuery(viewsList: { [key: string]: any[]; }) {
  let sqlQuery = "INSERT INTO statytics (uuid, url, referrer, language, ip, longitude, latitude, country, city, region, regionCode, asOrganization, postalCode, dataCenterCode, browser, os, clientAcceptEncoding, tlsVersion, timezone, httpProtocol, createdAt) VALUES ";
  const bind: (number | string)[] = [];
  const raw: Record<string, string>[] = [];

  Object
    .keys(viewsList)
    .forEach(key => {
      const viewsByDay = viewsList[key];
      viewsByDay.forEach((item, index) => {
        sqlQuery += ` (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?),`;
        const {
          uuid, timestamp: createdAt, agent, location
        } = item;
        const {
          browser, os, clientAcceptEncoding, tlsVersion, timezone, httpProtocol, language, url = "/", referrer = null
        } = agent;
        const {
          ip = "", longitude, latitude, country, city, region, regionCode, asOrganization, postalCode, dataCenterCode
        } = location;
        bind.push(uuid, url, referrer, language, ip, longitude, latitude, country, city || null, region || null, regionCode || null, asOrganization, postalCode || null, dataCenterCode || null, JSON.stringify(browser), JSON.stringify(os), clientAcceptEncoding, tlsVersion, timezone, httpProtocol, createdAt);
        raw.push({
          uuid,
          url,
          referrer,
          language,
          ip,
          longitude,
          latitude,
          country,
          city: city || null,
          region: region || null,
          regionCode: regionCode || null,
          asOrganization,
          postalCode: postalCode || null,
          dataCenterCode: dataCenterCode || null,
          browser: JSON.stringify(browser),
          os: JSON.stringify(os),
          clientAcceptEncoding,
          tlsVersion,
          timezone,
          httpProtocol,
          createdAt
        });
      });
    });
  sqlQuery = sqlQuery.substring(0, sqlQuery.length - 1);

  return { sqlQuery, bind, raw };
}

type SaveStatsToDB = {
  db: Env["database"],
  kv: Env["kv"]
};
/**
 * Save analytics stats to the D1 database
 * 
 * @param object contains db instance and a kv instance as well
 * @returns results of the db insertion from D1
 */
export default async function saveStatsToDB({ db, kv }: SaveStatsToDB) {
  try {
    // fetch all view from kv
    const views = await kv.get(ANALYTICS_NAME_PREFIX);
    if (views === null) return;

    const viewsList: { [key: string]: any[] } = JSON.parse(views);
    var { sqlQuery, bind } = constructSQLQuery(viewsList);
    console.log("<<<<<<sqlQuery>>>>>>", sqlQuery)
    // save a new stats to the DB
    const results = await db
      .prepare(sqlQuery)
      .bind(...bind)
      .run();
    console.log(JSON.stringify(results))
    if (results.error === undefined) {
      await kv.delete(ANALYTICS_NAME_PREFIX);
    }

    return results;
  } catch (error) {
    console.log(error, JSON.stringify(error));
    return null;
  }
}

type SaveStatsItemToDBParams = {
  db: LibSQLDatabase<Record<string, never>>;
  data: {
    [key: string]: any[];
  };
};
/**
 * Save item to database
 * 
 * @param config contains database connection and data to insert
 * @returns 
 */
export async function saveStatsItemToDB({ db, data }: SaveStatsItemToDBParams) {
  try {
    // fetch all view from kv
    if (!data) return;

    var { raw } = constructSQLQuery(data);
    // save a new stats to the DB
    const results = await db
      .insert(statytics)
      .values(raw)
      .run();

    return results;
  } catch (error) {
    console.log(error, JSON.stringify(error));
    return null;
  }
}
