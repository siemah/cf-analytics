import { apiGraphqlEndpoint } from "@/config/constants";
import { GraphQlBody, GraphQlPaginationVariables } from "@/graphql/types";
import graphqlFetch from "@/utils/http";

/**
 * Fetch technologies used by visitors such as browsers, os's and networks
 * 
 * @param variables filter data of the global stats
 * @returns technologies stats details
 */
export default async function getTechnologies(variables?: GraphQlPaginationVariables) {
  try {
    const query = `
      query {
        technologies {
          browsers {
            name
            total
          }
          os { 
            name
            total
          }
          networks {
            name
            total
          }
        }
      }
    `;
    let queryBody: GraphQlBody = {
      query
    };
    const data = await graphqlFetch(queryBody);
    
    return data;
  } catch (error) {
    return null;
  }
}