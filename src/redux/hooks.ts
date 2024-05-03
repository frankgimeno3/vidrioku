import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { getUsuarioFromFirebase } from "./features/userSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useArrayFiltros = () => useAppSelector(state => state.arrayFiltros.filtros);

export const useCurrentUser = () => {
    const currentUser = useAppSelector(state => state.user.currentUser);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      // Cuando el componente se monta, iniciamos la obtención del usuario desde Firebase
      dispatch(getUsuarioFromFirebase());
    }, [dispatch]);
  
    return currentUser;
  };