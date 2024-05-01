import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definición del tipo de datos para el usuario
interface User {
  id: string;
  email: string;
  // Agrega cualquier otra propiedad que necesites para el usuario
}

// Tipo de estado para el slice de usuario
interface UserState {
  currentUser: User | null;
  redirectSignin: boolean;
}

// Estado inicial para el slice de usuario
const initialState: UserState = {
  currentUser: null,
  redirectSignin: false,
};

// Creación del slice de usuario
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Acción para comprobar si hay un usuario actualmente logueado
    comprobarUsuario: (state) => {
      state.redirectSignin = !state.currentUser;
    },
    // Acción para redirigir a la página de inicio de sesión
    redirigirSignin: (state) => {
      state.redirectSignin = true;
    },
    // Acción para guardar los datos del usuario en el estado
    guardarUsuario: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    // Acción para obtener los datos del usuario
    getUsuario: (state) => {
      // Realiza cualquier operación necesaria para obtener los datos del usuario
      // Puedes implementar lógica de consulta aquí si es necesario
    },
  },
});

// Exportar acciones generadas automáticamente y el reducer del slice de usuario
export const { comprobarUsuario, redirigirSignin, guardarUsuario, getUsuario } = userSlice.actions;
export default userSlice.reducer;
