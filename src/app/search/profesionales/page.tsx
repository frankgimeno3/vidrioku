"use client"

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Searchnav from '../components/Searchnav';

import SearchProfesionales from "./profesionalescomponents/searchProfesionales"
import PageListButtons from './profesionalescomponents/compListados/PageListButtons';
import Profesional from './profesionalescomponents/compListados/Profesional';
import Rendercomponent from './profesionalescomponents/compListados/rendercomponent/Rendercomponent'
import Footer from '@/app/components/Footer';
import Banners from '@/app/components/Banners';
import ListadoBotones from './profesionalescomponents/ListadoBotones';
interface ProfesionalesProps {
}


interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  userType: any;
}


const Profesionales: FC<ProfesionalesProps> = ({ }) => {
  const router = useRouter();
  const [tipoConsulta, setTipoConsulta] = useState('Trabajadores');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>()

  const [renderProfesional, setRenderProfesional] = useState<any>()
  const [trabajadoresArray, setTrabajadoresArray] = useState<any>([]);
  const [trabajadoresArrayFiltrado, setTrabajadoresArrayFiltrado] = useState<any>([]);

  const [arrayDe7ElementosPorPagina, setArrayDe7ElementosPorPagina] = useState<any[]>([]);
  const [subArraySeleccionado, setSubArrayseleccionado] = useState<number>(0);
  const [arrayMostrado, setArrayMostrado] = useState<any>(0)
  const [renderprofesional, setrenderprofesional] = useState<any>()

  const [arrayFiltros, setArrayFiltros] = useState<string[]>([])

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

  const handleProfesionalClick = (trabajador: any) => {
    setrenderprofesional(trabajador);
  }

  const setOfertas = () => {
    setTipoConsulta('Ofertas');
  };

  const setTrabajadores = () => {
    setTipoConsulta('Trabajadores');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const usersCollection = collection(db, 'users');
      const q = query(usersCollection);
      const querySnapshot = await getDocs(q);
      const usersArray: User[] = [];
      querySnapshot.forEach((doc) => {
        usersArray.push(doc.data() as User);
      });

      setTrabajadoresArray(usersArray);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredArray = trabajadoresArray.filter((trabajador: any) => trabajador.userType === 'profesional');
    setTrabajadoresArrayFiltrado(filteredArray);
  }, [trabajadoresArray]);

  useEffect(() => {
    const chunkArray = (array: any, size: any) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };

    const groupedOffers = chunkArray(trabajadoresArrayFiltrado, 1);
    setArrayDe7ElementosPorPagina(groupedOffers);
  }, [trabajadoresArrayFiltrado]);

  useEffect(() => {
    setArrayMostrado(arrayDe7ElementosPorPagina[subArraySeleccionado])
    console.log(arrayMostrado)
  }, [subArraySeleccionado]);


  if (loading) {
    return <p>Cargando profesionales...</p>;
  }

  return (
    <div className='flex flex-col justify-between h-full'>
      <Navbar />
      <div className='flex flex-row w-full  justify-between bg-white bg-opacity-90 h-screen'>
        <div className="flex flex-col  w-full  bg-gradient-to-b from-zinc-900 to-zinc-600 ">
          <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
          <div className="bg-white bg-opacity-5  text-zinc-100 h-full ">

            <Searchnav setOfertas={setOfertas} setTrabajadores={setTrabajadores} tipoConsulta={tipoConsulta} />
            <div className="flex flex-col  h-full bg-zinc-800 ">

              <nav className="bg-gray-200 py-2 px-1  mx-12">
                <SearchProfesionales arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
              </nav>
              <div className='flex flex-col   mx-12 bg-white h-full'>
                <div className='bg-white flex flex-row w-full h-full'>
                  <div className='flex flex-col flex-1 overflow-scroll h-full'>
                    <ul className='flex flex-col h-full '>
                      {trabajadoresArrayFiltrado.map((trabajador: any, index: any) => (
                        <div key={index} onClick={() => handleProfesionalClick(trabajador)}>
                        <Profesional trabajador={trabajador} setRenderProfesional={setRenderProfesional} />
                        </div>
                      ))}
                      <nav className="bg-gray-200 py-2 px-1 text-center  ">
                        <ListadoBotones arrayDe7ElementosPorPagina={arrayDe7ElementosPorPagina} subArraySeleccionado={subArraySeleccionado} setSubArrayseleccionado={setSubArrayseleccionado} />
                      </nav>
                    </ul>
                  </div>
                  <div className='flex-1 h-full bg-gray-100 p-5'>
                    <Rendercomponent renderProfesional={renderProfesional} />
                  </div>
                </div>

              </div>
            </div>

          </div>


        </div>
        <div className='h-full bg-white bg-opacity-5'>
          <Banners widthProp={250} />
        </div>

      </div>
      <Footer />

    </div>
  );
};

export default Profesionales