"use client"

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';
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

  const handlemissolicitudes = () => {
    router.push("/missolicitudes")
  }
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

  return (
    <div className='flex flex-col'>
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
      <div className="flex flex-row   bg-gradient-to-b from-zinc-900 to-zinc-600 ml-6">
        <div className='flex flex-row h-full  ' style={{ height: '750px', width: '650px' }}           >
          <div className=" w-full flex  h-full ">
            <div className="flex flex-col   flex  text-center justify-center w-full  bg-white text-gray-500    shadow-xl">
              
              <div className='bg-gradient-to-b from-blue-500 to-zinc-600 h-full px-12 flex flex-col pt-24 pb-12 flex-1'>
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
              <div >
                <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={miPerfilHandler}
                >Perfil Completo</button>
              </div>
              </div>
              <div className='flex flex-col flex-1 pt-12 px-12'>
              <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={miPerfilHandler}
                >Configuración de la cuenta</button>
                 <button
                  className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={miPerfilHandler}
                >Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col text-white h-full w-full m-12 border border-red-300'  >
          <div className='flex flex-col w-full h-full  '>
            <div className='h-full flex-1 text-center w-full  flex-col bg-white  w-full  p-2   text-gray-900'>
              <p className='font-medium '>Mensajes nuevos</p>
              <p>Tienes <span className='font-bold mx-1'>X</span> mensajes nuevos</p>
              <Link href={'/chat'}>
                <button
                  className="bg-white hover:bg-gray-50 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-3 text-sm m-1"
                >Mis chats</button>
              </Link>
            </div>

            <div className='h-full flex-1 text-center flex-col bg-white   p-2   text-gray-900'>

              <p className='font-medium'>Solicitudes enviadas</p>
              <p><span className='font-bold mx-1'>X</span> solicitudes enviadas</p>
              <button
                className="bg-white hover:bg-gray-50 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-3 text-sm m-1"
                onClick={handlemissolicitudes}
              >Mis solicitudes</button>
            </div>
            <div className='h-full flex-1 text-center '>
              <div className='fex flex-col bg-white    p-2   text-gray-900'>

                <p className='font-medium'>Nuevos contactos</p>
                <p><span className='font-bold mx-1'>X</span> nuevas solicitudes aceptadas</p>
                <p> <span className='font-bold mx-1'>X</span> nuevos contactos de empresas</p>
              </div>
            </div>

          </div>
        </div>
        <div className='flex flex-col' style={{ width: '200px' }}>
          <Image src={'/inventedlogos/banner.jpg'} alt={''} width={250} height={100} />
          <Image src={'/inventedlogos/banner.jpg'} alt={''} width={250} height={100} />
        </div>
      </div>
    </div>

  );
};

export default HomeTrab;

function setUserData(email: string) {
  throw new Error('Function not implemented.');
}
