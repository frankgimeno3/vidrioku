"use client"

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
  
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Searchnav from '../components/Searchnav';

import FiltroProfesionales from "./profesionalescomponents/filtroProfesionales"
import SearchProfesionales from "./profesionalescomponents/searchProfesionales"
import PageListButtons from './profesionalescomponents/compListados/PageListButtons';
import Profesional from './profesionalescomponents/compListados/Profesional';
import Rendercomponent from './profesionalescomponents/compListados/rendercomponent/Rendercomponent'
interface ProfesionalesProps {
}


interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
}


const Profesionales: FC<ProfesionalesProps> = ({ }) => {
  const router = useRouter();
  const [tipoConsulta, setTipoConsulta] = useState('Trabajadores');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>()

  const [renderuser, setrenderuser] = useState()
  const [trabajadoresArray, setTrabajadoresArray] = useState<User[]>([]);


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




  const setOfertas = () => {
    setTipoConsulta('Ofertas');
  };

  const setTrabajadores = () => {
    setTipoConsulta('Trabajadores');
  };


  // const handleUserClick = (oferta: User) => {
  //   setrenderuser(trabajador);
  // }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  

      const usersCollection = collection(db, 'users');
      const q = query(usersCollection);
      const querySnapshot = await getDocs(q);
      const usersArray: User[] = [];
      querySnapshot.forEach((doc) => {
        usersArray.push(doc.data() as User );
      });

      setTrabajadoresArray(usersArray);
      setLoading(false);  
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando profesionales...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col    bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen ">

          <Searchnav setOfertas={setOfertas} setTrabajadores={setTrabajadores} tipoConsulta={tipoConsulta} />

          <div className="flex flex-col  min-h-screen bg-zinc-800 ">

            <nav className="bg-gray-200 py-2 px-1 text-center mx-12">
              <FiltroProfesionales />
              <SearchProfesionales />
            </nav>
            <div className='flex flex-col   mx-12 bg-white '>
              <div className='bg-white flex flex-row w-full h-screen'>
                <div className='flex flex-col flex-1 justify-between h-full'>
 
                <ul className='max-h-full overflow-scroll'>
                    {trabajadoresArray.map((trabajador, index) => (
                      <div key={index}>
                        <Profesional trabajador={trabajador} />
                      </div>
                    ))}
                  </ul>
                  <nav className="bg-gray-200 py-2 px-1 text-center ">
                    <PageListButtons />
                  </nav>
                </div>
                <div className='flex-1 h-full bg-gray-100 p-5'>
                  <Rendercomponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profesionales