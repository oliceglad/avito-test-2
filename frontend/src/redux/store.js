import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { boardsApi } from "../api/boardsApi";
import { tasksApi } from "../api/tasksApi";

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardsApi.middleware)
      .concat(tasksApi.middleware),
});

setupListeners(store.dispatch);
