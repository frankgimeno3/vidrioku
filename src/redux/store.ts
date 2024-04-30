import { configureStore } from "@reduxjs/toolkit";
import arrayFiltrosReducer from "./features/arrayFiltros";

export const store = configureStore({
  reducer: {
    arrayFiltros: arrayFiltrosReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
