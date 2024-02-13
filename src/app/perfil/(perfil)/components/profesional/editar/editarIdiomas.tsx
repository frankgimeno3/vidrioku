import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'

interface editarIdiomasProps {
    setIsEditarIdiomasSelected: any;
    userData: string;
    idiomaElegido: string;
}

const editarIdiomas: FC<editarIdiomasProps> = ({ setIsEditarIdiomasSelected, userData, idiomaElegido }) => {

    const [nuevoNivel, setNuevoNivel] = useState('');

    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsEditarIdiomasSelected(false);
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [setIsEditarIdiomasSelected]);

    const editarIdioma = async () => {
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const idiomasArray = receivedUserData.idiomas || [];

                // Buscar el índice del idioma que coincide con el nombre proporcionado
                const index = idiomasArray.findIndex((idioma: any) => idioma.idioma === idiomaElegido);

                if (index !== -1) {
                    // Actualizar el nivel del idioma en el array
                    idiomasArray[index].nivel = nuevoNivel;

                    // Actualizar el documento en Firestore
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
    };

    return (
        <>
            <div className='w-screen bg-black bg-opacity-70' style={{ height: '2500px' }}
                onClick={() => { setIsEditarIdiomasSelected(false) }}>
            </div>
            <div className='flex flex-col bg-white text-gray-500 px-5  mx-auto mt-36 pb-16 border border-gray-50 shadow-xl rounded-md' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>    <div className="flex justify-end py-6 pr-2 ">
                <svg className="h-8 w-8 cursor-pointer text-gray-300 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                    onClick={() => { setIsEditarIdiomasSelected(false) }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
                <div className='px-20'>
                    <p className='text-xl font-medium pb-5'>Editar idioma</p>
                    <form className='flex flex-col px-5' onSubmit={(e) => { e.preventDefault(); editarIdioma(); }}>
                        <label> Nuevo nivel para {idiomaElegido}</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='C1 - Avanzado' value={nuevoNivel} onChange={(e) => setNuevoNivel(e.target.value)} />
                        <button type="submit" className='bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow text-gray-500 text-xs'>
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default editarIdiomas
