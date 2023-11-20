"use client"
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import TogglePermiso from './components/TogglePermiso';
import ToggleVehiculo from './components/ToggleVehiculo';

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
  DNI: string;
  NIE: string;
  tel: string;
  permiso: string;
  vehiculo: string;
  carta: string;
}
const editarPerfil: FC<PerfilprofesionalProps> = ({ }) => {
  const [user, setUser] = useState<User | undefined>();
  const [userData, setUserData] = useState("");
  const [isDNI, setIsDNI] = useState(true);

  const [nombre, setNombre] = useState(user?.nombre)
  const [apellidos, setApellidos] = useState(user?.apellidos)
  const [edad, setEdad] = useState(user?.edad)
  const [genero, setGenero] = useState(user?.genero)
  const [ubi, setUbi] = useState(user?.ubi)
  const [DNI, setDNI] = useState(user?.DNI)
  const [NIE, setNIE] = useState(user?.NIE)
  const [tel, setTel] = useState(user?.tel)
  const [permiso, setPermiso] = useState(user?.permiso)
  const [vehiculo, setVehiculo] = useState(user?.vehiculo)
  const [carta, setCarta] = useState(user?.carta)


  const router = useRouter();

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
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
          console.log(myUserData);
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

  const niehandler = (event: any) => {
    event.preventDefault();
    setIsDNI(false)
  }
  const DNIhandler = (event: any) => {
    event.preventDefault();
    setIsDNI(true)
  }
  return (
    <>
      <Navbar />
      <form onSubmit={guardarCambiosHandler} className='mx-24'>
        <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500    ">
          <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5 " />
          <div className="flex flex-col mx-96">
            <div className="flex flex-col my-2  ">
              <label htmlFor="nombre" >Nombre: </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder={user?.nombre}
                onChange={(e) => setNombre(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="apellidos" >Apellidos: </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder={user?.apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'

              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="edad" >Año de nacimiento: </label>
              <input
                type="number"
                id="edad"
                name="edad"
                placeholder={user?.edad?.toString() ?? ''}
                onChange={(e) => setEdad(parseInt(e.target.value) || undefined)}
                className='w-full text-center bg-gray-50 shadow rounded'

              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="genero" >Género: </label>
              <input
                type="text"
                id="genero"
                name="genero"
                placeholder={user?.genero}
                onChange={(e) => setGenero(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            <div className="flex flex-col  my-2">
              <label htmlFor="ubi" >Residencia actual: </label>
              <input
                type="text"
                id="ubi"
                name="ubi"
                placeholder={user?.ubi}
                onChange={(e) => setUbi(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            {isDNI && <div className="flex flex-col my-2 ">
              <label htmlFor="DNI" >DNI: </label>
              <input type="text"
                id="DNI"
                name="DNI"
                placeholder={user?.DNI}
                onChange={(e) => setDNI(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
              <button onClick={niehandler}
              className='bg-gray-50 shadow rounded my-2 border px-3 py-1 mx-44'>
                Haz click aquí si tienes NIE en vez de DNI</button>
            </div>}
            {!isDNI && <div className="flex flex-col  my-2 ">
              <label htmlFor="NIE" >NIE: </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder={user?.apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
              <button onClick={DNIhandler} className='bg-gray-50 shadow rounded my-2 border px-3 py-1 mx-44'>
              Haz click aquí si tienes DNI en vez de NIE</button>
            </div>}
            <div className="flex flex-col my-2">
              <label >Teléfono </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder={user?.apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            <div className="flex flex-col my-2">
              <label >Linkedin </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder={user?.apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            <div className="flex flex-col my-2">
              <label >Permiso de conducción? </label>
              <TogglePermiso />

            </div>
            <div className="flex flex-col my-2">
              <label >Vehículo propio? </label>
              <ToggleVehiculo />

            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500 ">
          <label >Carta de presentación </label>
          <textarea placeholder="Añada aquí una descripción, como carta de presentación que se mostrará a las empresas" className='m-5'></textarea>
        </div>
        <div className="mx-auto py-5 text-center">
          <button type="submit" onClick={guardarCambiosHandler} className="bg-blue-500 text-white px-4 my-2 rounded text-center">
            Guardar Cambios
          </button>
        </div>
      </form>
    </>
  )
}

export default editarPerfil