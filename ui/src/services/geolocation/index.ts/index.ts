import { apiGraphqlEndpoint, graphqlDefaultVariables } from "@/config/constants";
import { GraphQlBody, GraphQlPaginationVariables } from "@/graphql/types";
import graphqlFetch from "@/utils/http";

/**
 * Fetch global stats details such as top country, number of visits..
 * 
 * @param variables filter data of the global stats
 * @returns global stats details
 */
export default async function getGeolocation(variables?: GraphQlPaginationVariables) {
  try {
    const query = `
      query ($from: Int, $to: Int, $page: Int) {
        geolocation(from: $from, to: $to, page: $page) {
          name
          total
        }
      }
    `;
    const data = await graphqlFetch({
      query,
      variables: (variables ?? graphqlDefaultVariables) as GraphQlBody["variables"]
    });
    return data;
  } catch (error) {
    return [];
  }
}