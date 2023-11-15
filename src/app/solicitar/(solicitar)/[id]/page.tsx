"use client"
import { FC, useEffect, useState } from 'react';
 import Navbar from '../../../components/Navbar'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface SolicitudProps   {
  params: {id: string}
}

type OfertaProps = {
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: string,
  adicional: string,
  empresa: string,
   estado: string,
  id: any
};

const Solicitud: FC <SolicitudProps>=  ({params}) => {
  const [loading, setLoading] = useState(true);
  const [oferta, setOferta] = useState<OfertaProps>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('id', '==', params.id));  
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setOferta(doc.data() as OfertaProps); // Asignar el documento obtenido como valor al estado oferta
      });

      setLoading(false);
    };

    fetchData();
  }, [params.id]);
    return (
<>
      <Navbar   />
      <div className="flex flex-col  max-h-screen bg-zinc-800 ">

<div className='flex flex-col   mx-12 bg-white '>
  <div className='bg-white flex flex-row w-full h-screen'>
    <h3 className='bg-red-200 text-black'>{oferta?.descripcion}</h3>
 
  </div>
  </div>
  </div>
</>
   )
   ;
}
export default Solicitud;    