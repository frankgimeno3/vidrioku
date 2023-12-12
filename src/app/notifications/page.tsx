"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Notificacioncomponent from './components/notificacioncomponent';

interface User {
  id: any
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
  const [userNotifications, setUserNotifications] = useState<any>()
  const [arrayNotificacionesUsuario, setArrayNotificacionesUsuario] = useState<any>([]);
  const [arrayNotifOrdenado, setArrayNotifOrdenado] = useState<any>()

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
      setUserNotifications(user.notifications)
    }
  }, [user]);

 
    useEffect(() => {
      const fetchNotifications = async () => {
        if (userNotifications && userNotifications.length > 0) {
          userNotifications.map(async (notificationId: any) => {
            const docRef = doc(db, "notificaciones", notificationId);
            const response = await getDoc(docRef);
            if (response.exists()) {
              const myNotificationData = response.data() as User;
              // Actualizamos el estado agregando el nuevo elemento al final del array existente
              setArrayNotificacionesUsuario((prevNotificaciones: any) => [...prevNotificaciones, myNotificationData]);
            }
          });
        }
      };
      fetchNotifications();
    }, [userNotifications]);
 
  useEffect(() => {
    console.log("arrayNotificacionesUsuario: ", arrayNotificacionesUsuario)
  }, [arrayNotificacionesUsuario]);


  return (
    <>
      <Navbar />

      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Notificaciones</h2>
        <div className='flex flex-col '>
          <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-6">
            <h2 className='mt-2 text-md text-center px-8 pt-5'>Tienes <span className='font-bold'>{arrayNotificacionesUsuario.length}</span> notificaciones nuevas</h2>

            {arrayNotificacionesUsuario.map((notificacion:any) => (
              <Notificacioncomponent 
                key={notificacion.id}
                id={notificacion.id}  
                tipo={notificacion.tipo} 
                redireccion={notificacion.redireccion}
                content={notificacion.content} 
                estado={notificacion.estado}
              />
            ))}
 
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;