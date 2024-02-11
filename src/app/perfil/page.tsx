'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../components/Navbar'
import Perfilempresa from './(perfil)/components/empresa/Perfilempresa'
import Perfilprofesional from './(perfil)/components/profesional/Perfilprofesional';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '@/app/components/Footer';


interface User {
  id: any,
  userEmail: string;
  userType: string;
}


export default function Miperfil() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [userType, setUserType] = useState<string>('');
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
          setUserType(myUserData.userType);
          console.log(myUserData)
        }
      }
    };

    fetchDoc();
  }, [userData]);
  



  //OJO, ESTE NO ES EL PERFIL QUE SE MUESTRA!
  
  return (
    <div className="">

        <Navbar />
      <main className='bg-zinc-500 '>
        {userType == 'empresa' && <Perfilempresa userData={userData} />}
        {userType == 'profesional' && <Perfilprofesional userData={userData} />}
       </main>
      <Footer  />

    </div>
  )
}

Miperfil.requireAuth = true