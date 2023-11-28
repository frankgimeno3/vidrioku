import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import InputForm from './chatcomponents/InputForm';
import ContentRendering from './chatcomponents/ContentRendering';
import ChatHeader from './chatcomponents/ChatHeader';


interface ChatcontentProps {
    user: User | undefined
    conversationChosen: any
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

const Chatcontent: FC<ChatcontentProps> = ({ user, conversationChosen }) => {
    const [conversationData, setConversationData] = useState<any>()

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


 
  

    return (
        <div className='flex flex-col h-screen flex-1  '>
            <ChatHeader interlocutor={conversationData?.colaborador2}/>
            <ContentRendering interlocutor={conversationData?.colaborador2} user={user} 
                    messagesArray={conversationData?.messagesArray}/>
            <InputForm user={user}/>
        </div>
    );
};

export default Chatcontent;