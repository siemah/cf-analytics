export const apiGraphqlEndpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8787/graphql"
    : "http://localhost:8787/graphql";

export const graphqlDefaultVariables = {
  from: null,
  to: null,
  page: null
};