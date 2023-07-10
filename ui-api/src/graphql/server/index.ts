import { createYoga, createSchema } from "graphql-yoga";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { Context } from "hono";
import yogaCache from "@/graphql/cache";
import { UseResponseCacheParameter } from "@graphql-yoga/plugin-response-cache/typings/";
import gobalStats from '@/graphql/resolvers/global-stats';
import geolocation from '@/graphql/resolvers/geolocation';
import geolocationByCountry from '@/graphql/resolvers/geolocation/by-country';
import technologies from '@/graphql/resolvers/technologies';
import { drizzle } from 'drizzle-orm/d1';
import { HonoEnv } from "@/types";

export default function initYogaServer(ctx: Context<HonoEnv, "*", {}>) {
  const { req, env } = ctx;
  const dbOrm = drizzle(env.database);
  const yoga = createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type GobalStats {
          visitors: Int!
          browser: String!
          os: String!
          country: String!
        }
        type Geo {
          name: String!
          total: Int!
        }
        type Technologies {
          browsers: [Geo!]
          os:  [Geo!]
          networks: [Geo!]
        }
        type Query {
          gobalStats (from: Int, to: Int): GobalStats!
          geolocation(from: Int, to: Int, page: Int): [Geo!]
          geolocationByCountry(country: String!, from: Int, to: Int, page: Int): [Geo!]
          technologies(from: Int, to: Int, page: Int): Technologies!
        }
      `,
      resolvers: {
        Query: {
          gobalStats,
          geolocation,
          geolocationByCountry,
          technologies
        }
      }
    }),
    landingPage: true,
    context: {
      dbOrm
    },
    plugins: [
      useResponseCache({
        session: () => null,
        invalidateViaMutation: true,
        cache: yogaCache as UseResponseCacheParameter["cache"],
        includeExtensionMetadata: true,
        // cached for 1 hour
        ttl: env.NODE_ENV === "development" ? 0 : 3600 * 1000
      }),
    ],
  });

  return yoga.fetch(req as any, ctx) as any;
}