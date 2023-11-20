"use client"
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';

interface PerfilprofesionalProps {
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
const editarPerfil: FC<PerfilprofesionalProps> = ({ }) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState("")
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {
      setUserData('Usuario');
    }
  }, [session?.data?.user?.email]);

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
  }, [userData]);

  return (
    <div>
      <div className="flex flex-col p-4  flex justify-between text-center justify-center px-auto bg-white mx-10 my-5
          rounded text-gray-500 ">
            <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Nombre y apellidos: </p>
              <span className="mr-1">{user?.nombre}</span>
              <span className="capitalize">{user?.apellidos}</span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Año de nacimiento: </p>
              <span className='mr-1'>{user?.edad} </span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Género: </p>
              <span className="capitalize">{user?.genero}</span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Residencia actual: </p>
              <span>{user?.ubi}</span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>DNI o NIE: </p>
              <span>INSERTAR AQUÍ</span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Teléfono </p>
              <span>INSERTAR AQUÍ</span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Linkedin </p>
              <span>INSERTAR AQUÍ</span>
            </div>
 
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Permiso de conducción? </p>
              <span>INSERTAR AQUÍ</span>
            </div>
            <div className="flex flex-row mx-auto">
              <p className='mr-5'>Vehículo propio? </p>
              <span>INSERTAR AQUÍ</span>
            </div>
          </div>
          <div className="flex flex-col mx-auto bg-white rounded text-gray-500 mx-10 p-4 text-center">
            <p className='mr-5'>Carta de presentación </p>
            <span>INSERTAR AQUÍ</span>
          </div>
          <div className='mx-auto py-5'>
 
          </div>
    </div>
  )
}

export default editarPerfil