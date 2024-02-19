"use client"
import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import TogglePermiso from '../vistaprofesional/TogglePermiso';
import ToggleVehiculo from '../vistaprofesional/ToggleVehiculo';
import CambiarFoto from '../CambiarFoto';
import Fase1 from './fase1'
import Fase2 from './fase2'
import Fase3 from './fase3'


interface vistaEmpresaProps {
  userData: any
}

interface User {
  nombre: string;
  anoCreacion: string;
  empleados: any;
  actividad: string;
  ubi: string;
  web: string;
  email: string;
  tel: string;
  linkedin: string;
  descripcion: any;
}

const VistaEmpresa: FC<vistaEmpresaProps> = ({ userData }) => {
  const [user, setUser] = useState<User | undefined>();
  const [userDataReceived, setUserDataReceived] = useState("");
  const [fase, setFase] = useState(1)

  const [nombreActualizado, setNombreActualizado] = useState("");
  const [anoCreacionActualizado, setAnoCreacionActualizado] = useState("");
  const [empleadosActualizado, setEmpleadosActualizado] = useState("");
  const [actividadActualizado, setActividadActualizado] = useState([""]);
  const [ubiActualizado, setUbiActualizado] = useState("");
  const [webActualizado, setWebActualizado] = useState("");
  const [emailActualizado, setEmailActualizado] = useState("");
  const [telActualizado, setTelActualizado] = useState("");
  const [linkedinActualizado, setLinkedinActualizado] = useState("");
  const [descripcionActualizado, setDescripcionActualizado] = useState("");
  const [isCambiarFotoOpen, setIsCambiarFotoOpen] = useState(false);

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
    const userId = userData;
    await editarPerfil(userId, nombreActualizado, anoCreacionActualizado, ubiActualizado, telActualizado, emailActualizado, actividadActualizado, descripcionActualizado, empleadosActualizado, webActualizado, linkedinActualizado);
    router.push(`/perfil/${userData}`);
  };

  const editarPerfil = async (
    userId: string,
    nombre: string,
    anoCreacion: string,
    ubi: string,
    tel: string,
    email: string,
    actividad: any,
    descripcion: string,
    empleados: any,
    web: string,
    linkedin: string
  ) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;

        const newData: Partial<User> = {
          nombre: nombre !== "" ? nombre : userData.nombre,
          anoCreacion: anoCreacion !== "" ? anoCreacion : userData.anoCreacion,
          ubi: ubi !== "" ? ubi : userData.ubi,
          empleados: empleados !== "" ? empleados : userData.empleados,
          actividad: actividad.length !== 0 ? actividad : userData.actividad,
          descripcion: descripcion !== "" ? descripcion : userData.descripcion,
          web: web !== "" ? web : userData.web,
          tel: tel !== "" ? tel : userData.tel,
          linkedin: linkedin !== "" ? linkedin : userData.linkedin,
          email: email !== "" ? email : userData.email,
        };

        await setDoc(docRef, { ...userData, ...newData });
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
    }
  };


  const handleModificarPerfil = (event: any) => {
    event.preventDefault();
    setIsCambiarFotoOpen(true);
  };

  return (
    <>
      <form onSubmit={guardarCambiosHandler} className='mx-24 relative   '>
        <div className="flex flex-col p-8 justify-between text-center justify-center px-auto bg-gray-50 shadow-sm border border-gray-50 mx-10   text-gray-500    ">
          {fase == 1 &&
            <Fase1
              handleModificarPerfil={handleModificarPerfil}
              setNombreActualizado={setNombreActualizado}
              setAnoCreacionActualizado={setAnoCreacionActualizado}
              setUbiActualizado={setUbiActualizado}
              user={user}
              setEmpleadosActualizado={setEmpleadosActualizado}
              setFase={setFase} />
          }
          {fase == 2 &&
            <Fase2
              user={user}
              setActividadActualizado={setActividadActualizado}
              setDescripcionActualizado={setDescripcionActualizado}
              setFase={setFase} />
          }
          {fase == 3 &&
            <Fase3
              user={user}
              setTelActualizado={setTelActualizado}
              setWebActualizado={setWebActualizado}
              setEmailActualizado={setEmailActualizado}
              setLinkedinActualizado={setLinkedinActualizado}
            />
          }
        </div>

        {fase == 3 &&
          <div className="flex flex-col pb-12  justify-between text-center justify-center bg-gray-50 shadow-sm mx-10   text-gray-500    ">

              <button type="submit"
                className='py-2 px-4 mb-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl w-36 mx-auto'>
                Guardar Cambios
              </button>

            </div>}
          </form >
      {isCambiarFotoOpen && <CambiarFoto setIsCambiarFotoOpen={setIsCambiarFotoOpen} userData={userData} />
        }
      </>
      )
}

      export default VistaEmpresa