"use client"
import Navbar from '@/app/components/Navbar';
import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'
import DetallesOferta from './components/DetallesOferta';
import DetallesPerfil from './components/DetallesPerfil';
import DetallesSolicitud from './components/DetallesSolicitud';

type solicitudProps = {
    titulo: string,
    cargo: string,
    jornada: string,
    tipoubi: string,
    ubicacion: string,
    descripcion: string,
    experiencia: string,
    adicional: string,
    empresa: string,
    estado: string,
    id: any
};
interface SolicitudesProps {
    params: { id: string }
}
const solicitudseleccionada: FC<SolicitudesProps> = ({ params }) => {

    const [solicitud, setSolicitud] = useState<solicitudProps>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const solicitudesCollection = collection(db, 'solicitudes');
            const q = query(solicitudesCollection, where('id', '==', params.id));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setSolicitud(doc.data() as solicitudProps);
            });

            setLoading(false);
        };

        fetchData();
    }, [params.id]);


    return (
        <>
            <Navbar />

            <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
                <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
                    <h2 className="font-bold text-lg">Detalles de la solicitud</h2>
                </div>
                <div className="p-5 bg-white bg-opacity-10 ">        
                
                    <p>Número de solicitud {params.id}</p>

                    <p>Oferta a la que pertenece</p>
                        <DetallesOferta/>
                    <p>Detalles del profesional</p>
                        <DetallesPerfil/>
                    <p>Detalles de la solicitud</p>
                        <DetallesSolicitud />
                    <button className='bg-white px-4 py-2 rounded text-xs text-gray-500 shadow'>
                        Conectar con el profesional</button>
                </div>
            </div>
        </>
    )
}
export default solicitudseleccionada
 