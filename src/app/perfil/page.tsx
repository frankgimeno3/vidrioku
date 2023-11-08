'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../components/Navbar'
 import Perfilempresa from './components/Perfilempresa'
 


export default function Miperfil() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
   const [userData, setUserData] = useState("")
  const router = useRouter();
  
  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {setUserData("Usuario")}
  }, [session?.data?.user?.email]);

 
  
  
  return (
    <div className="">

      <main className='h-screen bg-zinc-500 '>
      <Navbar    />
      <Perfilempresa userData={userData}/>
            {/* <Footer onPageChange={handlePageChange} /> */}
     
    </main>
    </div>
  )
}

Miperfil.requireAuth = true