"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Titulo from "../componentes/Titulo";
import Jornada from "../componentes/Jornada";
import Localizacion from "../componentes/Localizacion";
import Ubicacion from "../componentes/Ubicacion";
import Departamentos from "../componentes/Departamentos";



interface Fase2Props {
  setFaseActual: any;
  tipoJornada: any;
  setTipoJornada: any;
  tipoLocalizacion: any;
  setTipoLocalizacion: any;
  ubicacion: any;
  setUbicacion: any;
  pais:any;
  setPais:any;
  departamentos:any;
setDepartamentos:any;
posiciones:any;
setPosiciones:any;
otraPosicion:any;
setOtraPosicion:any;
}

const Fase2: FC<Fase2Props> = ({ setFaseActual, tipoJornada, setTipoJornada, tipoLocalizacion, setTipoLocalizacion, ubicacion, setUbicacion, pais, setPais, 
  departamentos, setDepartamentos, posiciones, setPosiciones, otraPosicion, setOtraPosicion}) => {

  const handleNextFase = () => {
    setFaseActual(3)

  }

  return (
    <div className="flex flex-col w-full">
    <h1 className="text-lg mb-5">Detalles de la oferta</h1>

      <Jornada tipoJornada={tipoJornada} setTipoJornada={setTipoJornada} />
      <Localizacion tipoLocalizacion={tipoLocalizacion} setTipoLocalizacion={setTipoLocalizacion} />

      {tipoLocalizacion !== 'Trabajo Remoto' && (
        <Ubicacion ubicacion={ubicacion} setUbicacion={setUbicacion}  pais={pais} setPais={setPais}/>
      )}

      {/* la actividad no se añade, depende de la empresa */}

      {/* aquí hay que añadir departamentos,    posicion */}
        <Departamentos departamentos={departamentos} setDepartamentos={setDepartamentos} posiciones={posiciones} setPosiciones={setPosiciones} otraPosicion={otraPosicion}
setOtraPosicion={setOtraPosicion}/>
        
      <button onClick={() => { handleNextFase() }} className='bg-white px-3 py-1 rounded-lg w-36 mx-auto text-sm m-2 text-gray-500 text-sm mb-2'>
        Guardar y seguir
      </button>
    </div>
  );
};

export default Fase2;



