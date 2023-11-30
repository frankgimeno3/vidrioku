"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { signOut, useSession } from 'next-auth/react';

import ChatList from "./components/ChatList"
import Chatcontent from "./components/Chatcontent"
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
  conversations: any
}
const Mensajes: FC = ({ }) => {
  const router = useRouter();
  const [userData, setUserData] = useState('');
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState()

  const [conversationChosen, setConversationChosen] = useState()

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

  //obtenemos datos de nuestro usuario
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
    const fetchDoc = async () => {
      if (user) {
        setUserId(user.id)
      }
    };

    fetchDoc();
  }, [user]);


  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Mensajes</h2>
        <div className='flex flex-row min-h-screen'>
          <ChatList user={user || undefined} setConversationChosen={setConversationChosen} 
          />

          <Chatcontent  />

        </div>
      </div>
    </>
  );
};

export default Mensajes;