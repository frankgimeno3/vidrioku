"use client"

import { FC, useEffect, useState } from 'react';
import SearchOfertas from './ofertascomponents/searchOfertas'
import OfertasList from './ofertascomponents/compListados/OfertasList';
import Rendercomponent from './ofertascomponents/compListados/rendercomponent/Rendercomponent';
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Searchnav from '../components/Searchnav';
import Footer from '@/app/components/Footer';
import Banners from '@/app/components/Banners';
import { redirect, useSearchParams } from 'next/navigation';


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

const Ofertas: FC = ({ }) => {
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

  const [renderOferta, setRenderOferta] = useState<any>();

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

  //creamos oferta vacío, lo rellenamos con peticion a firebase, luego seleccionamos los trabajadores, y hacemos un loading para que cargue
  const [ofertasArray, setOfertasArray] = useState<any>([]);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection);
      const querySnapshot = await getDocs(q);
      const offersData: Oferta[] = [];
      querySnapshot.forEach((doc) => {
        offersData.push(doc.data() as Oferta);
      });

      setOfertasArray(offersData);
      setLoading(false);
    };

    fetchData();
  }, []);


 

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
                <SearchOfertas arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros} />
              </nav>
              <div className='flex flex-row bg-white flex flex-row w-full h-full'>
                <div className='flex flex-col flex-1 overflow-scroll h-full'>
                  <OfertasList receivedParamsTratado={receivedParamsTratado} ofertasArray={ofertasArray} setRenderOferta={setRenderOferta} />
                </div>
                <div className='flex-1 h-full bg-gray-100 p-5'>
                  <Rendercomponent renderoferta={renderOferta} />
                </div>
              </div>
            </div>
          </div>
        </div >
        <div className='h-full bg-white bg-opacity-5'>
          <Banners widthProp={250} />
        </div>
      </div >
      <Footer />
    </div >
  );
};

export default Ofertas;