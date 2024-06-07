import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import CambiarAnuncio from './CambiarAnuncio';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import CambiarNombre from './CambiarNombre';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface AdvertComponentProps {
    bannerName: any;
     bannerUrl: any;
     activo: any;
     id:any
}

const  AdvertComponent : FC<AdvertComponentProps> = ({ bannerName, activo,  bannerUrl, id}) => {

  const [isCambiarAnuncioOpen, setIsCambiarAnuncioOpen] = useState(false)
  const [isCambiarActivoOpen, setIsCambiarActivoOpen] = useState(false)
  const [isCambiarNombreOpen, setIsCambiarNombreOpen] = useState(false)
  const [userData, setUserData] = useState("");
  const [estado, setEstado] = useState<any>()
  const [isActivo, setIsActivo] = useState<any>()

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {
      setUserData("Usuario");
    }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    setIsActivo(activo)
  }, [activo]);

  useEffect(() => {
    if(`${activo}` == `true`) {    setEstado("Activo")
    }
    if(`${activo}` == `false`) {    setEstado("Inactivo")
  }
  }, [activo]);

  const handlemodificaranuncio = (event: any) => {
    event.preventDefault();
    setIsCambiarAnuncioOpen(true);
    window.scrollTo(0, 0);  
  };
 
  const handlemodificarnombre = (event: any) => {
    event.preventDefault();
    setIsCambiarNombreOpen(true);
    window.scrollTo(0, 0);  
  };

  const checkisactivo = (isActivo: any)=>{
    if(`${isActivo}` == `true`) {return false}
    if(`${isActivo}` == `false`) {return true}
  }

  const handleCambioEstado = async () => {
  
    try {
      const docRef = doc(db, "anuncios", id);
      const anuncioDoc = await getDoc(docRef);

      if (anuncioDoc.exists()) {
        await setDoc(docRef, { activo: checkisactivo(isActivo) }, { merge: true });
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 500)
  }

  return (
    <>
        <div className='flex flex-row mx-auto px-36 py-12 bg-gray-300 my-2 rounded-lg shadow-lg'>
          <div className='flex flex-col'>
            <Image src={bannerUrl} alt={''} height={250} width={100} />
          <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
              onClick={handlemodificaranuncio}
            > Cambiar banner</button>
          </div>
          <div className='flex flex-col px-12'>
            <p><span className='font-medium mr-1'>Nombre: </span> {bannerName}</p> 
            <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
              onClick={handlemodificarnombre}
            > Cambiar nombre</button>
            <p><span className='font-medium mr-1 mt-12'>Estado: </span> {estado} </p>
            <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
              onClick={handleCambioEstado}
            > Cambiar estado</button>
          </div>
        </div>
        {isCambiarAnuncioOpen && <CambiarAnuncio setIsCambiarAnuncioOpen={setIsCambiarAnuncioOpen} nombre={bannerName}/>}
        {isCambiarNombreOpen && <CambiarNombre setIsCambiarNombreOpen={setIsCambiarNombreOpen} id={id}/>}
    </>
  )
}

export default AdvertComponent