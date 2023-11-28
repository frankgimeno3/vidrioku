import React, { FC } from 'react';
import MessageListComponent from './MessageListComponent';

interface User {
  id: any;
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any[];
}

interface ChatListProps {
  user?: User | undefined;
}

  const ChatList: FC<ChatListProps> = ({ user }) => {
    const conversationsArray = user?.conversations || [];
    const validConversationsArray = Array.isArray(conversationsArray) ? conversationsArray : [];

    return (
      <div className="my-3 flex flex-1 flex-col">
        {validConversationsArray.length === 0 || (validConversationsArray.length === 1 && !validConversationsArray[0].trim()) ? (
          <p className="p-5 text-xs text-gray-500">No has recibido ningún mensaje</p>
        ) : (
          validConversationsArray.map((conversation, index) => (
            <MessageListComponent key={index} value={conversation} />
          ))
        )}
      </div>
    );
  };
  
  export default ChatList;