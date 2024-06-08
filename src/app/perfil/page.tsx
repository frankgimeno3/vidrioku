'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar'
import Perfilempresa from './components/empresa/Perfilempresa'
import Perfilprofesional from './components/profesional/Perfilprofesional';
import { doc, getDoc } from 'firebase/firestore';

import Footer from '@/app/components/Footer';
import { db } from '../firebase';
import { User } from '../components/interfaces/interfaces';
import useUserSession from '../components/hooks/userSession';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';



export default function Miperfil() {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  
   
  return (
    <div className="">
      <main className='bg-zinc-500 h-full'>
        <Navbar />
        {user?.userType == 'empresa' && <Perfilempresa userData={userData} />}
        {user?.userType == 'profesional' && <Perfilprofesional userData={userData} />}
      </main>
      <Footer />

    </div>
  )
}

Miperfil.requireAuth = true