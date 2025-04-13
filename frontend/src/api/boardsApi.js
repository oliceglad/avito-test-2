import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardsApi = createApi({
  reducerPath: "boardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/boards",
  }),
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => ``,
    }),

    getBoardById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetAllBoardsQuery, useGetBoardByIdQuery } = boardsApi;
