import {
  type BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    console.error("Error occurred during API call:", error);
    throw error;
  }
};

export const mainApi = createApi({
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
