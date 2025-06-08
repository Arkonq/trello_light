import {
  type BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { BoardVM, StatusVM } from "../../entities/board/model.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
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
  endpoints: (builder) => ({
    getBoards: builder.query<BoardVM[], void>({
      query: () => ({
        url: `/boards`,
        method: "GET",
      }),
    }),
    createBoard: builder.mutation<void, BoardVM>({
      query: (body) => ({
        url: `/boards`,
        method: "POST",
        body,
      }),
    }),
    updateBoard: builder.mutation<void, Required<BoardVM>>({
      query: (body) => ({
        url: `/boards/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
    }),
    getStatuses: builder.query<StatusVM[], { boardId: string }>({
      query: ({ boardId }) => ({
        url: `/statuses`,
        method: "GET",
        params: { boardId, _embed: "tasks" },
      }),
    }),
  }),
});

export const { useGetBoardsQuery, useGetStatusesQuery } = mainApi;
