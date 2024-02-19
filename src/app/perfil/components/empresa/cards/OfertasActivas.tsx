import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useRouter } from 'next/navigation';

interface OfertasActivasProps {
    OfertaId: any;
    Estado: any;
    Cargo: any;
    Titulo: any;
    Jornada: string;
    userData: any;
}


const OfertasActivas: FC<OfertasActivasProps> = ({ OfertaId, Estado, Cargo, Titulo, Jornada, userData }) => {
    const [userDataReceived, setUserDataReceived] = useState('');
    const router = useRouter()

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    const handleMostrar = () => {
        router.push(`/misofertas/editar/${OfertaId}`)
    }

    const eliminarDeUsuario = async () => {
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const ofertasArray = receivedUserData.ofertasCreadas || [];

                const index = ofertasArray.findIndex((oferta: any) => oferta === OfertaId);

                if (index !== -1) {
                    ofertasArray.splice(index, 1);
                    await setDoc(userRef, { ...receivedUserData, ofertascreadas: ofertasArray });
                } else {
                    console.error('La oferta especificada no se encontró en el array de ofertas');
                }
            } else {
                console.error('El documento del usuario no existe');
            }
        } catch (error) {
            console.error('Error al eliminar oferta:', error);
        }
    }

    const eliminarDeOfertas = async () => {
        try {
            const ofertaRef = doc(db, "ofertas", OfertaId);
            const ofertaDoc = await getDoc(ofertaRef);

            if (ofertaDoc.exists()) {
                await deleteDoc(ofertaRef);
                console.log('Oferta eliminada con éxito');
            } else {
                console.error('La oferta especificada no existe');
            }
        } catch (error) {
            console.error('Error al eliminar oferta:', error);
        }
    }

    const handleEliminar = async () => {
        eliminarDeUsuario()
        eliminarDeOfertas()
        setTimeout(() => {
            window.location.reload();
        }, 300);
    }

    return (
        <>
            {
                Estado == 'activa' &&
                <div className='flex flex-row justify-between bg-white rounded-lg shadow py-auto items-center content-center px-5 py-2 my-2 text-gray-400 text-sm'>
                    <div className='flex flex-col p-1'>
                        <p className='font-bold'>{Titulo} </p>
                        <p className='font-bold text-gray-500 '> Cargo: <span className='font-light'>{Cargo}</span></p>
                        <p className='font-bold text-gray-500 '> Jornada: <span className='font-light'>{Jornada}</span></p>
                    </div>
                    <div className='flex  flex-row justify-between '>
                        <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mx-3'
                            onClick={() => { handleMostrar() }}>Mostrar </button>
                        <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'
                            onClick={() => { handleEliminar() }}>Eliminar </button>
                    </div>
                </div>
            }
        </>
    )
}

export default OfertasActivas
