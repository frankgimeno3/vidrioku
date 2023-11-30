import { FC } from 'react';
import Image from 'next/image';

interface OfertaProps {
  id:any,
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: string,
  adicional: string,
  empresa: string,
  // publicacion: Timestamp,

   estado: string,
}
const Oferta: FC <OfertaProps>= ({id, titulo, cargo, jornada, tipoubi, ubicacion, descripcion, experiencia, adicional, empresa, estado}) => {
 
  return (
    <div className="flex flex-row justify-left items-center p-5 bg-gray-50 hover:bg-gray-100 shadow-lg mb-1 text-gray-600">
      <Image src={"/inventedlogos/1.png"} alt="pepo" height={75} width={75} />
      <div className='justify-left pl-5 w-full'>
       <h2>{titulo}</h2>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col text-sm text-gray-500'>
            <p>{empresa}</p>
            <p>{ubicacion}</p>
          </div>
          <div className='flex flex-row'>
            <button> {cargo}</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Oferta;