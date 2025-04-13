import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { boardsApi } from "../api/boardsApi";
import { tasksApi } from "../api/tasksApi";
import { usersApi } from "../api/usersApi";

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardsApi.middleware)
      .concat(tasksApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);
