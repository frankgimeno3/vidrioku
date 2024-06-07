import { Solicitud } from '@/app/components/interfaces/interfaces';
import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'


type solicitudProps = {
    solicitudId: any;
 };
 

const DetallesSolicitud: FC<solicitudProps> = ({solicitudId}) => {
    const [loading, setLoading] = useState(true);
    const [ solicitudSelected, setSolicitudSelected] = useState< Solicitud>();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const  usuariosCollection = collection(db, 'solicitudes');
          const q = query( usuariosCollection, where('id', '==',  solicitudId));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach((doc) => {
            setSolicitudSelected(doc.data() as  Solicitud);
          });
    
          setLoading(false);
         };
    
        fetchData();
      }, [ solicitudId]);

  return (
    <div className='bg-white py-5 text-gray-500'>
      <p><span className='font-bold'>Presentación: </span>{solicitudSelected?.presentacion || "El usuario no ha incluido presentación"}</p>
    </div>
  )
}

export default DetallesSolicitud