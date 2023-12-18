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
  user:any
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

const Chatcontent: FC<ChatcontentProps> = ({ user, conversationChosen }) => {
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
    if(user){
     if (conversationData?.colaborador2 == user.id){setInterlocutor(conversationData?.colaborador1)}
    if (conversationData?.colaborador2 != user.id){setInterlocutor(conversationData?.colaborador2)}}
  }, [user && conversationData]);

useEffect(() => {
  const fetchDoc = async () => {
    if (conversationChosen && interlocutor) {
      console.log(interlocutor)
      const docRef = doc(db, "users", interlocutor);
      const response = await getDoc(docRef);
      if (response.exists()) {
        const interlocutorUserData = response.data() as any;
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
  setUserIdRecibido(user?.id)
  
}, [user]);

useEffect(() => {
  if(conversationData){
    setConversationRecibida(conversationData.conversacion)
  }
}, [conversationData]);


    return (
        <div className='flex flex-col h-full flex-1  '>
            <ChatHeader interlocutor={interlocutor} interlocutorImg={interlocutorImg}/>
             <ContentRendering interlocutor={interlocutor} userId={userIdRecibido} messagesArray={messagesArray}/>
             <InputForm userId={userIdRecibido} conversationId={conversationRecibida}/>
        </div>
    );
};

export default Chatcontent;