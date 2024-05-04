import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';  

interface User {
  id: any;
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
}

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
  },
});

export const { updateUser } = userSlice.actions;  
export default userSlice.reducer;  

export const selectUser = (state: RootState) => state.user.user;
