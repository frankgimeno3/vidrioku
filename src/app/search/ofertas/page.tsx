"use client"

import { FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import SearchOfertas from './ofertascomponents/searchOfertas'
 import PageListButtons from './ofertascomponents/compListados/PageListButtons';
// import Anuncio from './ofertascomponents/compListados/Anuncio';
// import Pasarela from './ofertascomponents/compListados/Pasarela';
import Oferta from './ofertascomponents/compListados/Oferta';
import Rendercomponent from './ofertascomponents/compListados/rendercomponent/Rendercomponent';
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/components/Navbar';
import Searchnav from '../components/Searchnav';
import Footer from '@/app/components/Footer';
import Banners from '@/app/components/Banners';

interface OfertasProps {
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

const Ofertas: FC<OfertasProps> = ({ }) => {
  const router = useRouter();
  const [renderoferta, setrenderoferta] = useState<Oferta | null>(null);
  const [loading, setLoading] = useState(true);
  const [misOfertas, setMisOfertas] = useState<Oferta[]>([]);
  const [misOfertasFiltered, setMisOfertasFiltered] = useState<any>([]);
  const [userData, setUserData] = useState("")
  const [tipoConsulta, setTipoConsulta] = useState('Ofertas');
  const [subArraySeleccionado, setSubArrayseleccionado] = useState(0)
  const [arrayMostrado, setArrayMostrado] = useState<any>(null);

  const [arrayFiltros, setArrayFiltros] = useState<[]>([])
  const [filtrosRecibidos, setFiltrosRecibidos] = useState([])


  useEffect(() => {
    setFiltrosRecibidos(arrayFiltros)
  }, [arrayFiltros])

  
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

  const handleOfertaClick = (oferta: Oferta) => {
    setrenderoferta(oferta);
  }

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

      setMisOfertas(offersData);
      setLoading(false);  
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chunkArray = (array: any, size: any) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };

    const groupedOffers = chunkArray(misOfertas, 1);
    setMisOfertasFiltered(groupedOffers);
   }, [misOfertas]); 
  
   useEffect(() => {
    setArrayMostrado(misOfertasFiltered[subArraySeleccionado]);
  }, [subArraySeleccionado]);

  useEffect(() => {
    if (misOfertasFiltered.length > 0) {
      setArrayMostrado(misOfertasFiltered[subArraySeleccionado]);
    }
  }, [misOfertasFiltered, subArraySeleccionado]);
   
  if (!arrayMostrado) {
    return <p className='m-8'>Cargando ofertas...</p>;
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
                <SearchOfertas arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros}/>
              </nav>
              <div className='flex flex-col   mx-12 bg-white h-full'>
                <div className='bg-white flex flex-row w-full h-full'>
                  <div className='flex flex-col flex-1 overflow-scroll h-full'>
                    <ul className='flex flex-col h-full '>
                      {arrayMostrado?.map((oferta:any, index:any) => (
                        <div key={index} onClick={() => handleOfertaClick(oferta)}>
                          <Oferta
                            id={oferta.id}
                            titulo={oferta.titulo}
                            cargo={oferta.cargo}
                            jornada={oferta.jornada}
                            tipoubi={oferta.tipoubi}
                            ubicacion={oferta.ubicacion}
                            descripcion={oferta.descripcion}
                            experiencia={oferta.experiencia}
                            adicional={oferta.adicional}
                            empresa={oferta.empresa}
                            estado={oferta.estado}
                          />
                        </div>
                      ))}
                      <nav className="bg-gray-200 py-2 px-1 text-center  ">
                        <PageListButtons arrayDe7ElementosPorPágina={misOfertasFiltered} subArraySeleccionado={subArraySeleccionado} setSubArrayseleccionado={setSubArrayseleccionado} />
                      </nav>
                    </ul>
                  </div>
                  <div className='flex-1  bg-gray-100 p-5'>
                    {renderoferta && (
                      <Rendercomponent
                        id={renderoferta.id}
                        titulo={renderoferta.titulo}
                        cargo={renderoferta.cargo}
                        jornada={renderoferta.jornada}
                        tipoubi={renderoferta.tipoubi}
                        ubicacion={renderoferta.ubicacion}
                        descripcion={renderoferta.descripcion}
                        experiencia={renderoferta.experiencia}
                        adicional={renderoferta.adicional}
                        empresa={renderoferta.empresa}
                        estado={renderoferta.estado}
                      />
                    )}
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

export default Ofertas;