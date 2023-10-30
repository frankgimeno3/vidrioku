import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchOfertas from './searchOfertas'
import FiltroOfertas from './filtroOfertas'
import PageListButtons from './compListados/PageListButtons';
import Anuncio from './compListados/Anuncio';
import Pasarela from './compListados/Pasarela';
import Oferta from './compListados/Oferta';
import Rendercomponent from './compListados/rendercomponent/Rendercomponent';

interface OfertasListProps {
  userData: any
}


const OfertasList: FC<OfertasListProps> = ({ userData }) => {
  const router = useRouter();


  return (
    <div className="flex flex-col  min-h-screen bg-zinc-800 ">

      <nav className="bg-gray-200 py-2 px-1 text-center">
        <SearchOfertas />
        <FiltroOfertas />
      </nav>
      <div className='flex flex-col   mx-12 bg-white '>
        <div className='bg-white flex flex-row w-full h-screen'>
          <div className='flex flex-col flex-1 justify-between h-full'>
            <div className='max-h-full overflow-scroll'>
              <Oferta />
              <Oferta />
              <Anuncio />
              <Oferta />
              <Oferta />

              <Pasarela />
              <Oferta />
              <Oferta />
              
            </div>
            <nav className="bg-gray-200 py-2 px-1 text-center ">
              <PageListButtons />
            </nav>
          </div>
          <div className='flex-1 h-full bg-gray-100 p-5'>
            <Rendercomponent/>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OfertasList;