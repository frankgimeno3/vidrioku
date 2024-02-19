import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ProfesionalCard from './profesionalCard';
import RightElems from './rightElems';

import AnadirRecorrido from './anadir/anadirRecorrido'
import AnadirEstudios from './anadir/anadirEstudios'
import AnadirIdiomas from './anadir/anadirIdiomas'

import EditarRecorrido from './editar/editarRecorrido'
import EditarEstudios from './editar/editarEstudios'
import EditarIdiomas from './editar/editarIdiomas'


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
  tel: any;
  linkedin: any;
  DNI: any;
  permiso: any;
  vehiculo: any;
  carta: any;
}

const Perfilprofesional: FC<PerfilprofesionalProps> = ({ }) => {
  const [isRecorridoSelected, setIsRecorridoSelected] = useState(false)
  const [isEstudiosSelected, setIsEstudiosSelected] = useState(false)
  const [isIdiomasSelected, setIsIdiomasSelected] = useState(false)
  const [isEditarRecorridoSelected, setIsEditarRecorridoSelected] = useState(false)
  const [isEditarEstudiosSelected, setIsEditarEstudiosSelected] = useState(false)
  const [isEditarIdiomasSelected, setIsEditarIdiomasSelected] = useState(false)
  const [experienciaElegida, setExperienciaElegida] = useState('')
  const [estudioElegido, setEstudioElegido] = useState('')
  const [idiomaElegido, setIdiomaElegido] = useState('')

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
        }
      }
    };

    fetchDoc();
  }, [userData]);

  return (
    <>
      <div className="flex flex-col  bg-gradient-to-b from-zinc-900 to-zinc-600"   >
        <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg py-3 text-center">  {user?.nombre}</h2>
        <div className='flex flex-row  '>
          <ProfesionalCard user={user} userData={userData} />
          <RightElems 
            user={user} 
            userData={userData}
            setIsRecorridoSelected={setIsRecorridoSelected}
            setIsEstudiosSelected={setIsEstudiosSelected}
            setIsIdiomasSelected={setIsIdiomasSelected}
            setIsEditarRecorridoSelected={setIsEditarRecorridoSelected}   
            setIsEditarEstudiosSelected={setIsEditarEstudiosSelected}   
            setIsEditarIdiomasSelected={setIsEditarIdiomasSelected}   
            setExperienciaElegida={setExperienciaElegida}    
            setEstudioElegido={setEstudioElegido}    
            setIdiomaElegido={setIdiomaElegido}    
          />
        </div>
      </div>
      {isRecorridoSelected &&
        <div className="absolute inset-0 flex items-center justify-center">
          <AnadirRecorrido setIsRecorridoSelected={setIsRecorridoSelected} userData={userData} />
        </div>
      }
      {isEstudiosSelected &&
        <div className="absolute inset-0 flex items-center justify-center">
          <AnadirEstudios setIsEstudiosSelected={setIsEstudiosSelected} userData={userData} />
        </div>
      }
      {isIdiomasSelected &&
        <div className="absolute inset-0 flex items-center justify-center">
          <AnadirIdiomas setIsIdiomasSelected={setIsIdiomasSelected} userData={userData} />
        </div>
      }
      {isEditarRecorridoSelected &&
        <div className="absolute inset-0 flex items-center justify-center">
          <EditarRecorrido setIsEditarRecorridoSelected={setIsEditarRecorridoSelected} userData={userData} experienciaElegida={experienciaElegida} />
        </div>
      }
      {isEditarEstudiosSelected &&
        <div className="absolute inset-0 flex items-center justify-center">
          <EditarEstudios setIsEditarEstudiosSelected={setIsEditarEstudiosSelected} userData={userData} estudioElegido={estudioElegido} />
        </div>
      }
      {isEditarIdiomasSelected &&
        <div className="absolute inset-0 flex items-center justify-center">
          <EditarIdiomas setIsEditarIdiomasSelected={setIsEditarIdiomasSelected} userData={userData} idiomaElegido={idiomaElegido} />
        </div>
      }
    </>
  );
};

export default Perfilprofesional;
