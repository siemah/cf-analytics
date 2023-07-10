import { InferModel, sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const statytics = sqliteTable('statytics', {
  id: integer("id").primaryKey(),
  uuid: text("uuid"),
  url: text("url"),
  ip: text("ip"),
  longitude: text("uuid"),
  latitude: text("latitude"),
  country: text("country"),
  language: text("language"),
  city: text("city"),
  region: text("region"),
  regionCode: text("regionCode"),
  asOrganization: text("asOrganization"),
  postalCode: text("postalCode"),
  dataCenterCode: text("dataCenterCode"),
  browser: text("browser"),
  os: text("os"),
  clientAcceptEncoding: text("clientAcceptEncoding"),
  tlsVersion: text("tlsVersion"),
  timezone: text("timezone"),
  httpProtocol: text("httpProtocol"),
  createdAt: integer("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Statytics = InferModel<typeof statytics>; // return type when queried
// export type NewStatytics = InferModel<typeof statytics, 'insert'>; // insert type

export default statytics;