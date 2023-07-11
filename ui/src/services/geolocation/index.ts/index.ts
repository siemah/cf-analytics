import { apiGraphqlEndpoint, graphqlDefaultVariables } from "@/config/constants";
import { GraphQlBody, GraphQlPaginationVariables } from "@/graphql/types";

/**
 * Fetch global stats details such as top country, number of visits..
 * 
 * @param variables filter data of the global stats
 * @returns global stats details
 */
export default async function geolocation(variables?: GraphQlPaginationVariables) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const query = `
      query ($from: Int, $to: Int, $page: Int) {
        geolocation(from: $from, to: $to, page: $page) {
          name
          total
        }
      }
    `;
    let queryBody: GraphQlBody = {
      query,
      variables: (variables ?? graphqlDefaultVariables) as GraphQlBody["variables"]
    };

    const response = await fetch(apiGraphqlEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(queryBody),
    });;
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return null;
  }
}