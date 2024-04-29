import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ArrayFiltrosState = {
  filtros: string[];
};

const initialState: ArrayFiltrosState = {
  filtros: [],
};

export const arrayFiltrosSlice = createSlice({
  name: "arrayFiltros",
  initialState,
  reducers: {
    addFiltro: (state, action: PayloadAction<string>) => {
      state.filtros.push(action.payload);
    },
    removeFiltro: (state, action: PayloadAction<string>) => {
      state.filtros = state.filtros.filter(filtro => filtro !== action.payload);
    },
    resetFiltros: (state) => {
      state.filtros = [];
    },
  },
});

export const { addFiltro, removeFiltro, resetFiltros } = arrayFiltrosSlice.actions;

export default arrayFiltrosSlice.reducer;
