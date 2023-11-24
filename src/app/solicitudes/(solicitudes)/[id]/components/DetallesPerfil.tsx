import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'

type perfilProps = {
    usuario: any;
 };
 interface usuarioProps {
    
}

 const DetallesPerfil: FC< perfilProps> = ({ usuario }) => {
    const [loading, setLoading] = useState(true);
    const [ usuarioSelected, setUsuarioSelected] = useState< usuarioProps>();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const  usuariosCollection = collection(db, ' usuarios');
          const q = query( usuariosCollection, where('id', '==',  usuario));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach((doc) => {
            setUsuarioSelected(doc.data() as  usuarioProps);
          });
    
          setLoading(false);
        };
    
        fetchData();
      }, [ usuario]);
    

   return (
    <div className='bg-white py-5 text-gray-500'>DetallesPerfil</div>
  )
}

export default DetallesPerfil