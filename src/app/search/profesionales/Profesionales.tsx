'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

  

export default function Profesionales() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [currentComponent, setCurrentComponent] = useState("Profesionales")
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
    router.push("/")
    setTimeout(() => {
      signOut()
    }, 1000);
  };
  return (
    <div className="">

      <main className='h-screen bg-zinc-500 '>
       {componentToRender}
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
           <button className='text-white' onClick={() => handleCerrarSesion()}> 
            Cerrar sesión
          </button>
        </ul>
      </div>
    </main>
    </div>
  )
}

Profesionales.requireAuth = true