import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface AnadirEstudiosProps {
    setIsEstudiosSelected: React.Dispatch<React.SetStateAction<boolean>>;
    userData: string;
}

const AnadirEstudios: FC<AnadirEstudiosProps> = ({ setIsEstudiosSelected, userData }) => {

    const [nuevoConcepto, setNuevoConcepto] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoDesde, setNuevoDesde] = useState('');
    const [nuevoHasta, setNuevoHasta] = useState('');
    const [nuevaEntidad, setNuevaEntidad] = useState('');
    
    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);


    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsEstudiosSelected(false);
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [setIsEstudiosSelected]);

    const añadirEstudios = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const estudiosArray = userData.estudios || []; // Si no hay estudios aún, inicializa el array como vacío
    
                const nuevoEstudio = {
                    concepto: nuevoConcepto,
                    descripcion: nuevaDescripcion,
                    desde: nuevoDesde,
                    hasta: nuevoHasta,
                    entidadEmisora: nuevaEntidad,
                };
    
                estudiosArray.push(nuevoEstudio); // Agregar el nuevo estudio al array
    
                await setDoc(userRef, { ...userData, estudios: estudiosArray }); // Actualizar el documento del usuario con el nuevo array de estudios
            } else {
                console.error('El documento del usuario no existe');
            }
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };

    return (
        <>
            <div className='w-screen bg-black bg-opacity-70' style={{ height: '2500px' }}
                onClick={() => { setIsEstudiosSelected(false) }}>
            </div>
            <div className='flex flex-col bg-white text-gray-500 px-5  mx-auto mt-36 pb-16 border border-gray-50 shadow-xl rounded-md' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="flex justify-end py-6 pr-2 ">
                    <svg className="h-8 w-8 cursor-pointer text-gray-300 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                        onClick={() => { setIsEstudiosSelected(false) }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className='px-20'>
                    <p className='text-xl font-medium pb-5'>Añadir estudios, títulos, certificados o reconocimientos</p>
                    <form className='flex flex-col px-5' onSubmit={(e) => { e.preventDefault(); añadirEstudios(e); }}>
                        <label> Concepto</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Grado superior en electromecánica' value={nuevoConcepto} onChange={(e) => setNuevoConcepto(e.target.value)} />
                        <label> Descripción</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='(opcional)' value={nuevaDescripcion} onChange={(e) => setNuevaDescripcion(e.target.value)} />
                        <label> Desde</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Año de inicio' value={nuevoDesde} onChange={(e) => setNuevoDesde(e.target.value)} />
                        <label> Hasta</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Año de finalización' value={nuevoHasta} onChange={(e) => setNuevoHasta(e.target.value)} />
                        <label> Entidad emisora</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='UPC - Universitat Politecnica Catalunya' value={nuevaEntidad} onChange={(e) => setNuevaEntidad(e.target.value)} />

                        <button type="submit" className='bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AnadirEstudios;
