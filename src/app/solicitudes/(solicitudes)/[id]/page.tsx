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
    const [isOfertaClicked, setIsOfertaClicked] = useState(false)
    const [isPerfilClicked, setIsPerfilClicked] = useState(false)
    const [isSolicitudClicked, setIsSolicitudClicked] = useState(false)
    
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

    const toggleDetallesOferta = ()=>{
        setIsOfertaClicked(!isOfertaClicked)
    }

    const toggleDetallesPerfil = ()=>{
        setIsPerfilClicked(!isPerfilClicked)
    }

    const toggleDetallesSolicitud = ()=>{
        setIsSolicitudClicked(!isSolicitudClicked)
    }

    return (
        <>
            <Navbar />

            <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
                <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
                    <h2 className="font-bold text-lg text-center mx-auto">Detalles de la solicitud</h2>
                </div>
                <div className="flex flex-col p-5 bg-white bg-opacity-10 text-center">        
                
                    <p className='py-5'>Número de solicitud {params.id}</p>

                    <button className='py-5' onClick={toggleDetallesOferta}>Oferta a la que pertenece</button>
                        {isOfertaClicked && <DetallesOferta/>}
                    <button className='py-5' onClick={toggleDetallesPerfil}>Detalles del profesional</button>
                        {isPerfilClicked && <DetallesPerfil/>}
                    <button className='py-5' onClick={toggleDetallesSolicitud}>Detalles de la solicitud</button>
                        {isSolicitudClicked && <DetallesSolicitud />}
                    <button className='bg-white px-4 py-2 rounded text-xs text-gray-500 shadow w-56 mx-auto'>
                        Conectar con el profesional</button>
                </div>
            </div>
        </>
    )
}
export default solicitudseleccionada
 