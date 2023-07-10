import { DrizzleD1Database } from "drizzle-orm/d1";

export type ResolverSharedArgs = {
  from?: number;
  to?: number;
  page?: number;
}

export type ResolverSharedContext = {
  dbOrm: DrizzleD1Database<Record<string, never>>;
}