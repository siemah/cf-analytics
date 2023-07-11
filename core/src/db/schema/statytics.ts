import { InferModel, sql } from "drizzle-orm";
import { text, integer, sqliteTable, index, } from "drizzle-orm/sqlite-core";

const statytics = sqliteTable(
  "statytics",
  {
    id: integer("id").primaryKey(),
    uuid: text("uuid").default(sql`NULL`),
    url: text("url").default(sql`NULL`),
    referrer: text("referrer").default(sql`NULL`),
    ip: text("ip").default(sql`NULL`),
    longitude: text("uuid").default(sql`NULL`),
    latitude: text("latitude").default(sql`NULL`),
    country: text("country").default(sql`NULL`),
    language: text("language").default(sql`NULL`),
    city: text("city").default(sql`NULL`),
    region: text("region").default(sql`NULL`),
    regionCode: text("regionCode").default(sql`NULL`),
    asOrganization: text("asOrganization").default(sql`NULL`),
    postalCode: text("postalCode").default(sql`NULL`),
    dataCenterCode: text("dataCenterCode").default(sql`NULL`),
    browser: text("browser").default(sql`NULL`),
    os: text("os").default(sql`NULL`),
    clientAcceptEncoding: text("clientAcceptEncoding").default(sql`NULL`),
    tlsVersion: text("tlsVersion").default(sql`NULL`),
    timezone: text("timezone").default(sql`NULL`),
    httpProtocol: text("httpProtocol").default(sql`NULL`),
    createdAt: integer("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  },
  table => ({
    idx_statytics_id: index("idx_statytics_id").on(table.id),
    idx_statytics_url: index("idx_statytics_url").on(table.url),
    idx_statytics_country: index("idx_statytics_country").on(table.country),
    idx_statytics_region: index("idx_statytics_region").on(table.region),
    idx_statytics_browser: index("idx_statytics_browser").on(table.id),
    idx_statytics_referrer: index("idx_statytics_referrer").on(table.referrer),
  })
);

export type Statytics = InferModel<typeof statytics>; // return type when queried
// export type NewStatytics = InferModel<typeof statytics, 'insert'>; // insert type

export default statytics;