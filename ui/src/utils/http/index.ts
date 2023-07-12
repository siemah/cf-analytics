import { apiGraphqlEndpoint } from "@/config/constants";
import { GraphQlBody } from "@/graphql/types";

/**
 * Send a graphQL request
 * 
 * @param options graphQL query and its variables if there is any
 * @returns data received from api server
 */
export default async function graphqlFetch({ query, variables }: GraphQlBody) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    let queryBody: GraphQlBody = {
      query,
    };

    if (!!variables) {
      queryBody.variables = variables;
    }

    const response = await fetch(apiGraphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(queryBody),
    });
    const { data } = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}