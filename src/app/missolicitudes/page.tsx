import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function misSolicitudes() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserId(session.data.user.email);
    } else { setUserId("Usuario") }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Indicar que se está cargando

      const solicitudesCollection = collection(db, 'solicitudes');
      const q = query(solicitudesCollection, where('empresa', '==', userId));
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
    <div>
      <h3>Solicitudes enviadas</h3>
                {misSolicitudes.map((solicitud, index) => (
            <div key={index} className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg'>
              <h3 className='font-medium'>{solicitud.titulo}</h3>
              <p>{solicitud.cargo}</p>
              <div className='flex flex-row justify-center pt-3'>
              <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Eliminar solicitud</button>
              <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Ver empresa</button>
              </div>
            </div>
          ))}
    </div>
  )
}

misSolicitudes.propTypes = {}

export default misSolicitudes
