'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../dashboard/components/HomeTrab'
import Search from '../search/page'
import Notifications from '../notifications/page'
import Perfil from '../components/screens/Perfil2'
import Publicaciones from '../components/screens/Publicaciones'
import Seguimientos from '../misofertas/page'
import Mensajes from '../chat/page'
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

  switch (currentComponent) {
    case "Home":
      componentToRender = <Home userData={userData}/>;
      break;
    case "Search":
      componentToRender = <Search />;
      break;
    case "Notifications":
      componentToRender = <Notifications />;
      break;
    case "Perfil":
      componentToRender = <Perfil />;
      break;
    case "Publicaciones":
      componentToRender = <Publicaciones />;
      break;
    case "Mensajes":
      componentToRender = <Mensajes />;
      break;
    case "Seguimientos":
      componentToRender = <Seguimientos />;
      break;
    default:
      componentToRender = <OfertasList userData={userData}/>;
      break;
  }
  
  return (
    <div className="">

      <main className='h-screen bg-zinc-500 '>
      <Navbar   />
      {componentToRender}
      <Footer onPageChange={handlePageChange} />
     
    </main>
    </div>
  )
}

Dashboard.requireAuth = true