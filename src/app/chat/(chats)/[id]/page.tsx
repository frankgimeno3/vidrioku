"use client"
import Navbar from '@/app/components/Navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import ChatList from './components/ChatList';
import Chatcontent from './components/Chatcontent';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Banners from '@/app/components/Banners';
import Footer from '@/app/components/Footer';

interface selectedChatProps {
  params: { id: string }
}

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


const SelectedChat: FC<selectedChatProps> = ({ params }) => {
  const [userData, setUserData] = useState('');
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState()
  const [paramsId, setParamsId] = useState<any>()

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
    setParamsId(params.id)
  }, [params]);

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



  return (
    <div className='h-screen'>
      <Navbar />
      <div className="flex flex-col h-full  bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Mensajes</h2>
        <div className='flex flex-row min-h-screen'>
          <ChatList user={user} paramsId={paramsId} />
          <Chatcontent user={user} conversationChosen={params.id} />
          <div className='h-full bg-white bg-opacity-5 hidden md:block '>
            <Banners widthProp={200} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectedChat