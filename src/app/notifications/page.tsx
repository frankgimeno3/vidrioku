"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
  
interface User {
  id: any
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
  notifications:any;
}


const Notifications: FC = ({ }) => {
  const router = useRouter();
  const [userData, setUserData] = useState('');
  const [user, setUser] = useState<any>();
  const [userNotifications, setUserNotifications] = useState<any>()
  const [arrayNotificacionesUsuario, setArrayNotificacionesUsuario] = useState<any>([]);

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
    if(user){
      setUserNotifications(user.notifications)
    }
  }, [user]);

  useEffect(() => {
    console.log("userNotifications: ", userNotifications)
    const fetchNotifications = async () => {
      if (userNotifications && userNotifications.length > 0) {
        const notificationsData = await Promise.all(
          userNotifications.map(async (notificationId: any) => {
            const docRef = doc(db, "notificaciones", notificationId);
            const response = await getDoc(docRef);
            return response.exists() ? response.data() : null;
          })
        );
          setArrayNotificacionesUsuario(notificationsData.filter(Boolean));
      }
    };
    fetchNotifications();
  }, [userNotifications]);


  return (
    <>
      <Navbar  />

    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Notificaciones</h2>
        <div className='flex flex-col '>
          <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-6">
            <h2 className='mt-2 text-md text-center px-8 pt-5'>Tienes <span className='font-bold'>4</span> notificaciones nuevas</h2>

            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Mensaje</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>La empresa
                <span className='font-bold'> VIDRIOPERFIL </span>le ha enviado un mensaje </h2>
            </div>

            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Oportunidad</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>Hay
                <span className='font-bold'> 3 </span>nuevas ofertas de trabajo, que encajan con tu perfil en Barcelona </h2>
            </div>
            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Seguimientos</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>La empresa
                <span className='font-bold'> GLASTON </span> ha publicado 3 nuevas ofertas de empleo</h2>
            </div>
            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Mensaje</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>El usuario
                <span className='font-bold'> Alex Gimeno </span>le ha enviado un mensaje </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;