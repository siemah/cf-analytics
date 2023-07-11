export interface GraphQlBody {
  query: string;
  variables?: Record<string, string | number>;
}

export interface GraphQlPaginationVariables {
  from?: number | null;
  to?: number | null;
  page?: number | null;
};