'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../../../../components/Navbar'
import VistaEmpresa from '../../components/vistaempresa/vistaEmpresa'
import VistaProfesional from '../../components/vistaprofesional/vistaProfesional';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import Footer from '@/app/components/Footer';


interface User {
  id: any,
  userEmail: string;
  userType: string;
}


export default function EditarPerfil() {
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
        }
      }
    };

    fetchDoc();
  }, [userData]);




  return (
    <div className="">
      <main className='bg-zinc-500 h-full'>
        <Navbar />
        {userType == 'empresa' && <VistaEmpresa userData={userData} />}
        {userType == 'profesional' && <VistaProfesional userData={userData} />}
      </main>
      <Footer />

    </div>
  )
}

EditarPerfil.requireAuth = true