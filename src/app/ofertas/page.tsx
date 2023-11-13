'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
import OfertasList from './ofertascomponents/OfertasList'

export default function Dashboard() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [currentComponent, setCurrentComponent] = useState("OfertasList")
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState("")
  const router = useRouter();
  
  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {setUserData("Usuario")}
  }, [session?.data?.user?.email]);

  const handlePageChange = (pageName: string) => {
    setCurrentComponent(pageName);
  };

  let componentToRender;
 
  
  return (
    <div className="">

      <main className='h-screen bg-zinc-500 '>
      <Navbar   />
      <OfertasList  />
       <Footer onPageChange={handlePageChange} />
     
    </main>
    </div>
  )
}

Dashboard.requireAuth = true