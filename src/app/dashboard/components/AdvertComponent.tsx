import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import CambiarAnuncio from './CambiarAnuncio';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface AdvertComponentProps {
    bannerName: any;
     bannerUrl: any;
     activo: any;
}




const  AdvertComponent : FC<AdvertComponentProps> = ({ bannerName, activo,  bannerUrl}) => {

  const [isCambiarAnuncioOpen, setIsCambiarAnuncioOpen] = useState(false)
  const [isCambiarActivoOpen, setIsCambiarActivoOpen] = useState(false)
  const [isCambiarNombreOpen, setIsCambiarNombreOpen] = useState(false)
  const [userData, setUserData] = useState("");

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

  const handlemodificaranuncio = (event:any) => {
    event.preventDefault();
    setIsCambiarAnuncioOpen(true);
  }

  const handlemodificaractivo = (event:any) => {
    event.preventDefault();
    setIsCambiarActivoOpen(true);
  }

  const handlemodificarnombre = (event:any) => {
    event.preventDefault();
    setIsCambiarNombreOpen(true);
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
            > Cambiar nombre</button>
            <p><span className='font-medium mr-1 mt-12'>Estado: </span> {activo} </p>
            <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
            > Cambiar estado</button>
          </div>
        </div>
        {isCambiarAnuncioOpen && <CambiarAnuncio setIsCambiarAnuncioOpen={setIsCambiarAnuncioOpen}  userData={userData}/>}
    </>
  )
}

export default AdvertComponent