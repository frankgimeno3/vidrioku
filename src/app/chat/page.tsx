"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { signOut, useSession } from 'next-auth/react';

import ChatList from "./components/ChatList"
import Chatcontent from "./components/Chatcontent"
// interface NavbarProps {
//   currentComponent: string;
//   setCurrentComponent: (component: string) => void;
// }

// const Navbar: FC<NavbarProps> = ({ currentComponent, setCurrentComponent }) => {

const Mensajes: FC = ({ }) => {
  const router = useRouter();
  const [userData, setUserData] = useState('');

  const [isConversation, setIsConversation] = useState(false)
  const [userSelectedName, setUserSelectedName] = useState("")
  const [userSelectedImg, setUserSelectedImg] = useState("")

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



  const selectUser1 = () => {
    setIsConversation(true)
    setUserSelectedName("Miquel Àngel Rodriguez")
    setUserSelectedImg("/profilepictures/3.jpg")
  }
  const selectUser2 = () => {
    setIsConversation(true)
    setUserSelectedName("TUROMAS")
    setUserSelectedImg("/inventedlogos/4.png")
  }
  const selectUser3 = () => {
    setIsConversation(true)
    setUserSelectedName("Pepito Ramos")
    setUserSelectedImg("/profilepictures/4.jpg")
  }
  const selectUser4 = () => {
    setIsConversation(true)
    setUserSelectedName("Tvitec")
    setUserSelectedImg("/inventedlogos/5.png")
  }
  const selectUser5 = () => {
    setIsConversation(true)
    setUserSelectedName("GLASTON")
    setUserSelectedImg("/inventedlogos/6.png")
  }

  const backToMenu = () => {
    setIsConversation(false)
    setUserSelectedName("")
    setUserSelectedImg("")
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Mensajes</h2>
        <div className='flex flex-row'>
          <ChatList   userData={userData} selectUser1={selectUser1} selectUser2={selectUser2}
            selectUser3={selectUser3} selectUser4={selectUser4} selectUser5={selectUser5} />
          {isConversation && <Chatcontent userData={userData} backToMenu={backToMenu} userSelectedImg={userSelectedImg} userSelectedName={userSelectedName} />
          }
        </div>
      </div>
    </>

  );
};

export default Mensajes;