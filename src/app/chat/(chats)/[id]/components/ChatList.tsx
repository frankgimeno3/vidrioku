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
 }

const ChatList: FC<ChatListProps> = ({ user }) => {
  const [conversationsArray, setConversationsArray] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setConversationsArray(user.conversations);
     } else {
      setConversationsArray([]);
     }
  }, [user]);
  
  return (
    <div className="  flex flex-1 flex-col overflow-scroll"  style={{ height: '740px', overflowX: 'auto' }} > 
    <div className="my-3 flex  flex-col "> 
      {conversationsArray.length === 0 ? (
        <p className="p-5 text-xs text-gray-500">No has recibido ningún mensaje</p>
      ) : (
        conversationsArray.map((conversation, index) => (
          <MessageListComponent key={index} conversation={conversation}     />
        ))
      )}
    </div>
    </div>
    );
};

export default ChatList;