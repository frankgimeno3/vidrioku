"use client"

import { FC, useEffect, useState } from 'react';
 import Navbar from '@/app/components/Navbar';
import Searchnav from './components/Searchnav';
import Footer from '../components/Footer';
import Banners from '../components/Banners';
import useUserSession from '../components/hooks/userSession';


interface SearchProps {
}
 
const Search: FC<SearchProps> = ({ }) => {
   useUserSession();

   const [tipoConsulta, setTipoConsulta] = useState('');


  const setOfertas = () => {
    setTipoConsulta('Ofertas');
  };
  const setTrabajadores = () => {
    setTipoConsulta('Trabajadores');
  };

 

  return (
    <>
      <Navbar />
      <div className='flex flex-row w-full h-full justify-between bg-white bg-opacity-90'>

        <div className="flex flex-col  w-full  bg-gradient-to-b from-zinc-900 to-zinc-600 ">
          <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
          <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen ">
            <Searchnav setOfertas={setOfertas} setTrabajadores={setTrabajadores} tipoConsulta={tipoConsulta} />
          </div>
        </div>
        <div className='h-full bg-white bg-opacity-5'>
          <Banners widthProp={250} />
        </div>

      </div>
      <Footer />
    </>

  );
};

export default Search;


