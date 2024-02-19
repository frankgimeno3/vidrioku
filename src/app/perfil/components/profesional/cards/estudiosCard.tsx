import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface estudiosCardProps {
    EstudioId:any;
    Concepto: any;
    Descripcion: any;
    Desde: any;
    Hasta: any;
    Entidad: any;
    userData:string;
    setIsEditarEstudiosSelected: any;
    setEstudioElegido: any;
}


const estudiosCard: FC<estudiosCardProps> = ({ EstudioId, Concepto, Descripcion, Desde, Hasta, Entidad, userData, setIsEditarEstudiosSelected, setEstudioElegido}) => {
    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    const handleEditar = () => {
        setIsEditarEstudiosSelected(true)
        setEstudioElegido(EstudioId)
    }

    const handleEliminar = async () => {
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const estudiosArray = receivedUserData.estudios || [];

                const index = estudiosArray.findIndex((estudio: any) => estudio.id === EstudioId);

                if (index !== -1) {
                    estudiosArray.splice(index, 1);  
                    await setDoc(userRef, { ...receivedUserData, estudios: estudiosArray });
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
        <div className='flex flex-col bg-white rounded-lg shadow     my-2 text-gray-400 text-sm'>
        <div className='flex  flex-row justify-between content-end	 mx-5 mt-5'>
            <p className='font-bold  '>{Concepto} <span className='font-light'> en </span> {Entidad} </p>
            <div>
                <button className='bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mx-3'
                onClick={()=>{handleEditar()}}>Editar </button>
                <button className='bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'
                onClick={()=>{handleEliminar()}}>Eliminar </button>
            </div>
        </div>
        <div className='flex flex-col  mx-3 mb-3 '>
                <div className='flex flex-row'>
                     <p className='pl-5 italic'>{Descripcion}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='pl-5'>Desde:  </p>
                    <p className='pl-5'>{Desde}</p>
                    <p className='px-4 pl-5'>-</p>
                    <p className='pl-5'>Hasta:  </p>
                    <p className='pl-5'>{Hasta}</p>
                </div>
 
            </div>
        </div>

    )
}

export default estudiosCard