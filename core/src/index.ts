import { parseUserAgent } from "./helpers/user-agent";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./types/global";
import saveStatsToDB, { saveStatsItemToDB } from "./jobs";
import { Config, wrapModule } from '@cloudflare/workers-honeycomb-logger';

type HonoEnv = {
	Bindings: Env
}

const corsHeaders = {
	// 'Access-Control-Allow-Headers': '*',
	// 'Access-Control-Allow-Origin': '*',
	// 'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
};
const app = new Hono<HonoEnv>();

app
	// uncomment this code below to test cron trigger function
	// .get("/_scheduled", async ({ text, env: { database: db, kv } }) => {
	// 	await saveStatsToDB({
	// 		db,
	// 		kv
	// 	});
	// 	return text("√ done");
	// })
	.get("/stats", async (ctx) => {
		const sts = await ctx.env.database.prepare("select * from statytics").all();
		// let views = await ctx.env?.ZZ_STORES_ANALYTICS?.get(ANALYTICS_NAME_PREFIX);
		return ctx.json(
			sts,
			{
				status: 200,
				headers: corsHeaders
			}
		);
	})
	.use("/view", cors())
	.post("/view", async (ctx) => {
		const request = ctx.req.raw;
		const env = ctx.env;
		const extaData = await ctx.req.json();
		const ip = request.headers.get("cf-connecting-ip");
		const {
			longitude = null,
			latitude = null,
			clientAcceptEncoding = null,
			country = null,
			tlsVersion = null,
			timezone = null,
			city = null,
			httpProtocol = null,
			region = null,
			regionCode = null,
			asOrganization = null,
			postalCode = null,
			colo: dataCenterCode
		} = request.cf as any;
		const userLocation = {
			ip,
			longitude,
			latitude,
			country,
			city,
			region,
			regionCode,
			asOrganization,
			postalCode,
			dataCenterCode
		}
		// parse user agent
		const UA = request.headers.get("User-Agent");
		const { browser = null, os = null } = parseUserAgent(UA as string);
		// get user language(browser lang)
		const AL = request.headers.get("Accept-Language");
		const userAgent = {
			browser,
			os,
			clientAcceptEncoding,
			tlsVersion,
			timezone,
			httpProtocol,
			language: AL,
			url: extaData?.url || null,
			referrer: extaData?.referrer || null,
		};
		const date = new Date();
		const uuid = crypto.randomUUID();
		const timestamp = date.getTime();
		const userViewDetails = {
			uuid,
			timestamp,
			location: userLocation,
			agent: userAgent,
		};
		
		await saveStatsItemToDB({
			db: env.database,
			data: { [timestamp]: [userViewDetails] }
		});

		return new Response(JSON.stringify(userViewDetails), {
			headers: {
				...corsHeaders,
				"Content-Type": "application/json"
			}
		});
	});

const honeycombConfig: Config = {
	apiKey: "UpM8vG6yYfbXg4kt4qEh9F", // can also be provided by setting env var HONEYCOMB_API_KEY
	dataset: "dayen-analytics-core", // can also be provided by setting env var HONEYCOMB_DATASET
	acceptTraceContext: true,
	data: {
		service: "dayen-analytics-core",
		version: "0.1.0",
	},
	redactRequestHeaders: ["authorization"],
	redactResponseHeaders: [],
	sendTraceContext: true,
	debugLog: true,
};
const withTracerConfi = wrapModule<Env>(
	honeycombConfig,
	{
		async fetch(
			request: Request,
			env: Env,
			ctx: ExecutionContext
		): Promise<Response> {
			return app.fetch(request, env, ctx as any);
		},
	}
);

export default {
	...withTracerConfi,
	async scheduled(_: ScheduledEvent, env: Env, ctx: ExecutionContext) {
		console.log("<<<scheduled>>>");
		ctx.waitUntil(
			saveStatsToDB({
				db: env.database,
				kv: env.kv,
			})
		);
		console.log("<<</scheduled>>>");
	}
}
