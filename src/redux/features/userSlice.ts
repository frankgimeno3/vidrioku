import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';  
import { User } from '@/app/components/interfaces/interfaces';

interface UserState {
  user: User | null; 
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload; 
    },
    updateSeguidos(state, action: PayloadAction<string[]>) {
      if (state.user) {
        state.user.seguidos = action.payload;
      }
    },
  },
});

export const { updateUser, updateSeguidos } = userSlice.actions;  
export default userSlice.reducer;  

export const selectUser = (state: RootState) => state.user.user;
