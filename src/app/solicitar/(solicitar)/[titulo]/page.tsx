"use client"
import { FC } from 'react';
 import Navbar from '../../../components/Navbar'

interface SolicitudProps   {
  params: {id: any}
}

type Oferta = {
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: string,
  adicional: string,
  empresa: string,
   estado: string,
  id: any
};

const Solicitud: FC <SolicitudProps>=  ({params}) => {
  // console.log("esto tendría que ser id", id)
    return (
<>
      <Navbar   />
      <div className="flex flex-col  max-h-screen bg-zinc-800 ">

<div className='flex flex-col   mx-12 bg-white '>
  <div className='bg-white flex flex-row w-full h-screen'>
    <h3 className='bg-red-200 text-black'>no me está mostrando el {params.id}</h3>
 

  </div>
  </div>
  </div>
</>
   )
   ;
}
export default Solicitud;    