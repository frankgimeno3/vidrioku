"use client"
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import TipoOferta from '../components/searchTree/searchcomponents/algoritmofertas/TipoOferta'
import TipoTrabajador from '../components/searchTree/searchcomponents/algoritmotrabajadores/TipoTrabajador'
import ListadoTrabajadores from '../components/searchTree/bolsaTrabajadores/listadoTrabajadores';
import ListadoOfertas from '../components/searchTree/bolsaOfertas/listadoOfertas'
import Perfil from '../components/screens/Perfil2';
import Navbar from '../components/Navbar';
import Searchnav from './components/Searchnav';
import Profesionales from './profesionales/page';
import OfertasList from './ofertas/page';

const Search: FC = () => {
  const router = useRouter();
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

      <div className="flex flex-col    bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen ">

          <Searchnav setOfertas={setOfertas} setTrabajadores={setTrabajadores} tipoConsulta={tipoConsulta} />
          {tipoConsulta == 'Ofertas' &&
            <OfertasList />}
          {tipoConsulta == 'Trabajadores' &&
            <Profesionales />}
        </div>


      </div>

    </>

  );
};

export default Search;