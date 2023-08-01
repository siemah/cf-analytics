export type Env = {
	database: D1Database;
	NODE_ENV: string;
	turso_database_url: string;
	turso_database_token: string;
}

export type HonoEnv = {
	Bindings: Env;
};