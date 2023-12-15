"use client"
import { FC, useEffect, useState } from 'react';
import Navbar from '../../../../components/Navbar'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface EditarOfertaProps {
  params: { id: string }
}

type OfertaObject = {
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

const EditarOferta: FC<EditarOfertaProps> = ({ params }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [oferta, setOferta] = useState<OfertaObject>();
  const [presentacion, setPresentacion] =  useState("")
  //primero detectamos el usuario, registramos su id, y de paso bloqueamos la ruta
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

  //luego, mostramos la oferta que conocemos por los params
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('id', '==', params.id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setOferta(doc.data() as OfertaObject);
      });

      setLoading(false);
    };

    fetchData();
  }, [params.id]);


  // 1-creamos funcion que añade solicitud a empresa
  const addSolicitudAEmpresa = async (empresaId: string, solicitudId: string) => {
    try {
      const docRef = doc(db, "users", empresaId);
      const userDoc = await getDoc(docRef);
      console.log(empresaId)

      if (userDoc.exists()) {
        const empresaSelected = userDoc.data();

        if (empresaSelected.solicitudes && Array.isArray(empresaSelected.solicitudes)) {
          await setDoc(docRef, {
            ...empresaSelected,
            solicitudes: [...empresaSelected.solicitudes, solicitudId],
          });
        } else {
          await setDoc(docRef, {
            ...empresaSelected,
            solicitudes: [solicitudId],
          });
        }
      } else {
        console.error('No se encontró la empresa');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud a la empresa:', error);
    }
  };

  // 2- creamos funcion que vincula al usuario la oferta a la que ha solicitado
  const addSolicitudAUsuario = async (userId: string, offerId: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.ofertasSolicitadas && Array.isArray(userData.ofertasSolicitadas)) {
          await setDoc(docRef, {
            ...userData,
            ofertasSolicitadas: [...userData.ofertasSolicitadas, offerId],
          });
        } else {
          await setDoc(docRef, {
            ...userData,
            ofertasSolicitadas: [offerId],
          });
         }
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
    }
  };
  //  3-creamos funcion que añade solicitud a OFERTA

  const addSolicitudAOferta = async (offerId: string, solicitudId: string) => {
    try {
      const docRef = doc(db, "ofertas", offerId);
      const offerDoc = await getDoc(docRef);

      if (offerDoc.exists()) {
        const offerData = offerDoc.data();

        if (offerData.solicitudes && Array.isArray(offerData.solicitudes)) {
          await setDoc(docRef, {
            ...offerData,
            solicitudes: [...offerData.solicitudes, solicitudId],
          });
        } else {
          await setDoc(docRef, {
            ...offerData,
            solicitudes: [solicitudId],
          });
         }
      } else {
        console.error('La oferta no existe');
      }
    } catch (error) {
      console.error('Error al añadir solicitud a oferta:', error);
    }
  };
  //  3-creamos funcion que añade solicitud a firebase, aunandolo todo  
  const addSolicitudInFirebase = async (userId: string, offerId: string, empresa: string, presentacion:string) => {
    try {
      const solicitudesCollection = collection(db, 'solicitudes');
      const newSolicitudRef = await addDoc(solicitudesCollection, {
        offerId: offerId,
        userId: userId,
        presentacion: presentacion
      });
      await updateDoc(newSolicitudRef, { id: newSolicitudRef.id });

      addSolicitudAEmpresa(empresa, newSolicitudRef.id)
      addSolicitudAUsuario(userId, offerId)
      addSolicitudAOferta(offerId, newSolicitudRef.id)
      router.push('/missolicitudes');
    } catch (error) {
      console.error('Error al crear la oferta en Firestore:', error);
    }

  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col  max-h-screen bg-zinc-800 ">

        <div className='flex flex-col   mx-12 bg-white '>
          <div className='bg-white flex flex-row w-full h-screen '>
            <div className="flex  flex-col bg-gray-50 shadow-lg h-full text-center items-center w-full text-gray-500 py-8 px-24 overflow-scroll">
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

              <form className='mt-5   w-full'>
                <h2>Agrega un mensaje personal</h2>
                <label htmlFor="presentacion"> </label>
                <textarea
                placeholder="Añada aquí una descripción, como carta de presentación que se mostrará a las empresas" 
                className='m-5 rounded shadow     w-96 h-56 bg-gray-50'
                onChange={(e) => setPresentacion(e.target.value)} />
              </form>
              <button
                className="p-2 border shadow-lg rounded-lg text-xs mt-1"
                onClick={() => oferta && addSolicitudInFirebase(userId, oferta.id, oferta.empresa, presentacion)}>
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
export default EditarOferta;    