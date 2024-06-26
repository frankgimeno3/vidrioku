"use client"
import { FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import Link from 'next/link';
import Footer from '../components/Footer';
import Banners from '../components/Banners';
import { Oferta } from '../components/interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';
import useUserSession from '../components/hooks/userSession';

const Misofertas: FC = () => {
  const router = useRouter();
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  
   const [loading, setLoading] = useState(true);
  const [misOfertas, setMisOfertas] = useState<Oferta[]>([]);

  
 

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

  if (loading) {
    return <p>Cargando ofertas...</p>;
  }

  const nuevaofertahandler = () => {
    router.push("/crearoferta")
  }

  const ofertasActivas = misOfertas.filter(oferta => oferta.estado === 'activa');
  const ofertasInactivas = misOfertas.filter(oferta => oferta.estado === 'inactiva');



  return (
    <>
      <Navbar />
      <div className='flex flex-row w-full h-full justify-between bg-white bg-opacity-90'>

        <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 w-full">
          <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
            <h2 className="   font-bold text-lg   ">Mis Ofertas</h2>
          </div>
          <div className="p-5 bg-white bg-opacity-10 ">
            <div className='flex flex-row justify-between mx-56 '>
              <h2 className=''>Ofertas activas</h2>
              <button className='bg-white rounded-lg px-3 py-1 text-sm text-gray-500'
                onClick={nuevaofertahandler}>Crear nueva oferta</button>
            </div>
            {ofertasActivas.length > 0 ? (
              ofertasActivas.map((oferta, index) => (
                <div key={index} className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg'>
                  <h3 className='font-medium'>{oferta.titulo}</h3>
                  <p>{oferta.cargo}</p>
                  <p>Id de la oferta: {oferta.id}</p>
                  <div className='flex flex-row justify-center pt-3'>
                    <Link href={`/misofertas/editar/${oferta.id}`}>
                      <button className='shadow px-2 h-8 mr-2 bg-gray-50 text-sm rounded-lg'>Editar oferta</button>
                    </Link>
                    <Link href={`/solicitudes/${oferta.id}`}>
                      <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Ver solicitudes de la oferta</button>
                    </Link>
                    <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Desactivar oferta</button>
                    <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Eliminar oferta</button>
                  </div>
                </div>
              ))
            ) : (
              <div className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg '>
                <p className='p-12'>No hay ofertas activas</p>
              </div>)}
          </div>

          <div className="p-5 bg-white bg-opacity-10 ">
            <h2 className='ml-56'>Ofertas inactivas</h2>
            {ofertasInactivas.length > 0 ? (
              ofertasInactivas.map((oferta, index) => (
                <div key={index} className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg'>
                  <h3 className='font-medium'>{oferta.titulo}</h3>
                  <p>{oferta.cargo}</p>
                  <div className='flex flex-row justify-center pt-3'>
                    <button className='shadow px-2 h-8 mr-2 bg-gray-50 text-sm rounded-lg'>Reactivar oferta</button>
                    <Link href={`/misofertas`}>
                      <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Ver solicitudes de la oferta</button>
                    </Link>
                    <button className='shadow px-2 h-8 ml-2 bg-gray-50 text-sm rounded-lg'>Eliminar oferta</button>

                  </div>
                </div>
              ))
            ) : (
              <div className='my-2 bg-white text-gray-800 p-3 mx-56 text-center rounded-lg '>
                <p className='p-12'>No hay ofertas inactivas</p>
              </div>

            )}
          </div>
        </div>

        <div className='h-full bg-white bg-opacity-5'>
          <Banners widthProp={250} />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Misofertas;