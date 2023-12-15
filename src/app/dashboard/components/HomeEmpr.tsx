import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { signOut, useSession } from 'next-auth/react';


interface HomeEmprProps {
  userData: any
}

interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  profilepicture: any;
}

const HomeEmpr: FC<HomeEmprProps> = ({ userData }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [compStyles1, setCompStyles1] = useState({});
  const [compStyles2, setCompStyles2] = useState({});
  const [ofertascreadas, setOfertasCreadas] = useState<any>()
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState<any>()
  const [solicitudesNoContestadas, setSolicitudesNoContestadas] = useState<any>()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 430) {
        setCompStyles1({ height: '800px' });
        setCompStyles2({ height: '800px', width: '650px' });
      } else {
        setCompStyles1({  });
        setCompStyles2({ height: '340px' });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially to set the style based on the current screen size

    return () => window.removeEventListener('resize', handleResize); // Cleanup the event listener
  }, []);

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

  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as any;
          setOfertasCreadas(myUserData.ofertascreadas.length)
          setMensajesNoLeidos(myUserData.mensajesnoleidos.length)
          setSolicitudesNoContestadas(myUserData.solicitudesnocontestadas.length)
          }
      }
    };

    fetchDoc();
  }, [userData]);

  const perfilhandler = () => {
    router.push("/perfil")
  }
  const crearofertahandler = () => {
    router.push("/crearoferta")
  }

  const misofertashandler = () => {
    router.push("/misofertas")
  }

  const miPerfilHandler = () => {
    router.push(`/perfil/${userData}`)
  }

  const handleCerrarSesion = async () => {
    router.push("/")
    setTimeout(() => {
      signOut()
    }, 1000);
  };

  return (
    <div className='flex flex-col h-full bg-gray-400 bg-gray-700'>
      <div className="flex flex-col md:flex-row w-full justify-between  md:bg-gradient-to-b md:from-zinc-900 md:to-zinc-600 " style={compStyles1} >
        <div className='flex flex-row h-full  ' style={compStyles2}          >
          <div className=" w-full flex  h-full ">
            <div className="flex flex-col   flex  text-center justify-center w-full  bg-white text-gray-500  ">


              <div className='bg-gradient-to-b from-cyan-600 to-zinc-700  h-full px-12 flex flex-col md:pt-24 pt-6 md:pb-12 pb-6 flex-1'>
                <div className='flex flex-col'>
                  <Image src={user?.profilepicture || "/icons/empresas.png"} alt="" width={200} height={200} className="rounded-full mx-auto md:my-5 my-1 shadow-xl" />
                  <div className='flex flex-col md:my-auto justify-left text-center text-white'>
                    <p className="flex flex-row flex-wrap font-medium text-lg mx-auto">
                      <span className="mr-1">{user?.nombre}</span>
                      <span className="capitalize">{user?.apellidos}</span>
                    </p>
                    <span>{user?.ubi}</span>
                    <span className='italic'>{userData}</span>
                  </div>
                </div>
                <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 md:mt-5 font-light w-36 mx-auto text-sm m-1"
                  onClick={miPerfilHandler}
                >Perfil Completo</button>
              </div>
              <div className='hidden md:block flex flex-col flex-1 md:pt-12  px-12'>
                <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1 font-light "
                  onClick={()=>{router.push("/configuracion")}}
                >Configuración de la cuenta</button>
                <button
                  className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 md:mt-5 mt-2 text-sm m-1 w-36 font-light"
                  onClick={()=>{handleCerrarSesion()}}
                >Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col   text-white h-full w-full    text-white md:text-xl text-lg font-base shadow'  >
          <h2 className="hidden md:block bg-zinc-800 bg-gray-600 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
          <div className='flex flex-col md:mx-12 h-full md:pt-2'>
            <p className='hidden md:block text-center md:text-left'> Mensajes</p>
            <div className='md:bg-white md:rounded-lg   md:shadow-xl md:mb-3 md:mt-2 text-center '>
              <div className='md:bg-white   md:shadow-lg md:border md:border-gray-100 border-sm mx-6 md:m-6  rounded md:rounded-lg my-2'>
                <p className='text-center font-light text-white md:text-gray-500 md:text-lg text-sm px-12 pt-2 md:pt-6'> Has recibido {mensajesNoLeidos} mensajes nuevos</p>
                <button
                  className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-2 md:mb-6 mt-2 text-sm font-light w-36"
                  onClick={() => { router.push("/chat") }}
                >Mis mensajes</button>
              </div>
            </div>
            <p className=' hidden md:block  pt-2 text-center md:text-left'> Mis ofertas</p>
            <div className='flex flex-col md:bg-white md:rounded-lg   md:shadow-xl md:mb-3 md:mt-2 text-center '>
              <div className='  md:bg-white md:shadow-lg md:border md:border-gray-100 border-sm mx-6 md:m-6  rounded md:rounded-lg my-2'>
                <p className='text-center font-light text-white md:text-gray-500 md:text-lg text-sm px-12 pt-2 md:pt-6'> Tienes {ofertascreadas} ofertas publicadas</p>
                <div className='flex flex-row  justify-center  font-light mb-2 md:mb-6'>
                  <button
                    className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-sm m-1  w-36 "
                    onClick={crearofertahandler}
                  >Crear oferta de empleo</button>
                  <button
                    className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-sm m-1 w-36"
                    onClick={misofertashandler}
                  >Mis Ofertas</button>
                </div>
              </div>

            </div>
            <p className=' hidden md:block pt-2 text-center md:text-left'> Solicitudes</p>
            <div className='md:bg-white md:rounded-lg   md:shadow-xl md:mb-3 md:mt-2 text-center '>
              <div className='md:bg-white   md:shadow-lg md:border md:border-gray-100 border-sm mx-6 md:m-6  rounded md:rounded-lg my-2'>
                <p className='text-center font-light text-white md:text-gray-500 md:text-lg text-sm px-12 pt-2 md:pt-6'> Has recibido {solicitudesNoContestadas} solicitudes</p>
                <button
                  className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-2 md:mb-6 mt-2 text-sm font-light w-36 "
                  onClick={() => { router.push("/solicitudes") }}
                >Mis solicitudes</button>
              </div>

            </div>
          </div>
        </div>
        <div className='hidden md:block flex flex-col   overflow-hidden bg-white h-[800px]'>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner.jpg'}
              alt={''}
              width={400} // Ajusta este valor según sea necesario
              height={400}
              objectFit="cover"
            />
          </div>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner.jpg'}
              alt={''}
              width={400} // Ajusta este valor según sea necesario
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomeEmpr;