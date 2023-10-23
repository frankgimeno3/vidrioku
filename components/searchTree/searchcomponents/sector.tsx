
import { FC } from 'react';
import Image from 'next/image';
 
interface SectorProps {
    setSectorSeleccionado:any
     sectorSeleccionado:any
}

const Sector: FC<SectorProps> = ({setSectorSeleccionado,  sectorSeleccionado }) => {

 

   const seArquitectos = () => {
    setSectorSeleccionado('Arquitectos');
   };

  const setIngenieros = () => {
    setSectorSeleccionado('Ingenieros');
   };
  return (
    <div  >
      <h2 className='mt-3'>Para qué perfil?</h2>
      <div className='flex flex-row   pt-1   text-xs'>
      <button
              className={`${
                sectorSeleccionado == 'Arquitectos' ? 'bg-zinc-500 text-zinc-100' : 'bg-zinc-100 text-zinc-700'
              } p-2 w-full mr-1 rounded-xs`}        onClick={seArquitectos}>Arquitectos</button>
<button
              className={`${
                sectorSeleccionado == 'Ingenieros' ? 'bg-zinc-500 text-zinc-100' : 'bg-zinc-100 text-zinc-700'
              } p-2 w-full mr-1 rounded-xs`}        onClick={setIngenieros}>Ingenieros</button>
      </div>
    </div>
  );
};

export default Sector;  