import { apiGraphqlEndpoint } from "@/config/constants";
import { GraphQlBody, GraphQlPaginationVariables } from "@/graphql/types";
import graphqlFetch from "@/utils/http";

/**
 * Fetch global stats details such as top country, number of visits..
 * 
 * @param variables filter data of the global stats
 * @returns global stats details
 */
export default async function getGlobalStats(variables?: GraphQlPaginationVariables) {
  try {
    const query = `
      query {
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

    const data = await graphqlFetch(queryBody);

    return data ?? {};
  } catch (error) {
    return null;
  }
}