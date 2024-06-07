// pages/chat/[id].tsx
"use client"
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../../components/Navbar';
import ChatList from "./components/ChatList"
import Chatcontent from "./components/Chatcontent"
import Footer from '../../../components/Footer';
import Banners from '../../../components/Banners';
import { selectUser } from '@/redux/features/userSlice';
import { Providers } from '@/redux/provider';
import useUserSession from '../../../components/hooks/userSession';

interface selectedChatProps {
  params: { id: string }
}

interface User {
  id: any;
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
}

const SelectedChat: FC<selectedChatProps> = ({ params }) => {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  const [paramsId, setParamsId] = useState<any>(params.id);

  useEffect(() => {
    setParamsId(params.id);
  }, [params]);

  return (
    <Providers>
      <div className='h-screen'>
        <Navbar />
        <div className="flex flex-col h-full bg-gradient-to-b from-zinc-900 to-zinc-600">
          <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Mensajes</h2>
          <div className='flex flex-row min-h-screen'>
            <ChatList paramsId={paramsId} />
            <Chatcontent conversationChosen={paramsId} />
            <div className='h-full bg-white bg-opacity-5 hidden md:block'>
              <Banners widthProp={200} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Providers>
  );
}

export default SelectedChat;
