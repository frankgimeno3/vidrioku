"use client"

import { FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { signOut, useSession } from 'next-auth/react';
import Banners from '@/app/components/Banners';
import SinSeguimientos from './publicaciones/SinSeguimientos';
import Publicaciones from './publicaciones/Publicaciones';
import { User } from '@/app/components/interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';


interface HomeTrabProps {
}


const HomeTrab: FC<HomeTrabProps> = ({ }) => {
  const router = useRouter();

  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState<any>()
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState<any>()
  const [solicitudesAceptadas, setSolicitudesAceptadas] = useState<any>()
  const [lengthFiltrado, setLengthFiltrado] = useState<number>()

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      setMensajesNoLeidos(user.mensajesnoleidos.length || '0')
      setSolicitudesEnviadas(user.solicitudes.length)
      setSolicitudesAceptadas(user.solicitudesAceptadasNoLeidas.length || '0')
      console.log("seguidos: ", user?.seguidos)
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      if (user.seguidos[0] = ''){      setLengthFiltrado(0)
      } else{      setLengthFiltrado(user.seguidos.length)      }
    }
  }, [user]);

  const miPerfilHandler = () => {
    router.push(`/perfil`)
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

  const handleseguidos = ()=>{
    router.push("/seguimientos")
  }

  return (
    <div className="flex flex-row w-full justify-between  bg-gradient-to-b from-zinc-900 to-zinc-600 " style={{ height: '800px' }} >
      <div className='flex flex-row h-full w-full flex shadow shadow-sm ' style={{ height: '800px', width: '500px' }}           >
        <div className="flex flex-col   flex  text-center justify-center w-full  bg-white text-gray-500  ">
          <div className='bg-gradient-to-b from-cyan-950 to-zinc-700 h-full px-12 flex flex-col py-12 flex-1'>
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
            <div className='flex flex-col text-md text-center text-white'>
              <p className="flex flex-row flex-wrap font-medium  mx-auto justify-center">
                <span className="mr-1">{user?.nombre}</span>
                <span className="capitalize">{user?.apellidos}</span>
              </p>
              <span className='text-sm'>{user?.ubi}</span>
              <span className='italic text-sm'>{user?.email}</span>
            </div>
            <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
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
      <div className='flex flex-col h-full w-full text-lg shadow shadow-sm'  >
        <h2 className="bg-zinc-800 bg-gray-600 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
        <div className='flex flex-col px-20 py-12	center h-full bg-gray-50    text-center '>
          <div className='shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
            <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-semibold'> Mensajes</p>
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
              className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
              onClick={() => { router.push("/chat") }}
            >Mis mensajes</button>
          </div>
          <div className='flex flex-row'>
            <div className='flex-1 shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
              <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-medium'> Solicitudes enviadas</p>
              {solicitudesEnviadas != 1 && solicitudesEnviadas != 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12'> Ha enviado {solicitudesEnviadas} solicitudes</p>
              }
              {solicitudesEnviadas == 1 &&
                <p className='text-center font-light text-gray-500 text-base px-12'> Ha enviado {solicitudesEnviadas} solicitud</p>
              }
              {solicitudesEnviadas == 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12'> No ha enviado ninguna solicitud</p>
              }
              <button
                className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
                onClick={() => { router.push("/missolicitudes") }}
              >Mis solicitudes</button>
            </div>
            <div className='flex-1 shadow shadow-lg border border-gray-100 border-sm mx-6 my-4 bg-white rounded-lg'>
              <p className='text-gray-400 text-left ml-5 mt-3 text-sm font-medium'> Solicitudes aceptadas</p>

              {solicitudesAceptadas != 1 && solicitudesAceptadas != 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> {solicitudesAceptadas} empresas han aceptado sus solicitudes</p>
              }
              {solicitudesAceptadas == 0 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> No hay nuevas solicitudes aceptadas</p>
              }
              {solicitudesAceptadas == 1 &&
                <p className='text-center font-light text-gray-500 text-base px-12 '> {solicitudesAceptadas} empresa ha aceptado una de sus solicitudes</p>
              }
              <button
                className=" bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mb-6 mt-2 text-sm font-light "
                onClick={() => { router.push("/chat") }}
              >Ir al chat</button>
            </div>
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

            {user?.seguidos.length == 0 &&
              <SinSeguimientos />}
            {user?.seguidos.length != 0 &&
              <Publicaciones   />
            }
          </div>
        </div>
      </div>
      <div className="shadow shadow-sm">
        <Banners widthProp={300} />
      </div>
    </div>

  );
};

export default HomeTrab;
