import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect } from 'react'

type ofertaProps = {
     oferta: any;
 };
 

const DetallesOferta: FC< ofertaProps> = ({ oferta }) => {

     
 useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "ofertas", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
          console.log(myUserData)
        }
      }
    };

    fetchDoc();
  }, [oferta]);
  

  return (
    <div className='bg-white py-5 text-gray-500'>DetallesOferta</div>
  )
}

export default DetallesOferta