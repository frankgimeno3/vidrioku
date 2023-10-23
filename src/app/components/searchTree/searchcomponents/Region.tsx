
import { FC } from 'react';
import Image from 'next/image';
 
interface criteriosOfertasProps {
    setRegionSeleccionada: any
     regionSeleccionada:any
}

const criteriosOfertas: FC<criteriosOfertasProps> = ({ setRegionSeleccionada, regionSeleccionada }) => {
 

     const setESP = () => {
        setRegionSeleccionada('ESP');
       };
    
      const setLATAM = () => {
        setRegionSeleccionada('LATAM');
       };

    return (
        <div  >
            <h2 className='mt-3'>En qué región?</h2>
            <div className='flex flex-row   pt-1   text-xs'>
            <button
              className={`${
                regionSeleccionada == 'ESP' ? 'bg-zinc-500 text-zinc-100' : 'bg-zinc-100 text-zinc-700'
              } p-2 w-full mr-1 rounded-xs`}                onClick={setESP}>España</button>
<button
              className={`${
                regionSeleccionada == 'LATAM' ? 'bg-zinc-500 text-zinc-100' : 'bg-zinc-100 text-zinc-700'
              } p-2 w-full mr-1 rounded-xs`}                onClick={setLATAM}>América Latina</button>
            </div>
        </div>
    );
};

export default criteriosOfertas;