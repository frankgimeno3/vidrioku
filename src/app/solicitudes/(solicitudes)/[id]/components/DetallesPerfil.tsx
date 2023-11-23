import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect } from 'react'

type perfilProps = {
    usuario: any;
 };
 

 const DetallesPerfil: FC< perfilProps> = ({ usuario }) => {

    useEffect(() => {
        const fetchDoc = async () => {
          if (userData) {
            const docRef = doc(db, "users", userData);
            const response = await getDoc(docRef);
            if (response.exists()) {
              const myUserData = response.data() as User;
              setUser(myUserData);
              console.log(myUserData)
            }
          }
        };
    
        fetchDoc();
      }, [usuario]);

   return (
    <div className='bg-white py-5 text-gray-500'>DetallesPerfil</div>
  )
}

export default DetallesPerfil