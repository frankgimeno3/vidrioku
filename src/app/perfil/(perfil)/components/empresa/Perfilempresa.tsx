import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useSession } from 'next-auth/react';

import EmpresaCard from "./empresaCard"
import OfertasActivas from './cards/OfertasActivas';

interface PerfilempresaProps {
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

const Perfilempresa: FC<PerfilempresaProps> = ({ }) => {

  const [editarIdiomasSelected, setIsEditarIdiomasSelected] = useState(false)
  const [idiomaElegido, setIdiomaElegido] = useState(false)
 
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
    <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">  {user?.nombre} S.A.</h2>

      <div className="flex flex-row w-full  justify-between bg-gradient-to-b from-slate-900 to-slate-600">
        <EmpresaCard user={user} userData={userData} />

        <div className='flex flex-col flex-1 mx-auto mt-5'>
          <OfertasActivas     Idioma={"Idioma"} IdiomaId={"IdiomaId"} Nivel={"Nivel"}     setIsEditarIdiomasSelected={setIsEditarIdiomasSelected} setIdiomaElegido={setIdiomaElegido}  userData={userData}/>

        </div>
      </div>

    </div>
  );
};

export default Perfilempresa;