"use client"

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';


interface HomeTrabProps {
  userData: any
}

interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  profilepicture: any;
}


const HomeTrab: FC<HomeTrabProps> = ({ userData }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
        }
      }
    };

    fetchDoc();
  }, [userData]);

  const miPerfilHandler = () => {
    router.push(`/perfil/${userData}`)
  }

  const handleCerrarSesion = async () => {
    router.push("/")
    setTimeout(() => {
      signOut()
    }, 1000);
  };
  
  return (
    <div className='flex flex-col'>
      <div className="flex flex-row w-full justify-between  bg-gradient-to-b from-zinc-900 to-zinc-600 " style={{ height: '800px' }} >
        <div className='flex flex-row h-full  ' style={{ height: '800px', width: '650px' }}           >
          <div className=" w-full flex  h-full ">
            <div className="flex flex-col   flex  text-center justify-center w-full  bg-white text-gray-500  ">

              <div className='bg-gradient-to-b from-cyan-600 to-zinc-700 h-full px-12 flex flex-col pt-24 pb-12 flex-1'>
                <div className='flex flex-col'>
                  <Image src={user?.profilepicture || "/icons/empty-user-profile.png"} alt="" width={200} height={200} className="rounded-full mx-auto my-5 shadow-xl" />
                  <div className='flex flex-col my-auto   justify-left text-center text-white'>
                    <p className="flex flex-row flex-wrap font-medium text-lg mx-auto">
                      <span className="mr-1">{user?.nombre}</span>
                      <span className="capitalize">{user?.apellidos}</span>
                    </p>
                    <span>{user?.ubi}</span>
                    <span className='italic'>{userData}</span>
                  </div>
                </div>
                <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={miPerfilHandler}
                >Perfil Completo</button>
              </div>
              <div className='flex flex-col flex-1 pt-12 px-12'>
                <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={()=>{'/configuracion'}}
                >Configuración de la cuenta</button>
                <button
                  className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={()=>{handleCerrarSesion()}}
                >Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col   text-white h-full w-full    text-white text-xl font-medium'  >
          <h2 className="bg-zinc-800 bg-gray-600 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
          <div className='flex flex-col mx-12 h-full pt-12'>
            <p className=''> Mensajes</p>
            <div className='bg-white rounded-lg shadow shadow-xl my-4 text-center '>
              <div className='shadow shadow-lg border border-gray-100 border-sm m-6  rounded-lg'>
                <p className='text-center font-light text-gray-500 text-lg px-12 pt-6'> Has recibido x mensajes nuevos</p>
                <button
                  className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-base font-light "
                  onClick={() => { router.push("/chat") }}
                >Mis mensajes</button>
              </div>
            </div>
            <p className='pt-8'> Solicitudes</p>
            <div className='bg-white rounded-lg shadow shadow-xl my-4 text-center '>
              <div className='shadow shadow-lg border border-gray-100 border-sm m-6  rounded-lg'>
                <p className='text-center font-light text-gray-500 text-lg px-12 pt-6'> Has enviado x solicitudes</p>
                <button
                  className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-base font-light "
                  onClick={() => { router.push("/missolicitudes") }}
                >Mis solicitudes</button>
              </div>
              <div className='shadow shadow-lg border border-gray-100 border-sm m-6  rounded-lg'>
                <p className='text-center font-light text-gray-500 text-lg px-12 pt-6'> X empresas han aceptado tus solicitudes</p>
                <button
                  className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-base font-light "
                  onClick={() => { router.push("/chat") }}
                >Ir al chat</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col border border-red-300 overflow-hidden bg-white h-[800px]'>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner.jpg'}
              alt={''}
              width={400} // Ajusta este valor según sea necesario
              height={400}
              objectFit="cover"
            />
          </div>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner.jpg'}
              alt={''}
              width={400} // Ajusta este valor según sea necesario
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomeTrab;
