"use client"

import { FC, SetStateAction, useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { collection, getDocs, query, } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Searchnav from '../components/Searchnav';
import SearchFiltrosProfesionales from "./profesionalescomponents/SearchFiltrosProfesionales"
import Rendercomponent from './profesionalescomponents/compListados/rendercomponent/Rendercomponent'
import Footer from '@/app/components/Footer';
import Banners from '@/app/components/Banners';
import ProfesionalesList from './profesionalescomponents/ProfesionalesList';

interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  userType: any;
}

const Profesionales: FC = ({ }) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  //handle del tipo de consunta para cambiar de página con el searchnav
  const [tipoConsulta, setTipoConsulta] = useState('Trabajadores');
  const setOfertas = () => { setTipoConsulta('Ofertas'); };
  const setTrabajadores = () => { setTipoConsulta('Trabajadores'); };

  //estado puente entre lo que se renderiza en el render, y el listado en el el que hay el setrender para seleccionar el profesional a renderizar 
  const [renderProfesional, setRenderProfesional] = useState<any>()

  //estado puente entre los filtros que se añaden 
  const [arrayFiltros, setArrayFiltros] = useState<[]>([])

  //creamos trab vacío, lo rellenamos con peticion a firebase, luego seleccionamos los trabajadores, y hacemos un loading para que cargue
  const searchParams = useSearchParams()
  const [receivedParams, setReceivedParams] = useState<any>()
  const [receivedParamsTratado, setReceivedParamsTratado] = useState<string[] | undefined>([])
  useEffect(() => {
    setReceivedParams(searchParams?.toString())
  }, [searchParams])

  useEffect(() => {
    if (receivedParams) {
      const decodedParams = decodeURIComponent(receivedParams);
      const paramsArray = decodedParams.split("&");
      setReceivedParamsTratado(paramsArray);
    }
  }, [receivedParams]);


  //creamos trab vacío, lo rellenamos con peticion a firebase, luego seleccionamos los trabajadores, y hacemos un loading para que cargue
  const [trabajadoresArray, setTrabajadoresArray] = useState<any>([]);
  const [trabajadoresProfesionales, setTrabajadoresProfesionales] = useState<any>([]);
  const [loading, setLoading] = useState(true);
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
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredArray = trabajadoresArray.filter((trabajador: any) => trabajador.userType === 'profesional');
    setTrabajadoresProfesionales(filteredArray);
  }, [trabajadoresArray]);

  if (loading) {
    return <p>Cargando profesionales...</p>;
  }

  return (
    <div className='flex flex-col justify-between '>
      <Navbar />
      <div className='flex flex-row w-full  justify-between bg-white bg-opacity-90 min-h-screen'>
        <div className="flex flex-col h-full w-full  bg-gradient-to-b from-zinc-900 to-zinc-600 ">
          <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
          <div className="bg-white bg-opacity-5  text-zinc-100 h-full ">
            <Searchnav setOfertas={setOfertas} setTrabajadores={setTrabajadores} tipoConsulta={tipoConsulta} />
            <div className="flex flex-col  h-full bg-zinc-800  mx-8  ">
              <nav className="bg-gray-200 py-2 px-1   ">
                <SearchFiltrosProfesionales arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros} />
              </nav>
              <div className='flex flex-row bg-white flex flex-row w-full h-full'>
                <div className='flex flex-col flex-1 overflow-scroll h-full'>
                  <ProfesionalesList receivedParamsTratado={receivedParamsTratado} trabajadoresProfesionales={trabajadoresProfesionales} setRenderProfesional={setRenderProfesional} />
                </div>
                <div className='flex-1 h-full bg-gray-100 p-5'>
                  <Rendercomponent renderProfesional={renderProfesional} />
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