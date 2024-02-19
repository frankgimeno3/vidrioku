import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'

interface editarRecorridoProps {
    setIsEditarRecorridoSelected: any;
    userData: string;
    experienciaElegida: string;
}

const editarRecorrido: FC<editarRecorridoProps> = ({ setIsEditarRecorridoSelected, userData, experienciaElegida }) => {

    const [nuevoCargo, setNuevoCargo] = useState('');
    const [nuevaEmpresa, setNuevaEmpresa] = useState('');
    const [nuevoDesde, setNuevoDesde] = useState('');
    const [nuevoHasta, setNuevoHasta] = useState('');
    const [nuevoLugar, setNuevoLugar] = useState('');
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');

    const [userDataReceived, setUserDataReceived] = useState('');

    useEffect(() => {
        setUserDataReceived(userData);
    }, [userData]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsEditarRecorridoSelected(false);
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [setIsEditarRecorridoSelected]);

    const añadirExperiencia = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "users", userDataReceived);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const receivedUserData = userDoc.data();
                const experienciasArray = receivedUserData.recorridoLaboral || [];
                const index = experienciasArray.findIndex((experiencia: any) => experiencia.id === experienciaElegida);

                const nuevaExperiencia = {
                    cargo: nuevoCargo,
                    empresa: nuevaEmpresa,
                    desde: nuevoDesde,
                    hasta: nuevoHasta,
                    lugar: nuevoLugar,
                    descripcion: nuevaDescripcion,
                };

                experienciasArray[index] = nuevaExperiencia;

                await setDoc(userRef, { ...receivedUserData, recorridoLaboral: experienciasArray });
            } else {
                console.error('El documento del usuario no existe');
            }
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };


    return (
        <>
            <div className='w-screen bg-black bg-opacity-70' style={{ height: '2500px' }}
                onClick={() => { setIsEditarRecorridoSelected(false) }}>
            </div>
            <div className='flex flex-col bg-white text-gray-500 px-5  mx-auto mt-36 pb-16 border border-gray-50 shadow-xl rounded-md' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>            <div className="flex justify-end py-6 pr-2 ">
                <svg className="h-8 w-8 cursor-pointer text-gray-300 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                    onClick={() => { setIsEditarRecorridoSelected(false) }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
                <div className='px-20'>
                    <p className='text-xl font-medium pb-5'>Añadir experiencia laboral</p>
                    <form className='flex flex-col px-5' onSubmit={(e) => { e.preventDefault(); añadirExperiencia(e); }}>
                        <label> Cargo</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Oficial de 1a' 
                            value={nuevoCargo} onChange={(e) => setNuevoCargo(e.target.value)} />
                        <label> Empresa</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='VIDRIOPERFIL.COM  ' 
                            value={nuevaEmpresa} onChange={(e) => setNuevaEmpresa(e.target.value)} />
                        <label> Desde</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Año de inicio' 
                            value={nuevoDesde} onChange={(e) => setNuevoDesde(e.target.value)} />
                        <label> Hasta</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Año de finalización' 
                            value={nuevoHasta} onChange={(e) => setNuevoHasta(e.target.value)} />
                        <label> Lugar</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Barcelona' 
                            value={nuevoLugar} onChange={(e) => setNuevoLugar(e.target.value)} />
                        <label> Descripción</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='3 años de experiencia como oficial de 1a en línea de doble acristalamiento' 
                            value={nuevaDescripcion} onChange={(e) => setNuevaDescripcion(e.target.value)} />
                        <button type="submit" className='bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow text-gray-500 text-xs'>
                            Añadir
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default editarRecorrido