// pages/chat/[id].tsx

"use client"
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../../components/Navbar';
import ChatList from "./components/ChatList"
import Chatcontent from "./components/Chatcontent"
import Footer from '../../../components/Footer';
import Banners from '../../../components/Banners';
import { selectUser } from '@/redux/features/userSlice';
import { selectParamsId, setParamsId } from '@/redux/features/paramsSlice';
import { Providers } from '@/redux/provider';
import useUserSession from '../../../components/hooks/userSession';

interface SelectedChatProps {
  params: { id: string };
}

const SelectedChat: FC<SelectedChatProps> = ({ params }) => {
  const dispatch = useDispatch();
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  const paramsId = useSelector(selectParamsId);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Update paramsId in Redux state when params change
    dispatch(setParamsId(params.id));
  }, [dispatch, params.id]);

  return (
    <Providers>
      <div className='h-screen'>
        <Navbar />
        <div className="flex flex-col h-full bg-gradient-to-b from-zinc-900 to-zinc-600">
          <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Mensajes</h2>
          <div className='flex flex-row min-h-screen'>
            <ChatList paramsId={paramsId} setIsLoading={setIsLoading}/>
            <Chatcontent conversationChosen={paramsId} setIsLoading={setIsLoading} isLoading={isLoading}/>
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
