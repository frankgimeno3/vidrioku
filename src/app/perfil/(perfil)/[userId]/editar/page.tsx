"use client"
import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import TogglePermiso from './components/TogglePermiso';
import ToggleVehiculo from './components/ToggleVehiculo';
import CambiarFoto from './components/CambiarFoto';

interface PerfilprofesionalProps {
  userData: any
}

interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  // userEmail: string;
  DNI: string;
  NIE: string;
  tel: string;
  permiso: string;
  vehiculo: string;
  carta: string;
  linkedin: string;
 }
const editarPerfil: FC<PerfilprofesionalProps> = ({ }) => {
  const [user, setUser] = useState<User | undefined>();
  const [userData, setUserData] = useState("");
  const [isDNI, setIsDNI] = useState(true);

  const [nombreActualizado, setNombreActualizado] = useState(user?.nombre)
  const [apellidosActualizado, setApellidosActualizado] = useState(user?.apellidos)
  const [edadActualizado, setEdadActualizado] = useState(user?.edad)
  const [generoActualizado, setGeneroActualizado] = useState(user?.genero)
  const [ubiActualizado, setUbiActualizado] = useState(user?.ubi)
  const [DNIActualizado, setDNIActualizado] = useState(user?.DNI)
  const [NIEActualizado, setNIEActualizado] = useState(user?.NIE)
  const [telActualizado, setTelActualizado] = useState(user?.tel)
  const [linkedinActualizado, setLinkedinActualizado] = useState(user?.linkedin)
  const [permisoActualizado, setPermisoActualizado] = useState(user?.permiso || false)
  const [vehiculoActualizado, setVehiculoActualizado] = useState(user?.vehiculo || false)
  const [cartaActualizado, setCartaActualizado] = useState(user?.carta)

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
    linkedin: any
  ) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        // Elimina campos con valores undefined
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
        };
  
        // Filtra campos undefined
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

  const handlemodificarperfil = (event:any) => {
    event.preventDefault();
    setIsCambiarFotoOpen(true);
  }

  return (
    <>
      <Navbar />
      <form onSubmit={guardarCambiosHandler} className='mx-24 relative'>
        <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500    ">
          <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto mt-5 " />
          <button className='my-5 mx-auto p-2 py-3 text-sm border text-gray-500 rounded-lg shadow-lg hover:bg-gray-50 border-gray-100 '
          onClick={handlemodificarperfil}>
            Modificar Imagen de perfil
          </button>
          <div className="flex flex-col mx-96">
            <div className="flex flex-col my-2  ">
              <label htmlFor="nombre" >Nombre: </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder={user?.nombre}
                onChange={(e) => setNombreActualizado(e.target.value)}
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
                onChange={(e) => setApellidosActualizado(e.target.value)}
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
                onChange={(e) => setEdadActualizado(parseInt(e.target.value) || undefined)}
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
                onChange={(e) => setGeneroActualizado(e.target.value)}
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
                onChange={(e) => setUbiActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            {isDNI && <div className="flex flex-col my-2 ">
              <label htmlFor="DNI" >DNI: </label>
              <input type="text"
                id="DNI"
                name="DNI"
                placeholder={user?.DNI  || "Inserte aquí la URL de su número de DNI"}
                onChange={(e) => setDNIActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
              <button onClick={niehandler}
              className='bg-gray-50 shadow rounded my-5 border px-3 py-1 mx-24'>
                Haga click aquí si tiene NIE en vez de DNI</button>
            </div>}
            {!isDNI && <div className="flex flex-col  my-2 ">
              <label htmlFor="NIE" >NIE: </label>
              <input
                type="text"
                id="NIE"
                name="NIE"
                placeholder={user?.NIE || "Inserte aquí su número de NIE"}
                onChange={(e) => setNIEActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
              <button onClick={DNIhandler} className='bg-gray-50 shadow rounded my-5 border px-3 py-1 mx-24'>
              Haga click aquí si tiene DNI en vez de NIE</button>
            </div>}
            <div className="flex flex-col my-2">
              <label htmlFor="tel" >Teléfono </label>
              <input
                type="text"
                id="tel"
                name="tel"
                placeholder={user?.tel || "Inserte aquí la URL de su número de teléfono" }
                onChange={(e) => setTelActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="linkedin"  >Linkedin </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="Inserte aquí la URL de su perfil de Linkedin"
                onChange={(e) => setLinkedinActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="permiso" >Permiso de conducción? </label>
              <TogglePermiso setPermiso={setPermisoActualizado} permisoActualizado={permisoActualizado} />

            </div>
            {permisoActualizado  && <div className="flex flex-col my-2">
              <label htmlFor="vehiculo" >Vehículo propio? </label>
              <ToggleVehiculo setVehiculo={setVehiculoActualizado} vehiculoActualizado={vehiculoActualizado}/>
         
            </div>}
          </div>
        </div>
        <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500 ">
          <label htmlFor="carta" >Carta de presentación </label>
          <textarea placeholder="Añada aquí una descripción, como carta de presentación que se mostrará a las empresas" 
          className='m-5 rounded shadow mx-96 bg-gray-50'
          onChange={(e) => setCartaActualizado(e.target.value)}
          ></textarea>
        </div>
        <div className="mx-auto py-5 text-center">
          <button type="submit" onClick={()=> editarPerfil(userData, apellidosActualizado, edadActualizado, generoActualizado,
          nombreActualizado,  ubiActualizado,  DNIActualizado, NIEActualizado, telActualizado, permisoActualizado, 
          vehiculoActualizado, cartaActualizado, linkedinActualizado)} className="bg-blue-500 text-white px-4 my-2 rounded text-center">
            Guardar Cambios
 
          </button>
        </div>
      </form>
      {isCambiarFotoOpen && <CambiarFoto setIsCambiarFotoOpen={setIsCambiarFotoOpen} />}
    </>
  )
}

export default editarPerfil