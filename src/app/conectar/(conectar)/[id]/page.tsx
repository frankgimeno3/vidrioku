"use client"
import Navbar from '@/app/components/Navbar';
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

interface ConectarProps {
  params: { id: string }
}

interface User {
  id: any
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any
}


const Conectar: FC<ConectarProps> = ({ params }) => {
  const [user, setUser] = useState<any>()
  const [userData, setUserData] = useState<User>();

    //OBTENEMOS DATOS DE NOSOTROS MISMOS

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });
    useEffect(() => {
        if (session?.data?.user?.email) {
            setUserData(session.data.user as User);
        } else {
            setUserData(undefined);
        }
    }, [session?.data?.user?.email]);
  //AQUÍ OBTENEMOS DATOS DEL PROFESIONAL
  useEffect(() => {
    const fetchDoc = async () => {
      if (params) {
        const docRef = doc(db, "users", params.id);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
        }
      }
    };

    fetchDoc();
    console.log(user)
  }, [params]);
 

  //CREAMOS CONVERSACION
  //CREAMOS MENSAJE Y LO ASOCIAMOS A LA CONVERSACION
  //AÑADIMOS CONVERSACION A LA EMPRESA
  //AÑADIMOS CONVERSACION AL PROFESIONAL
  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Conectar</h2>
        <div className="flex flex-col  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen text-center  ">

          <p className='text-lg pt-12'>Está a punto de conectar con el usuario {user?.nombre} {user?.apellidos}</p>
           <div className='mx-96 px-24 mt-6 '>
            <textarea className='rounded-lg w-full text-gray-600 h-64 p-6' placeholder='Por favor, inserte a continuación el mensaje para comenzar la conversación con el usuario'/>
          </div>
          <Link href={'/chat'}>
          <button className=' mx-auto mt-5  bg-gray-50 text-xs rounded-lg shadow p-4 py-2 text-gray-600'>Enviar y conectar</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Conectar