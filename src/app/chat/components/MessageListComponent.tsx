import React, { FC, useEffect, useState } from 'react'
import Image
  from 'next/image'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface MessageListComponentProps {
  conversation: any
  setConversationChosen: any
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
interface Conversation {
  colaborador1: any
  colaborador2: any
  conversationId: any
  lastMessageSeenC1: any
  lastMessageSeenc2: any
  lastMessageSent: any
  messagesArray: any
}
interface Mensaje {
  content: any;
  conversacion: any;
  emisor: any;
  messageId: any;
  readc1: any;
  readc2: any;
  receptor: any;
  sent: any;
}


const MessageListComponent: FC<MessageListComponentProps> = ({ conversation, setConversationChosen }) => {
  const [interlocutor, setInterlocutor] = useState<any>()
  const [conversationData, setConversationData] = useState<any>()
  const [colab2, setColab2] = useState()
  const [messagesArray, setMessagesArray] = useState<any>()
  const [lastMessage, setLastMessage] = useState<any>()
  const [contenidoUltimo, setContenidoUltimo] = useState<any>()

  useEffect(() => {
    const fetchDoc = async () => {
      if (conversation) {
        const docRef = doc(db, "conversations", conversation);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const conversationDataObject = response.data();
          setConversationData(conversationDataObject);
        }
      }
    };

    fetchDoc();
  }, [conversation]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (conversationData) {
        setColab2(conversationData.colaborador2)
      }
    };

    fetchDoc();
  }, [conversationData]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (colab2) {
        const docRef = doc(db, "users", colab2);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const interlocutorData = response.data() as User;
          setInterlocutor(interlocutorData);
        }
      }
    };

    fetchDoc();
  }, [colab2]);

  useEffect(() => {
    if (conversationData) {setMessagesArray(conversationData.messagesArray)}

  }, [conversationData]);

  useEffect(() => {
    if (messagesArray) {
      const ultimo = conversationData.messagesArray[conversationData.messagesArray.length - 1];
      setLastMessage(ultimo)
    }

  }, [messagesArray]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (lastMessage) {
        const docRef = doc(db, "messages", lastMessage);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const MensajeData = response.data() as Mensaje;
          setContenidoUltimo(MensajeData);
        }
      }
    };

    fetchDoc();
  }, [lastMessage]);

  return (
    <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-zinc-100  rounded-lg my-1"
      onClick={() => { setConversationChosen(conversation) }}>
      <div>
        <Image
          src="/icons/empty-user-profile.png"
          alt="ing1"
          width={100}
          height={100}
          className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
        />
      </div>

      <div className='flex flex-col px-3 flex-3  w-full ml-5'>
        <h2 className='text-right  pt-2 text-gray-400 text-sm'>{interlocutor?.nombre} {interlocutor?.apellidos}</h2>

        <div className='flex flex-col'></div>
        <p className='font font-medium mt-4'>Último mensaje de la conversación:</p>
        <p className='mt-1 text-sm mx-10'>''{contenidoUltimo?.content}''</p>
      </div>
    </div>
  )
}

export default MessageListComponent