import { apiGraphqlEndpoint } from "@/config/constants";
import { GraphQlBody, GraphQlPaginationVariables } from "@/graphql/types";

/**
 * Fetch global stats details such as top country, number of visits..
 * 
 * @param variables filter data of the global stats
 * @returns global stats details
 */
export default async function getGlobalStats(variables?: GraphQlPaginationVariables) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const query = `
      {
        globalStats {
          visitors
          browser
          os
          country
        }
      }
    `;
    let queryBody: GraphQlBody = {
      query
    };

    if (variables !== undefined) {
      queryBody.variables = variables as GraphQlBody["variables"];
    }

    const response = await fetch(apiGraphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(queryBody),
    });;
    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}