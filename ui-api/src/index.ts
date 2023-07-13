import { Hono } from "hono";
import { Env, HonoEnv } from "./types";
import initYogaServer from "./graphql/server";
import { Config, wrapModule } from '@cloudflare/workers-honeycomb-logger';

const router = new Hono<HonoEnv>();
router.use("*", initYogaServer);

const honeycombConfig: Config = {
	apiKey: "UpM8vG6yYfbXg4kt4qEh9F", // can also be provided by setting env var HONEYCOMB_API_KEY
	dataset: "dayen-analytics-ui-api", // can also be provided by setting env var HONEYCOMB_DATASET
	acceptTraceContext: true,
	data: {
		service: "graphql-cf-workers",
		version: "0.1.0",
	},
	redactRequestHeaders: ["authorization"],
	redactResponseHeaders: [],
	sendTraceContext: true,
	debugLog: true,
};

export default wrapModule(
	honeycombConfig,
	{
		async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
			return router.fetch(request, env, ctx);
		},
	}
);
