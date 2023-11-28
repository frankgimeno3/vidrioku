import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import InputForm from './chatcomponents/InputForm';
import ContentRendering from './chatcomponents/ContentRendering';
import ChatHeader from './chatcomponents/ChatHeader';


interface ChatcontentProps {
    user: any
    conversationChosen: any
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

const Chatcontent: FC<ChatcontentProps> = ({ user, conversationChosen }) => {
  
  

    return (
        <div className='flex flex-col h-screen flex-1  '>
            <ChatHeader user={user}/>
            <ContentRendering/>
            <InputForm/>
        </div>
    );
};

export default Chatcontent;