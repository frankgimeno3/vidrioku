import { User } from '@/app/components/interfaces/interfaces';
import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'

type DetallesPerfilProps = {
    usuario: any;
 };


 const DetallesPerfil: FC< DetallesPerfilProps> = ({ usuario }) => {
    const [loading, setLoading] = useState(true);
    const [ usuarioSelected, setUsuarioSelected] = useState< User>();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const  usuariosCollection = collection(db, 'users');
          const q = query( usuariosCollection, where('email', '==',  usuario));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach((doc) => {
            setUsuarioSelected(doc.data() as  User);
          });
    
          setLoading(false);
 
        };
    
        fetchData();
      }, [ ]);
    

   return (
    <div className='bg-white py-5 text-gray-500'>
      <p><span className='font-bold'>Ubicación: </span>{usuarioSelected?.ubi}</p>
      <p><span className='font-bold'>Edad: </span>{usuarioSelected?.edad}</p>
      <p><span className='font-bold'>Género: </span>{usuarioSelected?.genero}</p>
     </div>
  )
}

export default DetallesPerfil