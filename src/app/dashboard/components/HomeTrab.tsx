"use client"

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';


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
    <div className='flex flex-col min-h-screen'>
      <div className="flex flex-row   bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <div className='flex flex-col flex-1 '>
          <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
          <div className=" w-full flex justify-between bg-gradient-to-b from-slate-900 to-slate-700 h-full ml-12">
            <div className="flex flex-col p-4 w-full flex justify-between text-center justify-center px-auto ">
              <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
              <div className="flex flex-row mx-auto">
                <span className="mr-1">{user?.nombre}</span>
                <span className="capitalize">{user?.apellidos}</span>
              </div>
              <div className="flex flex-row mx-auto">
                <span className='mr-1'>{user?.edad} </span>
                <span className="capitalize">({user?.genero})</span>
              </div>
              <span>{user?.ubi}</span>
              <span>{userData}</span>

              <div >
                <button
                  className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
                  onClick={miPerfilHandler}
                >Mi perfil</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Qué te has perdido?</h2>
          <div className='flex flex-col  h-full mr-12'>
            <div className='h-full flex-1 text-center bg-gradient-to-b from-gray-900 to-gray-800'>
              <p className='font-bold'>Mensajes nuevos</p>
            </div>
            <div className='h-full flex-1 text-center  bg-gradient-to-b from-gray-900 to-gray-800'>
              <p className='font-bold'>Publicaciones nuevas de las empresas que sigues</p>
            </div>
            <div className='h-full flex-1 text-center bg-gradient-to-b from-gray-900 to-gray-800'>
              <p className='font-bold'>Solicitudes</p>
              <button
                className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs  "
                onClick={handlemissolicitudes}
              >Mis solicitudes</button>
            </div>
            <div className='h-full flex-1 text-center bg-gradient-to-b from-gray-900 to-gray-800'>
              <p className='font-bold'>Solicitudes enviadas</p>
              <p>Solicitudes leídas</p>
              <p>Solicitudes no leídas</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gradient-to-b from-gray-900 to-gray-700 h-full'>  asd</div>
    </div>

  );
};

export default HomeTrab;

function setUserData(email: string) {
  throw new Error('Function not implemented.');
}
