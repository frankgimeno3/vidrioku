import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface PublicacionesEmpresaProps {
    Titulo: any;
    PublicacionId: any;
    Contenido: any;
    userData: string;
}


const PublicacionesEmpresa: FC<PublicacionesEmpresaProps> = ({ PublicacionId, Titulo, Contenido, userData }) => {
    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    useEffect(() => {
        console.log("PublicacionId: ", PublicacionId);
    }, [PublicacionId]);

    const eliminarDeUsuario = async () => {
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const publicacionesArray = receivedUserData.publicaciones || [];

                const index = publicacionesArray.findIndex((publicacion: any) => publicacion === PublicacionId);

                if (index !== -1) {
                    publicacionesArray.splice(index, 1);
                    await setDoc(userRef, { ...receivedUserData, publicaciones: publicacionesArray });
                } else {
                    console.error('La publicación especificada no se encontró en el array de publicaciones');
                }
            } else {
                console.error('El documento del usuario no existe');
            }
        } catch (error) {
            console.error('Error al eliminar publicación:', error);
        }
    }

    const eliminarDePublicaciones = async () => {
        try {
            const publicacionRef = doc(db, "publicaciones", PublicacionId);
            const publicacionDoc = await getDoc(publicacionRef);

            if (publicacionDoc.exists()) {
                await deleteDoc(publicacionRef);
                console.log('Publicación eliminada con éxito');
            } else {
                console.error('La publicación especificada no existe');
            }
        } catch (error) {
            console.error('Error al eliminar publicación:', error);
        }
    }

    const handleEliminar = async () => {
        eliminarDeUsuario()
        eliminarDePublicaciones()
        setTimeout(() => {
            window.location.reload();
        }, 300);
    }

    return (
        <div className='flex flex-row justify-between bg-white rounded-lg shadow py-auto items-center content-center px-5 py-2 my-2 text-gray-400 text-sm'>
            <div className='flex flex-col p-2 m-2'>
                <p className='font-bold'>{Titulo} </p>
                <p className='font-bold text-gray-500 mt-1'>Contenido:  <span className='font-light'>({Contenido})</span></p>
            </div>
            <div className='flex  flex-row justify-between '>
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-12'
                    onClick={() => { handleEliminar() }}>Eliminar publicación </button>
            </div>
        </div>
    )
}

export default PublicacionesEmpresa
