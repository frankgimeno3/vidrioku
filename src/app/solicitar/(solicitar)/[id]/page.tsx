"use client"
import { FC, useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface SolicitudProps {
  params: { id: string }
}

type OfertaProps = {
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

const Solicitud: FC<SolicitudProps> = ({ params }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [oferta, setOferta] = useState<OfertaProps>();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserId(session.data.user.email);
    } else { setUserId("Usuario") }
  }, [session?.data?.user?.email]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('id', '==', params.id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setOferta(doc.data() as OfertaProps);  
      });

      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  const handleSolicitud = async (userId: string, offerId: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.solicitudes && Array.isArray(userData.solicitudes)) {
          await setDoc(docRef, {
            ...userData,
            solicitudes: [...userData.solicitudes, offerId],
          });
        } else {
          await setDoc(docRef, {
            ...userData,
            solicitudes: [offerId],
          });
          router.push("/missolicitudes")
        }
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col  max-h-screen bg-zinc-800 ">

        <div className='flex flex-col   mx-12 bg-white '>
          <div className='bg-white flex flex-row w-full h-screen'>
            <div className="flex flex-col bg-gray-50 shadow-lg h-full text-center items-center w-full text-gray-500 py-8 px-24 overflow-scroll">
              <Image src={"/inventedlogos/1.png"} alt="pepo" height={100} width={100} />
              <h2 className="mt-5 text-xl">{oferta?.titulo}</h2>
              <div className="flex flex-col text-sm text-gray-500">
                <p>{oferta?.cargo}</p>
                <p>{oferta?.empresa}</p>
                <p>{oferta?.ubicacion}</p>
              </div>
              <p className="text-sm mt-5">
                Descripción de la oferta
              </p>
              <p className="text-sm mt-1">
                {oferta?.descripcion}
              </p>
              <p className="text-sm mt-5">
                Requerimientos
              </p>
              <p className="text-sm mt-1">
                {oferta?.experiencia}
              </p>
              <p className="text-sm mt-5">
                Tipo de jornada
              </p>
              <p className="text-sm mt-1">
                {oferta?.jornada}
              </p>
              <p className="text-sm mt-5">
                Detalles adicionales
              </p>
              <p className="text-sm mt-1">
                {oferta?.adicional}
              </p>
              <button
                className="p-2 border shadow-lg rounded-lg text-xs mt-5"
                onClick={() => handleSolicitud(userId, oferta?.id)}>
                Enviar solicitud
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
    ;
}
export default Solicitud;    