import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
 import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import MessageListComponent from './MessageListComponent';

interface User {
    id:any
    apellidos: string;
    edad: number;
    genero: string;
    nombre: string;
    ubi: string;
    userEmail: string;
    conversations: any
  }
  
interface ChatListProps {
    user:any
}


const ChatList: FC<ChatListProps> = ({ user }) => {
 
   

    return (
        <div className='my-3 flex flex-1 flex-col'>
            <MessageListComponent  />
             
          </div>
    );
};

export default ChatList;