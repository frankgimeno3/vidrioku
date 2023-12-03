"use client"

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import SearchOfertas from './ofertas/ofertascomponents/searchOfertas'
import FiltroOfertas from './ofertas/ofertascomponents/filtroOfertas'
import PageListButtons from './ofertas/ofertascomponents/compListados/PageListButtons';
import Anuncio from './ofertas/ofertascomponents/compListados/Anuncio';
import Pasarela from './ofertas/ofertascomponents/compListados/Pasarela';
import Oferta from './ofertas/ofertascomponents/compListados/Oferta';
import Rendercomponent from './ofertas/ofertascomponents/compListados/rendercomponent/Rendercomponent';
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Searchnav from './components/Searchnav';

interface SearchProps {
}

type Oferta = {
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: string,
  adicional: string,
  empresa: string,
  publicacion: Timestamp,
  estado: string,
  id: any
};

const Search: FC<SearchProps> = ({ }) => {
  const router = useRouter();
  const [userData, setUserData] = useState("")
  const [tipoConsulta, setTipoConsulta] = useState('');


  const setOfertas = () => {
    setTipoConsulta('Ofertas');
  };

  const setTrabajadores = () => {
    setTipoConsulta('Trabajadores');
  };

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else { setUserData("Usuario") }
  }, [session?.data?.user?.email]);
 
  return (
    <>
      <Navbar />

      <div className="flex flex-col    bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen ">

          <Searchnav setOfertas={setOfertas} setTrabajadores={setTrabajadores} tipoConsulta={tipoConsulta} />
 
        </div>
      </div>

    </>

  );
};

export default Search;