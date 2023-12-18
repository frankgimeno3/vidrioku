import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import InputForm from './chatcomponents/InputForm';
import ContentRendering from './chatcomponents/ContentRendering';
import ChatHeader from './chatcomponents/ChatHeader';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';


interface ChatcontentProps {
  userId:any
  conversationChosen: any
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

const Chatcontent: FC<ChatcontentProps> = ({ userId, conversationChosen }) => {
     const [conversationData, setConversationData] = useState<any>()
    const [messagesArray, setMessagesArray] = useState<any>()
    const [userIdRecibido, setUserIdRecibido] = useState<any>()
    const [conversationRecibida, setConversationRecibida] = useState<any>()
    const [interlocutorImg, setinterlocutorImg] = useState<any>()
    const [interlocutor, setInterlocutor] = useState<any>()

    
    
    useEffect(() => {
      const fetchDoc = async () => {
        if (conversationChosen) {
          const docRef = doc(db, "conversations", conversationChosen);
          const response = await getDoc(docRef);
          if (response.exists()) {
            const conversationDataObject = response.data() as Conversation;
            setConversationData(conversationDataObject);
          }
        }
      };
      fetchDoc();
  }, [conversationChosen]);

  useEffect(() => {
    if (conversationData?.colaborador2 == userId){setInterlocutor(conversationData?.colaborador2)}
    if (conversationData?.colaborador2 != userId){setInterlocutor(conversationData?.colaborador1)}
  }, [userId && conversationData]);

useEffect(() => {
  const fetchDoc = async () => {
    if (conversationChosen && interlocutor) {
      const docRef = doc(db, "users", interlocutor);
      const response = await getDoc(docRef);
      if (response.exists()) {
        const interlocutorUserData = response.data() as any;
        console.log("interlocutorUserData: ", interlocutorUserData)
        setinterlocutorImg(interlocutorUserData.profilepicture);
      }
    }
  };

  fetchDoc();
}, [interlocutor]);

  useEffect(() => {
    setMessagesArray(conversationData?.messagesArray)
}, [conversationData]);

useEffect(() => {
  setUserIdRecibido(userId)
}, [userId]);

useEffect(() => {
  if(conversationData){
    setConversationRecibida(conversationData.conversacion)
  }
}, [conversationData]);


    return (
        <div className='flex flex-col h-full flex-1  '>
            <ChatHeader interlocutor={interlocutor} interlocutorImg={interlocutorImg}/>
             <ContentRendering interlocutor={interlocutor} userId={userId} messagesArray={messagesArray}/>
             <InputForm userId={userIdRecibido} conversationId={conversationRecibida}/>
        </div>
    );
};

export default Chatcontent;