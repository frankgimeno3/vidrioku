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
 
  useEffect(() => {
    if (user) {
      setConversationsArray(user.conversations);
    } else {
      setConversationsArray([]);
    }
  }, [user]);

  useEffect(() => {
    if (conversationsArray.length !== 0) {
      conversationsArray.forEach(async (elemento) => {
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
    }
  }, [conversationsArray]);
 
  return (
    <div className="my-3 flex flex-1 flex-col w-full">
      {conversationsObjectArray.map((elemento: any, index: any) => (
        <MessageListComponent key={index} conversation={elemento.conversacion} />
      ))}
    </div>
  );
};

export default ChatList;