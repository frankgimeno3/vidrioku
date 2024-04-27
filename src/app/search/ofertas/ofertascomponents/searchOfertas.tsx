
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import FiltrosComponent from './filtros/FiltrosComponent';



interface SearchOfertasProps {
  setArrayFiltros: any;
  arrayFiltros: any;
  setRenderOferta: any
}


const SearchOfertas: FC<SearchOfertasProps> = ({ setArrayFiltros, arrayFiltros, setRenderOferta }) => {
  const [isFiltroOpen, setIsFiltroOpen] = useState(false)
  const [filtrosRecibidos, setFiltrosRecibidos] = useState([])


  useEffect(() => {
    setFiltrosRecibidos(arrayFiltros)
  }, [arrayFiltros])


  const toggleFiltroOpen = () => {
    if (isFiltroOpen == false) { setIsFiltroOpen(true) }
    if (isFiltroOpen == true) { setIsFiltroOpen(false) }
  }

  return (
    <div className="flex flex-col py-2 px-2 text-gray-500 ">
      {isFiltroOpen == false &&
        <div className='flex flex-row justify-end mr-7 ' >
          <button className='flex flex-row bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs items-center ' onClick={() => toggleFiltroOpen()}>
            <svg className='w-5 h-5  mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
            </svg>
            Filtrar ofertas por criterios de búsqueda
          </button >
        </div>
      }
      {isFiltroOpen == true &&

        <div className='flex flex-row justify-end mr-7 ' >
          <button className='flex flex-row bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs items-center ' onClick={() => toggleFiltroOpen()}>          
          <svg className='w-5 h-5   mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' >
            <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
          </svg>
          Filtrar ofertas por criterios de búsqueda
          </button >
        </div>
      }
      {isFiltroOpen == true &&
        <FiltrosComponent arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros} setRenderOferta={setRenderOferta}/>
      }
    </div>
  );
};

export default SearchOfertas;