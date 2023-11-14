import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchOfertas from './searchOfertas'
import FiltroOfertas from './filtroOfertas'
import PageListButtons from './compListados/PageListButtons';
import Anuncio from './compListados/Anuncio';
import Pasarela from './compListados/Pasarela';
import Oferta from './compListados/Oferta';
import Rendercomponent from './compListados/rendercomponent/Rendercomponent';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface OfertasListProps {
 }

 type Oferta = {
  titulo: string;
  cargo: string;
};

const OfertasList: FC<OfertasListProps> = ({   }) => {
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState("none")
  const [loading, setLoading] = useState(true);
  const [misOfertas, setMisOfertas] = useState<Oferta[]>([]);

  const componentselectorhandler = ()=>{
    setSelectedComponent("nombredelcomponent")
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Indicar que se está cargando

      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection);
      const querySnapshot = await getDocs(q);

      const offersData: Oferta[] = [];
      querySnapshot.forEach((doc) => {
        offersData.push(doc.data() as Oferta);
      });

      setMisOfertas(offersData);
      setLoading(false); // Indicar que la carga ha finalizado
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando ofertas...</p>;
  }
  
  return (
    
    <div className="flex flex-col  min-h-screen bg-zinc-800 ">

      <nav className="bg-gray-200 py-2 px-1 text-center">
        <SearchOfertas />
        <FiltroOfertas />
      </nav>
      <div className='flex flex-col   mx-12 bg-white '>
        <div className='bg-white flex flex-row w-full h-screen'>
          <div className='flex flex-col flex-1 justify-between h-full'>
                          {/* <Anuncio />
              <Pasarela /> */}
            <ul className='max-h-full overflow-scroll'>
              <Oferta />
              <Oferta />

              <Oferta />
              <Oferta />

              <Oferta />
              <Oferta />
              
            </ul>
            <nav className="bg-gray-200 py-2 px-1 text-center ">
              <PageListButtons />
            </nav>
          </div>
          <div className='flex-1 h-full bg-gray-100 p-5'>
            <Rendercomponent selectedComponent={selectedComponent}/>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OfertasList;