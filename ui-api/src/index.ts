import { Hono } from "hono";
import { Env, HonoEnv } from "./types";
import initYogaServer from "./graphql/server";

const router = new Hono<HonoEnv>();
router.use("*", initYogaServer);

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return router.fetch(request, env, ctx);
	},
};
