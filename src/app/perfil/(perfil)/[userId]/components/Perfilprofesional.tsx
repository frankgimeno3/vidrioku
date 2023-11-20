import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


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

const Perfilprofesional: FC<PerfilprofesionalProps> = ({ }) => {
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
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 ">
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">  {user?.nombre}</h2>
      <div className='flex flex-row'>
        <div className="flex flex-col flex-1 h-full flex justify-between bg-gradient-to-b from-slate-900 to-slate-600">
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
          <Link href={`/perfil/${userData}`}>
          <div className='mx-auto py-5'>
            <button
              className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
            >Editar información de mi perfil de profesional</button>
          </div>
          </Link>
        </div>
        <div className='mx-auto mt-5 text-center flex-1 '>
          <h2 className='font-bold'>Currículum vitae</h2>
          <div className='flex flex-col my-5 items-center '>
            <div className='flex flex-row'>
              <h3 className='mr-5'>Recorrido laboral</h3>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2'>
              <div className='w-100 h-100 px-5'>
                <Image src={'/logos/1.png'} alt={''} width={100} height={100} className='pt-3 pb-2' />
                <div className='flex flex-col mt-2'>
                  <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mb-3 mr-1'>Editar </button>
                  <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mb-3'>Elminar </button>
                </div>
              </div>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Cargo</h2>
                <p>Empresa: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Lugar, País</p>
                <p>Descripción</p>
              </div>
            </div>
            

            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 '>
              <div className='w-100 h-100 px-5'>
                <Image src={'/logos/1.png'} alt={''} width={100} height={100} className='pt-3 pb-2' />
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mb-3'>Editar </button>

              </div>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Cargo</h2>
                <p>Empresa: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Lugar, País</p>
                <p>Descripción</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col my-5 items-center'>
            <div className='flex flex-row'>
              <h3 className='mr-5'>Estudios, títulos, certificados y reconocimientos</h3>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
            <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Concepto</h2>
                <p>Descripción: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Entidad emisora</p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
            <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Concepto</h2>
                <p>Descripción: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Entidad emisora</p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
            
          </div>
          <div className='flex flex-col my-5 items-center'>
            <div className='flex flex-row'>
              <h3 className='mr-5'>Idiomas</h3>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
            <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Idioma</h2>
                <p>Nivel: </p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
            <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Idioma</h2>
                <p>Nivel: </p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
            
          </div>
          <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mb-5'>Descargar Currículum en PDF</button>

        </div>
      </div>

    </div>
  );
};

export default Perfilprofesional;