'use client'

import { signOut, useSession } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { redirect, useRouter } from 'next/navigation';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useUserSession from '../components/hooks/userSession';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';

interface PublicarProps {}

const Publicar: FC<PublicarProps> = ({}) => {
    const { userData, session } = useUserSession();
    const user = useSelector(selectUser);

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const router = useRouter()

    const addPublicationToAuthor = async (userId: string, publicationId: string) => {
        try {
            const docRef = doc(db, "users", userId);
            const userDoc = await getDoc(docRef);

            if (userDoc.exists()) {
                const userDataReceived = userDoc.data();

                if (userDataReceived.publicaciones && Array.isArray(userDataReceived.publicaciones)) {
                    await setDoc(docRef, {
                        ...userDataReceived,
                        publicaciones: [...userDataReceived.publicaciones, publicationId],
                    });
                } else {
                    await setDoc(docRef, {
                        ...userDataReceived,
                        publicaciones: [publicationId],
                    });
                }
            } else {
                console.error('El documento del usuario no existe');
            }
        } catch (error) {
            console.error('Error al añadir la oferta al autor:', error);
        }
    };

    const crearPublicacion = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (titulo.trim() !== '' && contenido.trim() !== '' && user) {
            try {
                const publicacionesCollection = collection(db, 'publicaciones');
                const newPublicationRef = await addDoc(publicacionesCollection, {
                    id: '',
                    titulo: titulo.trim(),
                    contenido: contenido.trim(),
                    autor: user.email
                });
                await updateDoc(newPublicationRef, { id: newPublicationRef.id });

                if (userData && typeof userData.id === 'string') {
                    await addPublicationToAuthor(userData.id, newPublicationRef.id);
                } else {
                    console.error('User data is invalid');
                }

                router.push('/dashboard');
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
                <form onSubmit={crearPublicacion} className='flex flex-col my-12 mt-18  justify-center w-full px-96 text-left'>
                    <label htmlFor="titular" className='pl-1'>Titular:</label>
                    <input
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className='rounded-md bg-transparent mb-5 border border-gray-100'
                        placeholder="Añada aquí un titular" />
                    <label htmlFor="titular" className='pl-1'>Contenido:</label>
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Añada aquí el contenido a publicar"
                        className='mb-5 rounded shadow mx-auto w-full bg-transparent border border-gray-100 h-36'></textarea>
                    <button type="submit" className="p-2 border shadow-lg rounded-lg text-xs   w-36 mx-auto mt-3 mb-24 bg-white hover:bg-gray-50">
                        Publicar contenido
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Publicar;
