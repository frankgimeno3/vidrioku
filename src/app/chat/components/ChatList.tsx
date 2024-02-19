import React, { FC, useEffect, useState } from 'react';
import MessageListComponent from './MessageListComponent';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

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

interface ChatListProps {
  user: any;
}

const ChatList: FC<ChatListProps> = ({ user }) => {
  const [conversationsArray, setConversationsArray] = useState<string[]>([]);
  const [conversationsObjectArray, setConversationsObjectArray] = useState<any>([]);
  const [noMessages, setNoMessages] = useState(true)

  useEffect(() => {
    if (user) {
      setConversationsArray(user.conversations);
    } else {
      setConversationsArray([]);
    }
  }, [user]);

  useEffect(() => {
    console.log("conv array: ", conversationsArray)
    if (conversationsArray?.length !== 0) {
      conversationsArray?.forEach(async (elemento) => {
        if (elemento != '' && elemento != "") {
          const docRef = doc(db, "conversations", elemento);
          console.log(elemento)
          const response = await getDoc(docRef);
          if (response.exists()) {
            const conversationDataObject = response.data();
            setConversationsObjectArray((prevArray: any) => [...prevArray, conversationDataObject]);
          }
        }
      });
      setNoMessages(false)
    } else {
      setNoMessages(true)
    }
  }, [conversationsArray]);

  return (
    <div className="my-3 flex flex-1 flex-col w-full">
      {noMessages &&
        <div className='flex flex-row mx-6 pb-3  text-zinc-100 rounded-lg my-1'>
             <p className='font font-medium mt-4 px-3 flex-3  w-full ml-5'>No se encontraron mensajes</p>
         </div>
      }
      {conversationsObjectArray.map((elemento: any, index: any) => (
        <MessageListComponent key={index} conversation={elemento.conversacion} user={user} />
      ))}
    </div>
  );
};

export default ChatList;