import React, { FC, useEffect, useState } from 'react';
import MessageListComponent from './MessageListComponent';

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
  setIsConversation: any
  setConversationChosen: any
}

const ChatList: FC<ChatListProps> = ({ user, setIsConversation, setConversationChosen }) => {
  const [conversationsArray, setConversationsArray] = useState<string[]>([]);

  useEffect(() => {
    if (user && user.conversations && Array.isArray(user.conversations)) {
      setConversationsArray(user.conversations);
    } else {
      setConversationsArray([]);
      console.error("No hay conversations or conversations is not an array");
    }
  }, [user]);

  useEffect(() => {
    console.log("Nuevo user:", user);
    if (user) {
      console.log("Conversations:", user.conversations);
    }
  }, [user]);

  
  return (
    <div className="my-3 flex flex-1 flex-col">
      {conversationsArray.length === 0 || (conversationsArray.length === 1 && !conversationsArray[0].trim()) ? (
        <p className="p-5 text-xs text-gray-500">No has recibido ningún mensaje</p>
      ) : (
        conversationsArray.map((conversation, index) => (
          <MessageListComponent key={index} value={conversation} setIsConversation={setIsConversation} setConversationChosen={setConversationChosen} />
        ))
      )}
    </div>
  );
};

export default ChatList;