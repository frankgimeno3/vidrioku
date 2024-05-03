import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Asegúrate de ajustar la ruta según tu estructura de archivos

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
  user: User | null; // Define la forma del estado de usuario
  // Otros campos de estado si es necesario
}

const initialState: UserState = {
  user: null,
  // Otros campos de estado inicializados si es necesario
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload; // Actualiza el estado del usuario con la acción
    },
    // Otros reducers si es necesario
  },
});

export const { updateUser } = userSlice.actions; // Exporta la acción updateUser
export default userSlice.reducer; // Exporta el reducer de userSlice

// Selector para obtener el usuario del estado
export const selectUser = (state: RootState) => state.user.user;
