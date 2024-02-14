'use client'

import { signOut, useSession } from 'next-auth/react';

import React, { FC, useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


interface PublicarProps {
}

const Publicar: FC<PublicarProps> = ({ }) => {
    const [userData, setUserData] = useState('');

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });


    useEffect(() => {
        if (session?.data?.user?.email) {
            setUserData(session.data.user.email);
        } else {
            setUserData('Usuario');
        }
    }, [session?.data?.user?.email]);


const addPublicationToAuthor = ()=>{
    
}

    const crearPublicacion = async (event: any) => {
        event.preventDefault();
        if (titulo !== '' && cargo !== '' && tipoJornada !== '' && tipoLocalizacion !== '') {
          try {
            const offersCollection = collection(db, 'ofertas');
            const newOfferRef = await addDoc(offersCollection, {
              id: '',
              titulo: titulo.trim(),
              cargo: cargo.trim(),
              jornada: tipoJornada.trim(),
              tipoubi: tipoLocalizacion.trim(),
              ubicacion: ubicacion.trim(),
              descripcion: descripcion.trim(),
              experiencia: habilidades,
              adicional: comentarios.trim(),
              empresa: userData,
              solcitantes: [],
              publicacion: Timestamp.now(),
              estado: "activa",
    
            });
            await updateDoc(newOfferRef, { id: newOfferRef.id });
    
            addOfferToAuthor(userData, newOfferRef.id)
            router.push('/misofertas');
          } catch (error) {
            console.error('Error al crear la oferta en Firestore:', error);
          }
        } else {
          console.log("Campos vacíos");
        }
      };


    return (
        <>
            <Navbar />
            <div className='flex flex-col bg-white w-full  text-gray-500   text-center'>
                <h2 className="hidden md:block bg-zinc-800 text-gray-50 font-bold text-lg py-3  ">Publicar contenido</h2>
                <form className='flex flex-col mt-5 justify-center w-full px-96 text-left'>
                    <label htmlFor="titular" className='pl-1'>Titular:</label>
                    <input className='rounded-md bg-transparent mb-5 border border-gray-100'
                        placeholder="Añada aquí un titular" />
                    <label htmlFor="titular" className='pl-1'>Contenido:</label>
                    <textarea
                        placeholder="Añada aquí el contenido a publicar"
                        className='mb-5 rounded shadow mx-auto w-full bg-transparent border border-gray-100'></textarea>
                    <button className="p-2 border shadow-lg rounded-lg text-xs   w-36 mx-auto mt-3 mb-24">
                        Publicar contenido
                    </button>
                </form>
            </div>
            <Footer />
        </>
    )
        ;
}
export default Publicar;    