import { FC } from 'react';
import Image from 'next/image';
import SearchTrabajadores from './searchTrabajadores'
import FiltroTrabajadores from './filtroTrabajadores'
import Anuncio from '../compListados/Anuncio'
import Oferta from '../compListados/Oferta'
import Pasarela from '../compListados/Pasarela'
import Trabajador from '../compListados/Trabajador'
import PageListButtons from '../compListados/PageListButtons'
import React, { useEffect } from 'react';

const ListadoTrabajadores: FC = ({ }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col  min-h-screen bg-zinc-800 ">

      <nav className="bg-gray-200 py-2 px-1 text-center">
        <SearchTrabajadores />
        <FiltroTrabajadores />
      </nav>
        <Trabajador />
        <Trabajador />

      <Pasarela />

        <Trabajador />
        <Trabajador />

      <Anuncio />
        <Trabajador />
        <Trabajador />
      <PageListButtons />
    </div >

  );
};

export default ListadoTrabajadores;