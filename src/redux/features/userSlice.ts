import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  // Otras propiedades del usuario según tu aplicación
}

interface UserState {
  currentUser: User | null;
  redirectSignin: boolean;
}

const initialState: UserState = {
  currentUser: null,
  redirectSignin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    comprobarUsuario: (state) => {
      state.redirectSignin = !state.currentUser;
    },
    redirigirSignin: (state) => {
      state.redirectSignin = true;
    },
    guardarUsuario: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    getUsuarioFromFirebase: () => {
      // Podrías realizar una llamada a Firebase aquí para obtener el usuario
      // y luego despachar la acción guardarUsuario para almacenar el usuario en el estado
    },
  },
});

export const { comprobarUsuario, redirigirSignin, guardarUsuario, getUsuarioFromFirebase } = userSlice.actions;

export default userSlice.reducer;