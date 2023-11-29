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
  conversacion: any
  conversationId: any
  lastMessageSeenC1: any
  lastMessageSeenc2: any
  lastMessageSent: any
  messagesArray: any
}

const MessageListComponent: FC<MessageListComponentProps> = ({ conversation,    setConversationChosen }) => {
  const [interlocutor, setInterlocutor] = useState<any>()
  const [conversationData, setConversationData] = useState<any>()
  const [colab2, setColab2] = useState()
  
  
 

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




  return (
       <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-zinc-100  rounded-lg my-1" 
       onClick={()=>{setConversationChosen(conversation)}}>
        <div>
          <Image
            src="/profilepictures/2.jpg"
            alt="ing1"
            width={100}
            height={100}
            className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
          />
        </div>

        <div className='flex flex-col px-3 flex-3'>
          <h2 className='text-right  pt-2 text-gray-400 text-sm'>Último mensaje: </h2>

          <div className='flex flex-col'></div>
          <h2 className='mt-1 text-sm mx-5'>El usuario
            <span className='font-bold'> {interlocutor?.nombre} {interlocutor?.apellidos} </span>le ha enviado un mensaje </h2>
        </div>
      </div>
   )
}

export default MessageListComponent