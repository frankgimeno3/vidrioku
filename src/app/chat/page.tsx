"use client"
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import ChatList from "./components/ChatList"
import Chatcontent from "./components/Chatcontent"
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import Banners from '../components/Banners';
import { updateUser, selectUser } from '@/redux/features/userSlice';
import { Providers } from '@/redux/provider';

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

const Chat: FC = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState('');
  const user = useSelector(selectUser); 

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
          dispatch(updateUser(myUserData));
        }
      }
    };
    fetchDoc();
  }, [userData, dispatch]);



  return (
    <Providers >
      <div className=' h-screen '>
        <Navbar />
        <div className="flex flex-col h-full  bg-gradient-to-b from-zinc-900 to-zinc-600 ">
          <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Mensajes</h2>
          <div className='flex flex-row min-h-screen'>
            <ChatList user={user} />
            <Chatcontent />
            <div className='h-full bg-white bg-opacity-5'>
              <Banners widthProp={250} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Providers>
  );
};

export default Chat;
