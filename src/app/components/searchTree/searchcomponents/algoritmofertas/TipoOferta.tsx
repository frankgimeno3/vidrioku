import { FC, useState } from "react";
import BusquedaPersonalizada from "./BusquedaPersonalizada";


interface TipoOfertaProps {
  setIsOfertasSelected: any
 }

const TipoOferta: FC<TipoOfertaProps> = (setIsOfertasSelected) => {
  const [offerSearch, setOfferSearch] = useState("")

  const setAdaptada = ()=>{
    setOfferSearch("adaptada")
  }
  const setPersonalizada = ()=>{
    setOfferSearch("personalizada")
  }

  return (
    <>
            <h2 className="text-center pt-5">Cómo desea filtrar las ofertas?</h2>
            <div className="px-2 flex flex-row w-full text-xs">
                     <button className={`${offerSearch == 'adaptada' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setAdaptada}>Sugiere ofertas adaptadas a mi perfil</button>
                    <button className={`${offerSearch == 'personalizada' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setPersonalizada}>Realizar búsqueda personalizada</button>
 
                </div>
      {offerSearch === "personalizada" && <>
      <BusquedaPersonalizada setIsOfertasSelected={setIsOfertasSelected}  />
      </>}
      {offerSearch === "adaptada" && <>Adaptada</>}
    </>
  );
};

export default TipoOferta;