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
      <div className="flex flex-row   bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <div className='flex flex-col flex-1 mb-10' style={{ height: '750px' }}           >
          <div className=" w-full flex bg-gradient-to-b from-zinc-100 to-zinc-700 h-full ml-12">
            <div className="flex flex-col p-12  flex  text-center justify-center mr-6 ml-6 my-36  bg-white text-gray-500
            rounded-lg shadow-xl">
              <div className='flex flex-row'>
                <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5 rounded-lg shadow-xl" />
                <div className='flex flex-col my-auto mr-14 ml-5 justify-left text-left'>
                  <div className="flex flex-row font-medium text-lg ">
                    <span className="mr-1 ">{user?.nombre}</span>
                    <span className="capitalize">{user?.apellidos}</span>
                  </div>
                  <div className="flex flex-row">
                    <span className='mr-1'>{user?.edad} </span>
                    <span className="capitalize">({user?.genero})</span>
                  </div>
                  <span>{user?.ubi}</span>
                  <span>{userData}</span>
                </div>
              </div>
              <div >
                <button
                  className="bg-white hover:bg-gray-50 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
                  onClick={miPerfilHandler}
                >Perfil Completo</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 text-white mb-10' style={{ height: '750px' }}>
          <div className='flex flex-col  h-full'>
            <div className='h-full flex-1 text-center bg-gradient-to-b from-zinc-800 to-zinc-900'>
              <div className='fex flex-col bg-white rounded m-8 mx-48 p-2 py-8 text-gray-900'>
                <p className='font-medium '>Mensajes nuevos</p>
                <p>Tienes <span className='font-bold mx-1'>X</span> mensajes nuevos</p>
                <Link href={'/chat'}>
                  <button
                    className="bg-white hover:bg-gray-50 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-3 text-sm m-1"
                  >Mis chats</button>
                </Link>
              </div>
            </div>

            <div className='h-full flex-1 text-center bg-gradient-to-b from-zinc-800 to-zinc-900'>
              <div className='fex flex-col bg-white rounded m-8 mx-48 p-2 py-8 text-gray-900'>

                <p className='font-medium'>Solicitudes enviadas</p>
                <p><span className='font-bold mx-1'>X</span> solicitudes enviadas</p>
                <button
                  className="bg-white hover:bg-gray-50 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-3 text-sm m-1"
                  onClick={handlemissolicitudes}
                >Mis solicitudes</button>
              </div>
            </div>
            <div className='h-full flex-1 text-center bg-gradient-to-b from-zinc-800 to-zinc-900'>
              <div className='fex flex-col bg-white rounded m-8 mx-48 p-2 py-8 text-gray-900'>

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
