import React, { FC, useEffect, useState } from 'react'
import Image
  from 'next/image'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useRouter } from 'next/navigation';

interface MessageListComponentProps {
  conversation: any;
  user: any;
  paramsId:any;
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
  conversationId: any;
  emisor: any;
  messageId: any;
  readc1: any;
  readc2: any;
  receptor: any;
  sent: any;
}


const MessageListComponent: FC<MessageListComponentProps> = ({ conversation, user, paramsId }) => {
  const router = useRouter()
  const [interlocutor, setInterlocutor] = useState<any>()
  const [conversationData, setConversationData] = useState<any>()
  const [messagesArray, setMessagesArray] = useState<any>()
  const [lastMessage, setLastMessage] = useState<any>()
  const [contenidoUltimo, setContenidoUltimo] = useState<any>()
  const [conversationId, setConversationId] = useState<any>()
  const [interlocutorId, setInterlocutorId] = useState<any>()
  const [quienSomos, setQuienSomos] = useState<any>()
  const [isMessageSeen, setIsMessageSeen] = useState<any>(true)
  const [messageCode, setMessageCode] = useState<any>()
  const [backgroundCode, setBackgroundCode] = useState('white');
  

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
        if (conversationData.colaborador2 == user.id) {
          setInterlocutorId(conversationData.colaborador1)
          setQuienSomos('colaborador2')
          if (conversationData.lastMessageSeenc2 == false) { setIsMessageSeen(false) }
          else { setIsMessageSeen(true) }
        }
        if (conversationData.colaborador2 != user.id) {
          setInterlocutorId(conversationData.colaborador2)
          setQuienSomos('colaborador1')
          if (conversationData.lastMessageSeenc1 == false) { setIsMessageSeen(false) }
          else { setIsMessageSeen(true) }
        }
      }
    };

    fetchDoc();
  }, [conversationData]);

  useEffect(() => {
    if(paramsId==messageCode){
      setBackgroundCode('bg-blue-800 bg-opacity-10 hover:bg-opacity-20')
    } else {
      if (isMessageSeen) {
      setBackgroundCode('bg-white bg-opacity-10 hover:bg-opacity-20');
    } else {
      setBackgroundCode('bg-sky-500 bg-opacity-50 hover:bg-opacity-60');
    }}
    
  }, [isMessageSeen, paramsId, messageCode]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (interlocutorId) {
        const docRef = doc(db, "users", interlocutorId);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const interlocutorData = response.data() as User;
          setInterlocutor(interlocutorData);
        }
      }
    };
    fetchDoc();
  }, [interlocutorId]);

  useEffect(() => {
    if (conversationData) { setMessagesArray(conversationData.messagesArray) }
  }, [conversationData]);

  useEffect(() => {
    if (messagesArray) {
      const ultimo = conversationData.messagesArray[conversationData.messagesArray.length - 1];
      setLastMessage(ultimo)
    }
  }, [messagesArray]);

  useEffect(() => {
    if (conversationData) { setConversationId(conversationData.conversacion) }
  }, [conversationData]);


  useEffect(() => {
    const fetchDoc = async () => {
      if (lastMessage) {
        const docRef = doc(db, "messages", lastMessage);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const MensajeData = response.data() as Mensaje;
          setContenidoUltimo(MensajeData);
          console.log("messagedata:", MensajeData)
          setMessageCode( MensajeData.conversationId)
        }
      }
    };

    fetchDoc();
  }, [lastMessage]);


  const changeReadState = async (lastMessageSeenC1: any, lastMessageSeenc2: any, quienSomos: any) => {
    try {
      const docRef = doc(db, "conversations", conversationId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();


        if (quienSomos == 'colaborador1') {
          const updatedData = {
            lastMessageSeenC1: true
          };

          const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, value]) => value !== undefined)
          );

          await setDoc(docRef, {
            ...userData,
            ...filteredData,
          });
        }
        if (quienSomos == 'colaborador2') {
          const updatedData = {
            lastMessageSeenc2: true
          };

          const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, value]) => value !== undefined)
          );

          await setDoc(docRef, {
            ...userData,
            ...filteredData,
          });
        }
      } else {
        console.error('El documento de la conversación');
      }
    } catch (error) {
      console.error('Error al crear marcar mensaje como leído:', error);
    }
  };


  const clickOnChat = () => {
    router.push(`/chat/${conversationId}`)
    changeReadState(conversationData.lastMessageSeenC1, conversationData.lastMessageSeenc2, quienSomos)
    // quitarDeArrayDeMensajesNoLeidos()
    // quitarDeNotificacionesUnread()
  }


  return (
    <div
      className={`flex flex-row mx-6 pb-3 ${backgroundCode}   text-zinc-100 rounded-lg my-1`}
      onClick={clickOnChat}>
      <div>
        <Image
          src={interlocutor?.profilepicture || "/icons/empty-user-profile.png"}
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