import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessageListComponent from './MessageListComponent';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { selectUser } from '@/redux/features/userSlice';
import useUserSession from '../../../../components/hooks/userSession';

interface ChatListProps {
  paramsId: any;
}

const ChatList: FC<ChatListProps> = ({ paramsId }) => {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  const [conversationsArray, setConversationsArray] = useState<string[]>([]);
  const [conversationsObjectArray, setConversationsObjectArray] = useState<any[]>([]);
  const [noMessages, setNoMessages] = useState(true);

  useEffect(() => {
    if (user) {
      setConversationsArray(user.conversations);
    } else {
      setConversationsArray([]);
    }
  }, [user]);

  useEffect(() => {
    if (conversationsArray.length !== 0) {
      Promise.all(conversationsArray.map(async (elemento) => {
        if (elemento !== '' && elemento !== "") {
          const docRef = doc(db, "conversations", elemento);
          const response = await getDoc(docRef);
          if (response.exists()) {
            return response.data();
          }
        }
      })).then((conversationDataArray) => {
        conversationDataArray = conversationDataArray.filter((conversationData) => conversationData);
        setConversationsObjectArray(conversationDataArray);
        setNoMessages(conversationDataArray.length === 0);
      });
    } else {
      setConversationsObjectArray([]);
      setNoMessages(true);
    }
  }, [conversationsArray]);

  return (
    <div className="my-3 flex flex-1 flex-col w-full">
      {noMessages && (
        <div className='flex flex-row mx-6 pb-3 text-zinc-100 rounded-lg my-1'>
          <p className='font-medium mt-4 px-3 flex-3 w-full ml-5'>No se encontraron mensajes</p>
        </div>
      )}
      {conversationsObjectArray.map((elemento: any, index: any) => (
        <MessageListComponent key={index} conversation={elemento.conversacion} paramsId={paramsId} />
      ))}
    </div>
  );
};

export default ChatList;
