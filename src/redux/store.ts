import { configureStore } from "@reduxjs/toolkit";
import arrayFiltrosReducer from "./features/arrayFiltros";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    arrayFiltros: arrayFiltrosReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
