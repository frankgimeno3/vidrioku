import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'

import OfertasCard from './cards/OfertasActivas';
import PublicacionesEmpresa from './cards/Publicaciones';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface rightElemsProps {
  user: any;
  userData: any;

}


const rightElems: FC<rightElemsProps> = ({ user, userData, }) => {
  const router = useRouter()

  const [receivedUser, setReceivedUser] = useState<any>()

  useEffect(() => {
    if (user) { setReceivedUser(user) }
  }, [user])

  const [isOfertasShown, setIsOfertasShown] = useState(true)
  const [isPublicacionesShown, setIsPublicacionesShown] = useState(true)

  const [ofertasArrayReceived, setOfertasArrayReceived] = useState<any[]>([]);
  const [ofertasDelUsuario, setOfertasDelUsuario] = useState<any[]>([]);
  const [publicacionesArrayReceived, setPublicacionesArrayReceived] = useState<any[]>([]);
  const [publicacionesDelUsuario, setPublicacionesDelUsuario] = useState<any[]>([]);

  useEffect(() => {
    if (receivedUser) {
      setOfertasArrayReceived(receivedUser.ofertascreadas);
      setPublicacionesArrayReceived(receivedUser.publicaciones);
    }
  }, [receivedUser]);

  useEffect(() => {
    const fetchOfertas = async () => {
      if (ofertasArrayReceived.length === 0) return;

      const nuevasOfertas: any = [];
      for (const elementoOferta of ofertasArrayReceived) {
        const docRef = doc(db, "ofertas", elementoOferta);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myOfferObject = response.data();
          nuevasOfertas.push(myOfferObject);
        }
      }
      setOfertasDelUsuario(nuevasOfertas);
    };

    fetchOfertas();
  }, [ofertasArrayReceived]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      if (publicacionesArrayReceived.length === 0) return;

      const nuevasPublicaciones: any = [];
      for (const elementoPublicacion of publicacionesArrayReceived) {
        const docRef = doc(db, "publicaciones", elementoPublicacion);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myPublicationObject = response.data();
          nuevasPublicaciones.push(myPublicationObject);
        }
      }
      setPublicacionesDelUsuario(nuevasPublicaciones);
 
    };

    fetchPublicaciones();
  }, [publicacionesArrayReceived]);

  const ofertasHandler = () => {
    if (isOfertasShown == true) { setIsOfertasShown(false) }
    else if (isOfertasShown == false) { setIsOfertasShown(true) }
  }
  const publicacionesHandler = () => {
    if (isPublicacionesShown == true) { setIsPublicacionesShown(false) }
    else if (isPublicacionesShown == false) { setIsPublicacionesShown(true) }
  }

  const handleCrearOferta = () => {
    router.push('/crearoferta')
  }

  const handlePublicar = () => {
    router.push('/publicar')
  }

  return (
    <div className='flex flex-col mx-8 flex-1 py-8  text-gray-500 '>
      <h2 className='text-white py-2'>Contenidos publicados</h2>
      <div className='flex flex-col  mb-1   w-full   p-5 text-gray-50   justify-left'>
        <h3 className='mr-5'>Ofertas activas</h3>
        <div className='flex flex-row'>
          {isOfertasShown == false &&
            <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
              onClick={() => ofertasHandler()}>
              <div className='flex flex-row  '>
                <p>Mostrar ofertas publicadas</p>
                <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                </svg>
              </div>
            </button>
          }
          {isOfertasShown == true &&
            <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
              onClick={() => ofertasHandler()}>
              <div className='flex flex-row  '>
                <p>Ocultar  ofertas publicadas</p>
                <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                </svg>
              </div>
            </button>
          }
          <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mx-2'
            onClick={() => { handleCrearOferta() }}>Crear nueva oferta</button>
        </div>
        {isOfertasShown ? (
          <div className='w-full'>
            {ofertasDelUsuario ? (
              ofertasDelUsuario.map((oferta: any, index: any) => (
                <OfertasCard
                  key={index}
                  OfertaId={oferta.id}
                  Estado={oferta.estado}
                  Cargo={oferta.cargo}
                  Titulo={oferta.titulo}
                  Jornada={oferta.jornada}
                  userData={userData}
                />
              ))
            ) : (
              <p>No hay ofertas publicadas</p>
            )}
          </div>
        ) : null}
      </div>
      <div className='flex flex-col  mb-1 items-center'>
        <div className='flex flex-col  w-full mx-12 p-5 text-gray-50'>
          <h3 className='mr-5'>Publicaciones de la empresa</h3>
          <div className='flex flex-row'>
            {isPublicacionesShown == false &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => publicacionesHandler()}>
                <div className='flex flex-row  '>
                  <p>Mostrar publicaciones de la empresa</p>
                  <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            {isPublicacionesShown == true &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => publicacionesHandler()}>
                <div className='flex flex-row  '>
                  <p>Ocultar  publicaciones  de la empresa</p>
                  <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mx-2'
              onClick={() => { handlePublicar() }}>Crear nueva publicación</button>
          </div>
          {isPublicacionesShown ? (
            <div className='w-full'>
              {publicacionesDelUsuario ? (
                publicacionesDelUsuario.map((publicacion: any, index: any) => (
                  <PublicacionesEmpresa
                    key={index}
                    Titulo={publicacion.titulo}
                    PublicacionId={publicacion.id}
                    Contenido={publicacion.contenido}
                    userData={userData}
                  />
                ))
              ) : (
                <p>No hay publicaciones</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div >
  )
}

export default rightElems