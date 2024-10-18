import { get } from "./request";

type CatsResponseData = {
  page: number;
  size: number;
  total: number;
  records: {
    id: number;
    name: string;
  }[];
};
const prefix = "/cats";
export const catsApi = {
  query(params: { page?: number; size?: number }) {
    return get<CatsResponseData>(prefix, { params });
  },
};
