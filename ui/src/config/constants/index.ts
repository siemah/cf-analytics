export const apiGraphqlEndpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8787/graphql"
    : "https://ui-api.zzenz.workers.dev";

export const graphqlDefaultVariables = {
  from: null,
  to: null,
  page: null
};