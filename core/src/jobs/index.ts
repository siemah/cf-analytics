import { ANALYTICS_NAME_PREFIX } from "../config/constants";
import { Env } from "../types/global";

/**
 * Construct SQL query to 
 * @param viewsList list of the views(website analytics)
 * @returns an object contains a perpared sql query for insertion and its prepared values
 */
function constructSQLQuery(viewsList: { [key: string]: any[]; }) {
  let sqlQuery = "INSERT INTO statytics (uuid, url, referrer, language, ip, longitude, latitude, country, city, region, regionCode, asOrganization, postalCode, dataCenterCode, browser, os, clientAcceptEncoding, tlsVersion, timezone, httpProtocol, createdAt) VALUES ";
  const bind: (number | string)[] = [];

  Object
    .keys(viewsList)
    .forEach(key => {
      const viewsByDay = viewsList[key];
      viewsByDay.forEach((item, index) => {
        sqlQuery += ` (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        sqlQuery += index < viewsByDay.length - 1 ? "," : "";
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
      });
    });

  return { sqlQuery, bind };
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

    // save a new stats to the DB
    const results = await db
      .prepare(sqlQuery)
      .bind(...bind)
      .run();

    if (results.success) {
      await kv.delete(ANALYTICS_NAME_PREFIX);
    }

    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}
