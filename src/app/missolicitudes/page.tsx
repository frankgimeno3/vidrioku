"use client"
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';

type Solicitud = {
  id: string;
  offerId: string;
  userId: string;};

function misSolicitudes() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const router = useRouter();
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(true);
  const [misSolicitudes, setMisSolicitudes] = useState<Solicitud[]>([]);

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserId(session.data.user.email);
    } else { setUserId("Usuario") }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  
      const solicitudesCollection = collection(db, 'solicitudes');
      const q = query(solicitudesCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const solicitudesData: Solicitud[] = [];
      querySnapshot.forEach((doc) => {
        solicitudesData.push(doc.data() as Solicitud);
      });

      setMisSolicitudes(solicitudesData);
      setLoading(false); // Indicar que la carga ha finalizado
    };

    fetchData();
  }, [userId]);


  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
          <h2 className="   font-bold text-lg   ">Solicitudes enviadas</h2>
          <button className='bg-white rounded-lg px-3 py-1 text-sm text-gray-500'
          onClick={()=>router.push("/dashboard")}>Volver al inicio</button>
        </div>
        <div className="p-5 bg-white bg-opacity-10 ">       
                {misSolicitudes.map((solicitud, index) => (
            <div key={index} className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg'>
              <h3 className='font-medium'>{solicitud.offerId}</h3>
              <h3 className='font-medium'>{solicitud.userId}</h3>
              <p>{solicitud.id}</p>
              <div className='flex flex-row justify-center pt-3'>
              <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Eliminar solicitud</button>
              <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Ver empresa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
      )
}

misSolicitudes.propTypes = {}

export default misSolicitudes
