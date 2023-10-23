import { FC } from "react";

 
interface TipoOfertaProps {
  setIsOfertasSelected:any
}

const TipoOferta: FC <TipoOfertaProps> = (setIsOfertasSelected) => {
 

  return (
    <h1>Aquí se renderizará un componente que inicie el algoritmo para seleccionar ofertas</h1>

  );
};

export default TipoOferta;