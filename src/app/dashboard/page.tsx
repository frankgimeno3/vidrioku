'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../components/screens/HomeEmpr'
import Search from '../search/page'
import Notifications from '../notifications/page'
import Perfil from '../components/screens/Perfil2'
import Publicaciones from '../components/screens/Publicaciones'
import Seguimientos from '../components/screens/Seguimientos'
import Mensajes from '../chat/page'



export default function Dashboard() {
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
      <Home userData={userData}/>
            {/* <Footer onPageChange={handlePageChange} /> */}
     
    </main>
    </div>
  )
}

Dashboard.requireAuth = true