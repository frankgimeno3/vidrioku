"use client"
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

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
  const [user, setUser] = useState<User | undefined>();
  const [userData, setUserData] = useState("");
  const [isDNI, setIsDNI] = useState(true);

  const [nombre, setNombre] = useState(user?.nombre)
  const [apellidos, setApellidos] = useState(user?.nombre)
  const [edad, setEdad] = useState(user?.nombre)
  const [genero, setGenero] = useState(user?.genero)
  const [ubi, setUbi] = useState(user?.ubi)
  const [DNI, setDNI] = useState(user?.ubi)
  const [NIE, setNIE] = useState(user?.ubi)
  const [tel, setTel] = useState(user?.ubi)
  const [permiso, setPermiso] = useState(user?.ubi)
  const [vehiculo, setVehiculo] = useState(user?.ubi)
  const [carta, setCarta] = useState(user?.ubi)

  
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
      <form onSubmit={guardarCambiosHandler}>
        <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500 ">
          <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
          <div className="flex flex-col mx-auto">
            <label htmlFor="nombre" className="mr-5">Nombre: </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder={user?.nombre}
              value={user?.nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="apellidos" className="mr-5">Apellidos: </label>
            <input 
              type="text"
              id="apellidos"
              name="apellidos"
              placeholder={user?.apellidos}
              value={user?.apellidos} 
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>
          <div className="flex flex-col mx-auto">
            <label htmlFor="edad" className="mr-5">Año de nacimiento: </label>
            <input 
              type="number"
              id="edad"
              name="edad"
              placeholder={user?.edad}
              onChange={(e) => setEdad(e.target.value)}
              value={user?.edad} 
              />
          </div>
          <div className="flex flex-col mx-auto">
            <label htmlFor="genero" className="mr-5">Género: </label>
            <input type="text" className="capitalize" value={user?.genero} />
          </div>
          <div className="flex flex-col mx-auto">
            <label htmlFor="ubi" className="mr-5">Residencia actual: </label>
            <input type="text" value={user?.ubi} />
          </div>
          {isDNI && <div className="flex flex-col mx-auto">
            <label htmlFor="DNI" className="mr-5">DNI: </label>
            <input type="text" value={"INSERTAR AQUÍ"} />
            <button onClick={niehandler}>Haz click aquí si tienes NIE en vez de DNI</button>
          </div>}
          {!isDNI && <div className="flex flex-col mx-auto">
            <label htmlFor="NIE" className="mr-5">NIE: </label>
            <input type="text" value={"INSERTAR AQUÍ"} />
            <button onClick={DNIhandler}>Haz click aquí si tienes DNI en vez de NIE</button>
          </div>}
          <div className="flex flex-col mx-auto">
            <label className="mr-5">Teléfono </label>
            <input type="text" value="INSERTAR AQUÍ" />
          </div>
          <div className="flex flex-col mx-auto">
            <label className="mr-5">Linkedin </label>
            <input type="text" value="INSERTAR AQUÍ" />
          </div>
          <div className="flex flex-col mx-auto">
            <label className="mr-5">Permiso de conducción? </label>
            <input type="text" value="INSERTAR AQUÍ" />
          </div>
          <div className="flex flex-col mx-auto">
            <label className="mr-5">Vehículo propio? </label>
            <input type="text" value="INSERTAR AQUÍ" />
          </div>
        </div>
        <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500 ">
          <label className="mr-5">Carta de presentación </label>
          <textarea value="INSERTAR AQUÍ" className='m-5'></textarea>
        </div>
        <div className="mx-auto py-5 text-center">
          <button type="submit" onClick={guardarCambiosHandler} className="bg-blue-500 text-white px-4 py-2 rounded text-center">
            Guardar Cambios
          </button>
        </div>
      </form>
    </>
  )
}

export default editarPerfil