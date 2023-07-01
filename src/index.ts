import { parseUserAgent } from "./helpers/user-agent";
import { Hono } from "hono";

export type Env = {
	Bindings: {
		ZZ_STORES_ANALYTICS: KVNamespace;
	}
}

const ANALYTICS_NAME_PREFIX = "zz-store-<id>";
const corsHeaders = {
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
};
const app = new Hono<Env>();

app
	.get("/stats", async (ctx) => {
		let views = await ctx.env?.ZZ_STORES_ANALYTICS?.get(ANALYTICS_NAME_PREFIX);
		// console.log("first", views)
		return new Response(
			views, {
			headers: {
				...corsHeaders,
				"Content-Type": "application/json"
			}
		});
	})
	.options("/view", async () => {
		return new Response(null, {
			headers: corsHeaders,
			status: 200,
		});
	})
	.post("/view", async (ctx) => {
		const request = ctx.req.raw;
		const env = ctx.env;
		const ip = request.headers.get("cf-connecting-ip");
		const {
			longitude,
			latitude,
			clientAcceptEncoding,
			country,
			tlsVersion,
			timezone,
			city,
			httpProtocol,
			region,
			regionCode,
			asOrganization,
			postalCode,
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
		const { browser, os } = parseUserAgent(UA as string);
		// get user language(browser lang)
		const AL = request.headers.get("Accept-Language");
		const userAgent = {
			browser,
			os,
			clientAcceptEncoding,
			tlsVersion,
			timezone,
			httpProtocol,
			language: AL
		};
		const date = new Date();
		const dayDate = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		const dateItemKey = (new Date(`${year}/${month + 1}/${dayDate}`)).getTime();
		const uuid = crypto.randomUUID();
		let views = await env?.ZZ_STORES_ANALYTICS?.get(ANALYTICS_NAME_PREFIX);

		if (views === null) {
			await env.ZZ_STORES_ANALYTICS.put(ANALYTICS_NAME_PREFIX, JSON.stringify({}));
			views = "{}";
		}

		const viewsData = JSON.parse(views);
		const userViewDetails = {
			uuid,
			timestamp: date.getTime(),
			location: userLocation,
			agent: userAgent,
		}

		if (!!viewsData?.[dateItemKey]) {
			viewsData?.[dateItemKey].push(userViewDetails);
		} else {
			viewsData[dateItemKey] = [userViewDetails];
		}

		const newData = JSON.stringify(viewsData);
		await env.ZZ_STORES_ANALYTICS.put(ANALYTICS_NAME_PREFIX, newData);

		return new Response(newData, {
			headers: {
				...corsHeaders,
				"Content-Type": "application/json"
			}
		});
	});

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return app.fetch(request, env, ctx as any);
	},
};
