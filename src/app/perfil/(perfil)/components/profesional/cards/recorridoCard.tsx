import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface recorridoCardProps {
    RecorridoId:any;
    Cargo: any;
    Empresa: any;
    Desde: any;
    Hasta: any;
    Lugar: any;
    Descripcion: any;
    userData:string;
    setIsEditarRecorridoSelected: any;
    setExperienciaElegida: any;
}


const recorridoCard: FC<recorridoCardProps> = ({ RecorridoId, Cargo, Empresa, Desde, Hasta, Lugar, Descripcion, userData, setIsEditarRecorridoSelected, setExperienciaElegida }) => {
    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    const handleEditar = () => {
        setIsEditarRecorridoSelected(true)
        setExperienciaElegida(RecorridoId)
    }

    const handleEliminar = async () => {
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const experienciasArray = receivedUserData.recorridoLaboral || [];

                const index = experienciasArray.findIndex((experiencia: any) => experiencia.id === RecorridoId);

                if (index !== -1) {
                    experienciasArray.splice(index, 1);  
                    await setDoc(userRef, { ...receivedUserData, recorridoLaboral: experienciasArray });
                } else {
                    console.error('La experiencia que busca no se encontró en el array de experiencias');
                }
            } else {
                console.error('El documento del usuario no existe');
            }
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (error) {
            console.error('Error al editar el recorrido:', error);
        }
    }


    return (
        <div className='flex flex-col bg-white rounded-lg shadow py-1 my-2 text-gray-400 text-sm'>
            <div className='flex  flex-row justify-between content-end	 mx-5 my-3'>
                <p className='font-bold pt-2 '>{Cargo} <span className='font-light'> en </span> {Empresa} <span className='font-light'>, ({Lugar})</span></p>
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

export default recorridoCard