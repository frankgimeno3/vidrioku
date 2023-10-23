
import { FC } from 'react';
import Image from 'next/image';
 
interface criteriosPerfilesProps {
  tipoConsulta: any
  regionSeleccionada: any
  sectorSeleccionado: any
}

const criteriosPerfiles: FC<criteriosPerfilesProps> = ({ tipoConsulta, regionSeleccionada, sectorSeleccionado }) => {

 


  return (
    <div className='shadow-lg p-5 mt-10'  >
      <h2 className='mt-3 text-sm'>Esto debería escupir todos los perfiles que cuenten con estas características</h2>
      <ul className='flex flex-col   pt-1   text-xs'>
        <li>{tipoConsulta}</li>
        <li>{regionSeleccionada}</li>
        <li>{sectorSeleccionado}</li>
      </ul>
    </div>
  );
};

export default criteriosPerfiles;  