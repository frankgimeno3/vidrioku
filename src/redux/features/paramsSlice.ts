import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ParamsState {
  id: string | null;
}

const initialState: ParamsState = {
  id: null,
};

const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setParamsId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setParamsId } = paramsSlice.actions;
export default paramsSlice.reducer;

export const selectParamsId = (state: RootState) => state.params.id;