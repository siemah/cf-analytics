import { createYoga, createSchema } from "graphql-yoga";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { Context } from "hono";
import yogaCache from "@/graphql/cache";
import { UseResponseCacheParameter } from "@graphql-yoga/plugin-response-cache/typings/";
import globalStats from '@/graphql/resolvers/global-stats';
import geolocation from '@/graphql/resolvers/geolocation';
import geolocationByCountry from '@/graphql/resolvers/geolocation/by-country';
import popularPaths from '@/graphql/resolvers/popular-paths';
import popularReferrers from '@/graphql/resolvers/popular-referrer';
import technologies from '@/graphql/resolvers/technologies';
import { HonoEnv } from "@/types";
import getDatabase from "@/db";

export default function initYogaServer(ctx: Context<HonoEnv, "*", {}>) {
  const { req, env } = ctx;
  const dbOrm = getDatabase(ctx.env.turso_database_url, ctx.env.turso_database_token) 
  const yoga = createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type GlobalStats {
          visitors: Int!
          browser: String!
          os: String!
          country: String!
        }
        type Geo {
          name: String
          total: Int!
        }
        type Technologies {
          browsers: [Geo!]
          os:  [Geo!]
          networks: [Geo!]
        }
        type Query {
          globalStats (from: Int, to: Int): GlobalStats!
          geolocation(from: Int, to: Int, page: Int): [Geo!]
          geolocationByCountry(country: String!, from: Int, to: Int, page: Int): [Geo!]
          technologies(from: Int, to: Int, page: Int): Technologies!
          popularPaths(from: Int, to: Int, page: Int): [Geo!]!
          popularReferrers(from: Int, to: Int, page: Int): [Geo!]!
        }
      `,
      resolvers: {
        Query: {
          globalStats,
          geolocation,
          geolocationByCountry,
          technologies,
          popularPaths,
          popularReferrers
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