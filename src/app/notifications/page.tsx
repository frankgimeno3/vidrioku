"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Notificacioncomponent from './components/notificacioncomponent';
import Footer from '../components/Footer';
import Banners from '../components/Banners';

interface User {
  idnotificacion: any
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
  notifications: any;
}


const Notifications: FC = ({ }) => {
  const router = useRouter();
  const [userData, setUserData] = useState('');
  const [user, setUser] = useState<any>();
  const [userUnreadNotifications, setUserUnreadNotifications] = useState<any>()
  const [userReadNotifications, setUserReadNotifications] = useState<any>()
  const [arrayNotificacionesUsuario, setArrayNotificacionesUsuario] = useState<any>([]);
  const [arrayNotificacionesNoLeidas, setArrayNotificacionesNoLeidas] = useState<any>()
  const [arrayNotificacionesLeidas, setArrayNotificacionesLeidas] = useState<any>()
  const [largoNotifNoLeidas, setlargoNotifNoLeidas] = useState<any>()

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
      setUserData('Usuario');
    }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
        }
      }
    };
    fetchDoc();
  }, [userData]);

  useEffect(() => {
    if (user) {
      setUserUnreadNotifications(user.unreadnotifications)
      setUserReadNotifications(user.readnotifications)
    }
  }, [user]);


  useEffect(() => {
    const fetchNotifications = async () => {
      if (userUnreadNotifications && userUnreadNotifications.length > 0 && userUnreadNotifications[0] != "") {
        console.log("userUnreadNotifications", userUnreadNotifications)
        userUnreadNotifications.map(async (notificationId: any) => {
          const docRef = doc(db, "notificaciones", notificationId);
          const response = await getDoc(docRef);
          if (response.exists()) {
            const myNotificationData = response.data() as User;
            // Asegúrate de que prevNotificaciones sea siempre un array
            setArrayNotificacionesNoLeidas((prevNotificaciones: any[]) => {
              // Si prevNotificaciones es undefined o no es un array, inicialízalo como un array vacío
              if (!Array.isArray(prevNotificaciones)) {
                prevNotificaciones = [];
              }
              return [...prevNotificaciones, myNotificationData];
            });
          }
        });
      }
    };
    fetchNotifications();
  }, [userUnreadNotifications]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userReadNotifications && userReadNotifications.length > 0 && userReadNotifications[0] != "") {

        console.log("userReadNotifications", userReadNotifications);
        userReadNotifications.map(async (notificationId: any) => {
          const docRef = doc(db, "notificaciones", notificationId);
          const response = await getDoc(docRef);
          if (response.exists()) {
            const myNotificationData = response.data() as User;
            // Asegúrate de que prevNotificaciones sea siempre un array
            setArrayNotificacionesLeidas((prevNotificaciones: any[]) => {
              // Si prevNotificaciones es undefined o no es un array, inicialízalo como un array vacío
              if (!Array.isArray(prevNotificaciones)) {
                prevNotificaciones = [];
              }
              return [...prevNotificaciones, myNotificationData];
            });
          }
        });
      }
    };
    fetchNotifications();
  }, [userReadNotifications]);

  useEffect(() => {
    setlargoNotifNoLeidas
  }, [userUnreadNotifications]);
  return (
    <>
      <Navbar />

      <div className='flex flex-row w-full h-full justify-between bg-white bg-opacity-90'>
        <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-600 w-full ">
          <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Notificaciones</h2>
          <div className='flex flex-col '>
            <div className="  mx-24  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-6">
              <h2 className='mt-2 text-md text-center px-8 py-5'>Tienes <span className='font-bold'>{largoNotifNoLeidas || 0}</span> notificaciones nuevas</h2>

              {arrayNotificacionesNoLeidas && arrayNotificacionesNoLeidas.map((notificacion: any, index: number) => (
                <Notificacioncomponent
                  key={index}
                  idnotificacion={notificacion.idnotificacion}
                  tipo={notificacion.tipo}
                  redireccion={notificacion.redireccion}
                  content={notificacion.content}
                  estado={notificacion.estado}
                />
              ))}

            </div>
            <div className="  mx-24  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-6">
              <h2 className='mt-2 text-md text-center px-8 py-5'>Notificaciones anteriores</h2>

              {arrayNotificacionesLeidas && arrayNotificacionesLeidas.map((notificacion: any, index: number) => (
                <Notificacioncomponent
                  key={index}
                  idnotificacion={notificacion.idnotificacion}
                  tipo={notificacion.tipo}
                  redireccion={notificacion.redireccion}
                  content={notificacion.content}
                  estado={notificacion.estado}
                />
              ))}
            </div>
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

export default Notifications;