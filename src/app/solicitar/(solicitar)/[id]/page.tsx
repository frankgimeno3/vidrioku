'use client'
import { FC, useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar'
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Footer from '@/app/components/Footer';
import { Oferta } from '@/app/components/interfaces/interfaces';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';
import useUserSession from '@/app/components/hooks/userSession';

interface SolicitudProps {
  params: { id: string }
}

const Solicitud: FC<SolicitudProps> = ({ params }) => {
  const router = useRouter();
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);
  const [userObject, setUserObject] = useState<any>();
  const [oferta, setOferta] = useState<Oferta>();
  const [presentacion, setPresentacion] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('id', '==', params.id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setOferta(doc.data() as Oferta);
      });

      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  const addSolicitudAEmpresa = async (empresaId: string, solicitudId: string) => {
    try {
      const docRef = doc(db, "users", empresaId);
      const userDoc = await getDoc(docRef);
      console.log(empresaId);

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

  const addNotificationToUsuario = (notifref: any, notificado: any) => {
    const fetchDoc = async () => {
      if (notificado) {
        const docRef = doc(db, "users", notificado);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const userObjectData = response.data() as any;
          const updatedUnreadNotifications = userObjectData.unreadnotifications
            ? [...userObjectData.unreadnotifications, notifref]
            : [notifref];

          const updatedUserData = {
            unreadnotifications: updatedUnreadNotifications,
          };
          const filteredData = Object.fromEntries(
            Object.entries(updatedUserData).filter(([_, value]) => value !== undefined)
          );

          await setDoc(docRef, {
            ...userObjectData,
            ...filteredData,
          });
        }
      }
    };
    fetchDoc();
  };

  const crearNotificacion = async (notificado: any, solicitudId: any, solicitante: any) => {
    try {
      const notificationssCollection = collection(db, 'notificaciones');
      const newNotificationRef = await addDoc(notificationssCollection, {
        idnotificacion: '',
        content: `El usuario ${solicitante} ha enviado una nueva solicitud para su oferta.`,
        generada: Timestamp.now(),
        redireccion: `/solicitudes/${solicitudId}`,
        tipo: "Nueva Solicitud",
        usuario: notificado,
      });

      await updateDoc(newNotificationRef, { idnotificacion: newNotificationRef.id });

      setTimeout(function () {
        addNotificationToUsuario(newNotificationRef.id, notificado);
      }, 200);

    } catch (error) {
      console.error('Error al crear la conversación en Firestore:', error);
    }
  };

  const addSolicitudInFirebase = async (userId: string, offerId: string, empresa: string, presentacion: string) => {
    try {
      const solicitudesCollection = collection(db, 'solicitudes');
      const newSolicitudRef = await addDoc(solicitudesCollection, {
        offerId: offerId,
        userId: userId,
        presentacion: presentacion
      });
      await updateDoc(newSolicitudRef, { id: newSolicitudRef.id });

      await addSolicitudAEmpresa(empresa, newSolicitudRef.id);
      await addSolicitudAUsuario(userId, offerId);
      await addSolicitudAOferta(offerId, newSolicitudRef.id);
      await crearNotificacion(empresa, newSolicitudRef.id, userObject.nombre);
      router.push('/missolicitudes');
    } catch (error) {
      console.error('Error al crear la oferta en Firestore:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-h-screen bg-zinc-800">
        <div className='flex flex-col mx-12 bg-white'>
          <div className='bg-white flex flex-row w-full h-screen'>
            <div className="flex flex-col bg-gray-50 shadow-lg h-full text-left items-left w-full text-gray-500 py-8 px-24 overflow-scroll">
              <div className="flex flex-col items-center ">
                <Image src={"/inventedlogos/1.png"} alt="pepo" height={100} width={100} />
                <h2 className="my-5 mx-5 text-xl">"{oferta?.titulo}"</h2>
                <div className="flex flex-col text-gray-500  bg-white  my-2 rounded shadow p-5">
                  <div className='mx-5'>
                    <h2 className="my-5   text-xl">Detalles de la oferta</h2>
                    <p className="font-bold text-gray-400 mr-2   ">Cargo:</p>
                    <p>{oferta?.cargo}</p>
                    <div className="flex flex-col mt-5">
                      <p className="font-bold text-gray-400 mr-2 text-md">Ubicación del empleo: </p>
                      <div className="flex flex-wrap flex-1 ">
                        <p>{oferta?.ubicacion}</p>
                        <p>{oferta?.empresa}</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p className="  font-bold text-gray-400">
                        Descripción de la oferta
                      </p>
                      <p className="mt-1">
                        {oferta?.descripcion}
                      </p>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p className="font-bold text-gray-400">
                        Experiencia requerida
                      </p>
                      <div className="mt-1 flex flex-col">
                        {oferta?.experiencia?.map((exp:any, index:any) => (
                          <div key={index} className="py-1 ml-2">
                           ·   {exp}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p className="  font-bold text-gray-400">
                        Tipo de jornada
                      </p>
                      <p className="mt-1">
                        {oferta?.jornada}
                      </p>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p className="  font-bold text-gray-400">
                        Detalles adicionales
                      </p>
                      <p className="mt-1">
                        {oferta?.adicional}
                      </p>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p className="  font-bold text-gray-400">Agrega un mensaje personal</p>
                      <form className=' w-full py-5'>
                        <label htmlFor="presentacion"> </label>
                        <textarea
                          placeholder="Añada aquí una descripción, como carta de presentación que se mostrará a las empresas"
                          className=' rounded shadow w-full h-56 bg-gray-50'
                          onChange={(e) => setPresentacion(e.target.value)} />
                      </form>
                    </div>
                  </div>
                  <button
                    className="p-2 border shadow-lg rounded-lg text-xs mt-1 w-36 mx-auto"
                    onClick={() => {
                      if (userData && typeof userData.id === 'string' && oferta) {
                        addSolicitudInFirebase(userData.id, oferta.id, oferta.empresa, presentacion);
                      } else {
                        console.error('User data is invalid or oferta is not defined');
                      }
                    }}>
                    Enviar solicitud
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Solicitud;
