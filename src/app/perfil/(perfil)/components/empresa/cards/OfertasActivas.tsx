import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface OfertasActivasProps {
    Idioma: any;
    IdiomaId:any;
    Nivel: any;
    setIsEditarIdiomasSelected: any;
    setIdiomaElegido: any;
    userData: string;
}


const OfertasActivas: FC<OfertasActivasProps> = ({ Idioma, IdiomaId, Nivel, setIsEditarIdiomasSelected, setIdiomaElegido, userData }) => {
    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    const handleEditar = () => {
        setIsEditarIdiomasSelected(true)
        setIdiomaElegido(IdiomaId)
    }

    const handleEliminar = async () => {
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const idiomasArray = receivedUserData.idiomas || [];

                const index = idiomasArray.findIndex((idioma: any) => idioma.id === IdiomaId);

                if (index !== -1) {
                    idiomasArray.splice(index, 1);  
                    await setDoc(userRef, { ...receivedUserData, idiomas: idiomasArray });
                } else {
                    console.error('El idioma especificado no se encontró en el array de idiomas');
                }
            } else {
                console.error('El documento del usuario no existe');
            }
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (error) {
            console.error('Error al editar el idioma:', error);
        }
    }

    return (
        <div className='flex flex-row justify-between bg-white rounded-lg shadow py-auto items-center content-center px-5 py-2 my-2 text-gray-400 text-sm'>
            <p className='font-bold'>{Idioma} <span className='font-light'>({Nivel})</span></p>
            <div className='flex  flex-row justify-between '>
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mx-3'
                    onClick={() => { handleEditar() }}>Editar </button>
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'
                    onClick={() => { handleEliminar() }}>Eliminar </button>
            </div>
        </div>
    )
}

export default OfertasActivas
