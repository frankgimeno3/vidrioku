import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { signOut, useSession } from 'next-auth/react';
import Banners from '@/app/components/Banners';
import SinSeguimientos from './publicaciones/SinSeguimientos';
import Publicaciones from './publicaciones/Publicaciones';
import { User } from '@/app/components/interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';


interface HomeEmprProps {
}

const HomeEmpr: FC<HomeEmprProps> = ({ }) => {
  const router = useRouter();
  const [compStyles1, setCompStyles1] = useState({});
  const [compStyles2, setCompStyles2] = useState({});
  const [ofertascreadas, setOfertasCreadas] = useState<any>()
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState<any>()
  const [solicitudesNoContestadas, setSolicitudesNoContestadas] = useState<any>()
  const [cuentasSeguidas, setCuentasSeguidas] = useState<any>()
  const [lengthFiltrado, setLengthFiltrado] = useState<number>()

  const user = useSelector(selectUser);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 430) {
        setCompStyles1({ height: '800px' });
        setCompStyles2({ height: '800px', width: '650px' });
      } else {
        setCompStyles1({});
        setCompStyles2({ height: '340px' });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.seguidos) {
      if (user.seguidos[0] === '') {
        setLengthFiltrado(0);
      } else {
        setLengthFiltrado(user.seguidos.length);
      }
    } else {setLengthFiltrado(0)}
  }, [user]);

  useEffect(() => {
    if (user) {
      setOfertasCreadas(user.ofertascreadas?.length)
      setMensajesNoLeidos(user.mensajesnoleidos?.length)
      setSolicitudesNoContestadas(user.solicitudesnocontestadas?.length)
      if (user.seguidos === undefined) { 
        setCuentasSeguidas(0) 
      } else { 
        setCuentasSeguidas(user.seguidos?.length) 
      }
    }
  }, [user]);

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
    router.push(`/perfil/${user?.email}`)
  }

  const handleCerrarSesion = async () => {
    router.push("/")
    setTimeout(() => {
      signOut()
    }, 1000);
  };

  const handleConfiguracion = async () => {
    router.push("/configuracion")
  };

  const handleseguidos = () => {
    router.push("/seguimientos")
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-400 bg-gray-700'>
      <div className="flex flex-col md:flex-row w-full justify-between min-h-screen md:bg-gradient-to-b md:from-zinc-900 md:to-zinc-600 " style={compStyles1} >
        <div className='flex flex-row min-h-screen  ' style={compStyles2} >
          <div className=" w-full flex  h-full ">
            <div className="flex flex-col   flex  text-center justify-center w-full  bg-white text-gray-500  ">
              <div className='bg-gradient-to-b from-cyan-600 to-zinc-700  h-full px-12 flex flex-col md:pt-24 pt-6 md:pb-12 pb-6 flex-1'>
                <div className='flex flex-col'>
                  <div className="relative w-44 h-44 overflow-hidden rounded-full mx-auto my-5 shadow-xl">
                    <img
                      src={user?.profilepicture || "/icons/empty-user-profile.png"}
                      alt=""
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div className='flex flex-col md:my-auto justify-left text-center text-white'>
                    <p className="flex flex-row flex-wrap font-medium text-lg mx-auto">
                      <span className="mr-1">{user?.nombre}</span>
                      <span className="capitalize">{user?.apellidos}</span>
                    </p>
                    <span>{user?.ubi}</span>
                    <span className='italic'>{user?.email}</span>
                  </div>
                </div>
                <button
                  className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 md:mt-5 font-light w-36 mx-auto text-sm m-1"
                  onClick={miPerfilHandler}
                >Perfil Completo</button>
              </div>
              <div className='flex flex-col flex-1 pt-12 px-12'>
            <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={() => { handleConfiguracion() }}
            >Configuración de la cuenta</button>
            <button
              className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={() => { handleCerrarSesion() }}
            >Cerrar Sesión</button>
          </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col   text-white h-full w-full    text-white md:text-xl text-lg font-base shadow'  >
          <h2 className="hidden md:block bg-zinc-800 bg-gray-600 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
          <div className='flex flex-col px-20 py-12	center h-full bg-gray-50    text-center '>
            <div className='shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
              <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-semibold'>  Mensajes</p>
              {mensajesNoLeidos != 1 && mensajesNoLeidos != 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> Ha recibido {mensajesNoLeidos} mensajes nuevos</p>
              }
              {mensajesNoLeidos == 1 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> Ha recibido {mensajesNoLeidos} mensaje nuevo</p>
              }
              {mensajesNoLeidos == 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> No tiene mensajes por leer</p>
              }
              <button
                className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
                onClick={() => { router.push("/chat") }}
              >Mis mensajes</button>
            </div>
            <div className='shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
              <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-medium'>  Mis ofertas</p>

              {ofertascreadas != 1 && ofertascreadas != 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12'> Tiene {ofertascreadas} ofertas publicadas</p>
              }
              {ofertascreadas == 1 &&
                <p className='text-center font-light text-gray-500 text-base px-12'> Tiene {ofertascreadas} oferta publicada</p>
              }
              {ofertascreadas == 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12'> No ha publicado ninguna oferta</p>
              }
              <button
                className=" mx-1 bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
                onClick={crearofertahandler}
              >Crear oferta de empleo</button>
              <button
                className=" mx-1 bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
                onClick={misofertashandler}
              >Mis Ofertas</button>
            </div>

            <div className='shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
              <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-medium'>  Solicitudes</p>
              {solicitudesNoContestadas != 1 && solicitudesNoContestadas != 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> Ha recibido {solicitudesNoContestadas} solicitudes</p>
              }
              {solicitudesNoContestadas == 1 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> Ha recibido {solicitudesNoContestadas} solicitud</p>
              }
              {solicitudesNoContestadas == 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> No tiene solicitudes nuevas</p>
              }
              <button
                className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
                onClick={() => { router.push("/solicitudes") }}
              >Mis solicitudes</button>
            </div>
            <div className='shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
            <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-medium'>  Mis publicaciones</p>

            <button
              className=" m-1 bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
              onClick={() => { router.push("/publicar") }}
            >Publicar contenido</button>
            <button
              className=" m-1 bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
              onClick={() => { router.push("/mispublicaciones") }}
            >Ver mi contenido publicado</button>
          </div>
          <div className='text-gray-400 shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
            <div className='flex flex-row justify-between'>
              <p className='text-left ml-5 mt-3 text-sm font-medium'>  Publicaciones de cuentas que sigues</p>
              {user?.seguidos.length != 0 &&
                <p className='pr-5 text-left hover:text-blue-900 ml-5 mt-3 text-sm font-medium hover:underline' onClick={()=>{handleseguidos()}}>
                  Administrar usuarios seguidos: ( {lengthFiltrado } )</p>
                }
            </div>

            {lengthFiltrado == 0 &&
              <SinSeguimientos />}
            {lengthFiltrado != 0 &&
              <Publicaciones   />
            }
          </div>
          </div>
        </div>
        <Banners widthProp={300} />

      </div>
    </div>

  );
};

export default HomeEmpr;