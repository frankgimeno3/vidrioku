"use client"
import Navbar from '@/app/components/Navbar';
import { db } from '@/app/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Oferta = {
  titulo: string;
  cargo: string;
  solicitudes:any;
};

function page() {
  const [misOfertas, setMisOfertas] = useState<Oferta[]>([]);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {
      setUserData("Usuario");
    }
  }, [session]);


  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 

      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('empresa', '==', userData));
      const querySnapshot = await getDocs(q);

      const offersData: Oferta[] = [];
      querySnapshot.forEach((doc) => {
        offersData.push(doc.data() as Oferta);
      });

      setMisOfertas(offersData);
      setLoading(false);  
    };

    fetchData();
  }, [userData]);

  
  return (
    <>
    <Navbar />

    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
      <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
        <h2 className="font-bold text-lg">Solicitudes nuevas</h2>
      </div>
      <div className="p-5 bg-white bg-opacity-10 ">
        <h2 className='ml-56'>Ofertas con solicitudes</h2>
        {misOfertas
          .filter((oferta) => oferta.solicitudes && oferta.solicitudes.length > 0)  
          .map((oferta, index) => (
            <div key={index} className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg'>
              <h3 className='font-medium'>{oferta.titulo}</h3>
              <p>{oferta.cargo}</p>
              <p className='font-bold'>Solicitudes de la oferta</p>

              <ul>
              {oferta.solicitudes.map((solicitudId: any, solicitudIndex: any) => (
                 <li 
                  className="bg-gray-200 mb-1 p-2"
                  key={solicitudIndex}>
                    <p>{solicitudId}</p>
                    <Link href={`/solicitudes/${solicitudId}`}>
                    <button className='bg-white rounded px-4 py-1 '>Ver detalles</button>
                    </Link>
                  </li>
              ))}
            </ul>
            </div>
          ))}
      </div>
    </div>
  </>
);
 }
 
export default page 

