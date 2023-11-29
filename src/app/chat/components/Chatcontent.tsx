import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import InputForm from './chatcomponents/InputForm';
import ContentRendering from './chatcomponents/ContentRendering';
import ChatHeader from './chatcomponents/ChatHeader';


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
    setMessagesArray(conversationData?.messagesArray)
}, [conversationData]);

  
    return (
        <div className='flex flex-col h-full flex-1  '>
            <ChatHeader interlocutor={conversationData?.colaborador2}/>
             <ContentRendering interlocutor={conversationData?.colaborador2} userId={userId} messagesArray={messagesArray}/>
             <InputForm userId={userId} conversationId={conversationData?.conversationId}/>
        </div>
    );
};

export default Chatcontent;