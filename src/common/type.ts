export type SortPaginate = {
  sortBy: number;
  orderBy: string;
  offset: number;
  limit: number;
};

export const schemaString = (defaultVal: any = null) => {
  return { type: String, default: defaultVal };
};
