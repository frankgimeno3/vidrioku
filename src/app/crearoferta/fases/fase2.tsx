"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Titulo from "../componentes/Titulo";
import Jornada from "../componentes/Jornada";
import Localizacion from "../componentes/Localizacion";
import Ubicacion from "../componentes/Ubicacion";

 

interface Fase2Props {
  setFaseActual:any;
  tipoJornada:any;
  setTipoJornada:any;
  tipoLocalizacion:any;
  setTipoLocalizacion:any;
  ubicacion:any;
  setUbicacion:any;
}

const Fase2: FC<Fase2Props> = ({setFaseActual, tipoJornada, setTipoJornada, tipoLocalizacion, setTipoLocalizacion, ubicacion, setUbicacion}) => {
 
  const handleNextFase = ()=>{
    setFaseActual(3)

  }
 
  return (
    <>
    <h1>Detalles de la oferta</h1>
         
              <Jornada tipoJornada={tipoJornada} setTipoJornada={setTipoJornada} />
              <Localizacion tipoLocalizacion={tipoLocalizacion} setTipoLocalizacion={setTipoLocalizacion} />

              {tipoLocalizacion !== 'Trabajo Remoto' && (
                <Ubicacion ubicacion={ubicacion} setUbicacion={setUbicacion} />
              )}

            {/* la actividad no se añade, depende de la empresa */}

             {/* aquí hay que añadir departamentos, pais,  posicion */}

              <button onClick={()=>{handleNextFase()}} className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
                Guardar y seguir
              </button>
    </>
  );
};

export default Fase2;



