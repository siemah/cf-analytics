import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { DrizzleD1Database } from "drizzle-orm/d1";

export type ResolverSharedArgs = {
  from?: number;
  to?: number;
  page?: number;
}

export type ResolverSharedContext = {
  dbOrm: DrizzleD1Database<Record<string, never>>;
  request: {
    raw: {
      tracer: RequestTracer
    }
  }
}