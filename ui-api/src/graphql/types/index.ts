import { RequestTracer } from "@cloudflare/workers-honeycomb-logger";
import { LibSQLDatabase } from "drizzle-orm/libsql";

export type ResolverSharedArgs = {
  from?: number;
  to?: number;
  page?: number;
}

export type ResolverSharedContext = {
  dbOrm: LibSQLDatabase<Record<string, never>>;
  request: {
    raw: {
      tracer: RequestTracer
    }
  }
}