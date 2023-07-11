export interface GraphQlBody {
  query: string;
  variables?: Record<string, string | number>;
}

export interface GraphQlPaginationVariables {
  from?: number;
  to?: number;
  page?: number;
};