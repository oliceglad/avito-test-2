import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/tasks",
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ``,
    }),

    getTaskById: builder.query({
      query: (id) => `/${id}`,
    }),

    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/create",
        method: "POST",
        body: newTask,
      }),
    }),

    updateTask: builder.mutation({
      query: ({ id, updatedTask }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: updatedTask,
      }),
    }),

    updateStatusTask: builder.mutation({
      query: ({ id, updatedStatusTask }) => ({
        url: `/updateStatus/${id}`,
        method: "PUT",
        body: updatedStatusTask,
      }),
    }),
  }),
});

export const { useAddTaskMutation, useGetAllTasksQuery, useGetTaskByIdQuery, useUpdateStatusTaskMutation, useUpdateTaskMutation } = tasksApi;