"use client"
import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';

import Fase1 from './fase1'
import Fase2 from './fase2'
import Fase3base from './fase3/fase3base'

import CambiarFoto from '../CambiarFoto';
import { User } from '@/app/components/interfaces/interfaces';

interface PerfilprofesionalProps {
  userData: any
}
 
const vistaProfesional: FC<PerfilprofesionalProps> = ({ }) => {
  const [user, setUser] = useState<User | undefined>();
  const [userDataReceived, setUserDataReceived] = useState("");
  const [fase, setFase] = useState(1)

  const [nombreActualizado, setNombreActualizado] = useState(user?.nombre)
  const [apellidosActualizado, setApellidosActualizado] = useState(user?.apellidos)
  const [edadActualizado, setEdadActualizado] = useState(user?.edad)
  const [generoActualizado, setGeneroActualizado] = useState(user?.genero)
  const [ubiActualizado, setUbiActualizado] = useState(user?.ubi)
  const [emailActualizado, setEmailActualizado] = useState(user?.email)
  const [DNIActualizado, setDNIActualizado] = useState(user?.DNI)
  const [NIEActualizado, setNIEActualizado] = useState(user?.NIE)
  const [telActualizado, setTelActualizado] = useState(user?.tel)
  const [linkedinActualizado, setLinkedinActualizado] = useState(user?.linkedin)
  const [permisoActualizado, setPermisoActualizado] = useState(user?.permiso || false)
  const [vehiculoActualizado, setVehiculoActualizado] = useState(user?.vehiculo || false)
  const [cartaActualizado, setCartaActualizado] = useState(user?.carta)
  const [paisActualizado, setPaisActualizado] = useState(user?.pais)

  const [isCambiarFotoOpen, setIsCambiarFotoOpen] = useState(false)

  const router = useRouter();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserDataReceived(session.data.user.email);
    } else {
      setUserDataReceived("Usuario");
    }
  }, [session?.data?.user?.email]);


  useEffect(() => {
    const fetchDoc = async () => {
      if (userDataReceived) {
        const docRef = doc(db, "users", userDataReceived);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
        }
      }
    };

    fetchDoc();
  }, [userDataReceived]);


  const guardarCambiosHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/perfil/${userDataReceived}`);
  };


  const editarPerfil = async (
    userId: string,
    apellidos: any,
    edad: any,
    genero: any,
    nombre: any,
    ubi: any,
    DNI: any,
    NIE: any,
    tel: any,
    permiso: any,
    vehiculo: any,
    carta: any,
    linkedin: any,
    email:any,
    pais:any
  ) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        const updatedData = {
          apellidos: apellidos,
          edad: edad,
          genero: genero,
          nombre: nombre,
          ubi: ubi,
          DNI: DNI,
          NIE: NIE,
          tel: tel,
          permiso: permiso,
          vehiculo: vehiculo,
          carta: carta,
          linkedin: linkedin,
          email: email,
          pais:pais
        };

        const filteredData = Object.fromEntries(
          Object.entries(updatedData).filter(([_, value]) => value !== undefined)
        );

        await setDoc(docRef, {
          ...userData,
          ...filteredData,
        });
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
    }
  };

  const handlemodificarperfil = (event: any) => {
    event.preventDefault();
    setIsCambiarFotoOpen(true);
  }

  return (
    <>
      <form onSubmit={guardarCambiosHandler} className='mx-24 relative   '>
        <div className="flex flex-col p-8 justify-between text-center justify-center px-auto bg-gray-50 shadow-sm border border-gray-50 mx-10   text-gray-500    ">
          {fase == 1 &&
            <Fase1
              handleModificarPerfil={handlemodificarperfil}
              setNombreActualizado={setNombreActualizado}
              setApellidosActualizado={setApellidosActualizado}
              setGeneroActualizado={setGeneroActualizado}
              setEdadActualizado={setEdadActualizado}
              setUbiActualizado={setUbiActualizado}
              setDNIActualizado={setDNIActualizado}
              setNIEActualizado={setNIEActualizado}
              setPermisoActualizado={setPermisoActualizado}
              setVehiculoActualizado={setVehiculoActualizado}
              permisoActualizado={permisoActualizado}
              vehiculoActualizado={vehiculoActualizado}
              setPaisActualizado={setPaisActualizado}
              user={user}
              setFase={setFase}
            />
          }
          {fase == 2 &&

            <Fase2
              user={user}
              setTelActualizado={setTelActualizado}
              setLinkedinActualizado={setLinkedinActualizado}
              setEmailActualizado={setEmailActualizado}
              setCartaActualizado={setCartaActualizado}
              setFase={setFase}
            />
          }
          {fase == 3 &&
            <Fase3base
              user={user}
              setFase={setFase}
            />
          }
          {fase == 4 &&
            <div>

            </div>
          }
        </div>
      </form >

      {fase == 4 &&
        <button type="submit" onClick={() => editarPerfil(userDataReceived, apellidosActualizado, edadActualizado, generoActualizado,
          nombreActualizado, ubiActualizado, DNIActualizado, NIEActualizado, telActualizado, permisoActualizado,
          vehiculoActualizado, cartaActualizado, linkedinActualizado, emailActualizado, paisActualizado)} className="bg-blue-500 text-white px-4 my-2 rounded text-center">
          Guardar Cambios
        </button>}
      {isCambiarFotoOpen && <CambiarFoto setIsCambiarFotoOpen={setIsCambiarFotoOpen} userData={userDataReceived} />}
    </>
  )
}

export default vistaProfesional