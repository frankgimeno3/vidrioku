
"use client"
import { FC } from 'react';
 import Navbar from '../components/Navbar';
import ChatList from "./components/ChatList"
import Chatcontent from "./components/Chatcontent"
import Footer from '../components/Footer';
import Banners from '../components/Banners';
 import { Providers } from '@/redux/provider';
 


const Chat: FC = () => {
  return (
    <Providers>
      <div className='h-screen'>
        <Navbar />
        <div className="flex flex-col h-full bg-gradient-to-b from-zinc-900 to-zinc-600">
          <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Mensajes</h2>
          <div className='flex flex-row min-h-screen'>
            <ChatList />
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
