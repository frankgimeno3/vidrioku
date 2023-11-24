import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'


type solicitudProps = {
    solicitudId: any;
 };


const DetallesSolicitud: FC<solicitudProps> = ({solicitudId}) => {
    const [loading, setLoading] = useState(true);
    const [ usuarioSelected, setUsuarioSelected] = useState< solicitudProps>();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const  usuariosCollection = collection(db, ' solicitudes');
          const q = query( usuariosCollection, where('id', '==',  solicitudId));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach((doc) => {
            setUsuarioSelected(doc.data() as  solicitudProps);
          });
    
          setLoading(false);
        };
    
        fetchData();
      }, [ solicitudId]);

  return (
    <div className='bg-white py-5 text-gray-500'>DetallesSolicitud</div>
  )
}

export default DetallesSolicitud