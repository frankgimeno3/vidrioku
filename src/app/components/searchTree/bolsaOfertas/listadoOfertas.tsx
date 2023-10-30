
import { FC } from 'react';
import Image from 'next/image';
import SearchOfertas from './searchOfertas'
import FiltroOfertas from './filtroOfertas'


const ListadoOfertas: FC = ({ }) => {

  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='flex flex-col p-2 bg-gray-50'>
        <SearchOfertas/>
        <FiltroOfertas/>
      </nav>
      <h2> Esto tendría que ser el listado de Ofertas</h2>
    </div>
  );
};

export default ListadoOfertas;