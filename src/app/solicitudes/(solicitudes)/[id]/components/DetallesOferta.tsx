import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'

type ofertaProps = {
     oferta: any;
 };

 interface OfertaProps {
    id: any;
    titulo: string;
    cargo: string;
    jornada: string;
    tipoubi: string;
    ubicacion: string;
    descripcion: string;
    experiencia: string;
    adicional: string;
    empresa: string;
    estado: string;
}

const DetallesOferta: FC< ofertaProps> = ({ oferta }) => {
    const [loading, setLoading] = useState(true);
     const [ofertaSelected, setOfertaSelected] = useState<OfertaProps>();

     
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const ofertasCollection = collection(db, 'ofertas');
          const q = query(ofertasCollection, where('id', '==', oferta));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach((doc) => {
            setOfertaSelected(doc.data() as OfertaProps);
            console.log("ofertaSelected", ofertaSelected)

          });
    
          setLoading(false);
        };
    
        fetchData();
      }, [oferta]);
    
    
  

  return (
    <div className='bg-white py-5 text-gray-500'>
        <h1>{ofertaSelected?.id}</h1>
        <h1>{ofertaSelected?.titulo}</h1>
        <h1>{ofertaSelected?.cargo}</h1>
        <h1>{ofertaSelected?.id}</h1>
    </div>
  )
}

export default DetallesOferta