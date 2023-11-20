"use client"
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
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

  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState("")
  const router = useRouter();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
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

  const guardarCambiosHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar cambios lógica aquí

    // Redirigir a `perfil/${userData}`
    router.push(`/perfil/${userData}`);
  };


  return (
    <form onSubmit={guardarCambiosHandler}>
    <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500 ">
      <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Nombre y apellidos: </p>
        <input type="text" value={user?.nombre} />
        <input type="text" className="capitalize" value={user?.apellidos} />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Año de nacimiento: </p>
        <input type="text" value={user?.edad} />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Género: </p>
        <input type="text" className="capitalize" value={user?.genero} />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Residencia actual: </p>
        <input type="text" value={user?.ubi} />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">DNI o NIE: </p>
        <input type="text" value={"INSERTAR AQUÍ"} />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Teléfono </p>
        <input type="text" value="INSERTAR AQUÍ" />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Linkedin </p>
        <input type="text" value="INSERTAR AQUÍ" />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Permiso de conducción? </p>
        <input type="text" value="INSERTAR AQUÍ" />
      </div>
      <div className="flex flex-row mx-auto">
        <p className="mr-5">Vehículo propio? </p>
        <input type="text" value="INSERTAR AQUÍ" />
      </div>
    </div>
    <div className="flex flex-col mx-auto bg-white rounded text-gray-500 mx-10 p-4 text-center">
      <p className="mr-5">Carta de presentación </p>
      <input type="text" value="INSERTAR AQUÍ" />
    </div>
    <div className="mx-auto py-5">
      <button type="submit" onClick={guardarCambiosHandler} className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </div>
  </form>
  )
}

export default editarPerfil