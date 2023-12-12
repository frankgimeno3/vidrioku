"use client"

import { FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdvertComponent from './AdvertComponent';


interface HomeTrabProps {
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


const HomeAdmin: FC<HomeTrabProps> = ({ userData }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  const handlemissolicitudes = () => {
    router.push("/missolicitudes")
  }
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

  const miPerfilHandler = () => {
    router.push(`/perfil/${userData}`)
  }

  return (
    <div className='flex flex-col'>
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Saludos, <span className='font-bold'>Admin</span></h2>
      <div className="flex flex-col   bg-gradient-to-b from-zinc-500 to-zinc-600 py-12">
        <h2 className='mx-auto text-white text-lg'>Anuncios activos</h2>
        <AdvertComponent bannerName={"Nombre del banner"} bannerRank={1} bannerUrl={'/inventedlogos/banner.jpg'}/>
        <AdvertComponent bannerName={"Nombre del banner"} bannerRank={2} bannerUrl={'/inventedlogos/banner.jpg'}/>
        <AdvertComponent bannerName={"Nombre del banner"} bannerRank={3} bannerUrl={'/inventedlogos/banner.jpg'}/>
        <AdvertComponent bannerName={"Nombre del banner"} bannerRank={4} bannerUrl={'/inventedlogos/banner.jpg'}/>
      </div>
    </div>

  );
};

export default HomeAdmin;

function setUserData(email: string) {
  throw new Error('Function not implemented.');
}
