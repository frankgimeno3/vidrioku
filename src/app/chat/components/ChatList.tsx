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
  user: User | undefined;
}

const ChatList: FC<ChatListProps> = ({ user }) => {
  const [conversationsArray, setConversationsArray] = useState<string[]>([]);
  const [conversationsObjectArray, setConversationsObjectArray] = useState<any>([]);
  const [reorderedArray, setReorderedArray] = useState<any>()

  useEffect(() => {
    if (user) {
      setConversationsArray(user.conversations);
      console.log("hay user")
      } else {
      setConversationsArray([]);
      console.log("no hay user")
     }
  }, [user]);
  
  useEffect(() => {
    if (conversationsArray.length !== 0) {
      conversationsArray.forEach(async (elemento) => {
        const docRef = doc(db, "conversations", elemento);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const conversationDataObject = response.data();
          setConversationsObjectArray((prevArray: any) => [...prevArray, conversationDataObject]);
        }
      });
    }
  }, [conversationsArray]);

  useEffect(() => {
    console.log("conversationsObjectArray: ", conversationsObjectArray);
  
    const conversationsObjectArrayReordered = [...conversationsObjectArray].sort((a, b) => {
      // Assuming lastMessageSent is a timestamp (larger number for newer messages)
      return b.lastMessageSent - a.lastMessageSent;
    });
  
    setReorderedArray(conversationsObjectArrayReordered);
  }, [conversationsObjectArray]);

  useEffect(() => {
    console.log("reorderedArray: ", reorderedArray);
  }, [reorderedArray]);

  return (
    <div className="my-3 flex flex-1 flex-col w-full">
      {conversationsArray.length === 0 || (conversationsArray.length === 1 && !conversationsArray[0].trim()) ? (
        <p className="p-5 text-xs text-gray-500">No has recibido ningún mensaje</p>
      ) : (
        conversationsArray.map((conversation, index) => (
          <MessageListComponent key={index} conversation={conversation}     />
        ))
      )}
    </div>
  );
};

export default ChatList;