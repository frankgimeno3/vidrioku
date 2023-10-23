'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../components/screens/Home'
import Search from '../components/searchTree/Search'
import Notifications from '../components/screens/Notifications'
import Perfil from '../components/screens/Perfil2'
import Publicaciones from '../components/screens/Publicaciones'
import Seguimientos from '../components/screens/Seguimientos'
import Mensajes from '../components/screens/Mensajes'

export default function Dashboard() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [currentComponent, setCurrentComponent] = useState("Home")
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
      componentToRender = <Home userData={userData}/>;
      break;
  }
  const handlePerfilClick = () => {
    setCurrentComponent('Perfil')
    setIsMenuOpen(false)
  };

  const handleMensajesClick = () => {
    setCurrentComponent('Mensajes')
    setIsMenuOpen(false)
  };

  const handlePublicacionesClick = () => {
    setCurrentComponent('Publicaciones')
    setIsMenuOpen(false)
  };

  const handleSeguimientosClick = () => {
    setCurrentComponent("Seguimientos")
    setIsMenuOpen(false)
  };
  const handleCerrarSesion = async () => {

    // try {
    //   await signOut(auth)
    //   console.log("tamo fuera", auth)
    //   setTimeout(function () {
    //     router.push('/');
    //     setIsMenuOpen(false)
    //     console.log(auth)
    //   }, 500);

    // } catch (error) {
    //   console.log(error)
    // }
  };
  return (
    <div className="p-8">

      <main className='h-screen bg-zinc-500 '>
      <Navbar currentComponent={currentComponent} setCurrentComponent={setCurrentComponent}
        isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {componentToRender}
      <Footer onPageChange={handlePageChange} />
      <div className={isMenuOpen ?
        'fixed top-0 right-0 flex flex-col text-gray-800 z-50 bg-zinc-800  mt-20 ' : 'hidden'}>
        <ul className='flex flex-col text-md text-gray-100 w-screen '>
          <button className='py-2 hover:bg-zinc-500' onClick={handlePerfilClick}>
            Perfil
          </button>
          <button className='py-2 hover:bg-zinc-500' onClick={handleMensajesClick}>
            Mensajes
          </button>
          <button className='py-2 hover:bg-zinc-500' onClick={handlePublicacionesClick}>
            Publicaciones
          </button>
          <button className='py-2 hover:bg-zinc-500' onClick={handleSeguimientosClick}>
            Seguimientos
          </button>
          <button className='py-2 hover:bg-zinc-500'  >
            Configuración
          </button>
           <button className='text-white' onClick={() => signOut()}> 
            Cerrar sesión
          </button>
        </ul>
      </div>
    </main>
    </div>
  )
}

Dashboard.requireAuth = true