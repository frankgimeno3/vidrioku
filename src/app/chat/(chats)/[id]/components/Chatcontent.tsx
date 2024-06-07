import { FC, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import ChatHeader from './chatcomponents/ChatHeader';
import ContentRendering from './chatcomponents/ContentRendering';
import InputForm from './chatcomponents/InputForm';
import useUserSession from '../../../../components/hooks/userSession';
import { Conversation,  User } from '../../../../components/interfaces/interfaces';  

interface ChatcontentProps {
  conversationChosen: any;
}

const Chatcontent: FC<ChatcontentProps> = ({ conversationChosen }) => {
  const { userData, session } = useUserSession();

  const [conversationData, setConversationData] = useState<Conversation | undefined>();
  const [messagesArray, setMessagesArray] = useState<any>();
  const [userIdRecibido, setUserIdRecibido] = useState<any>();
  const [conversationRecibida, setConversationRecibida] = useState<any>();
  const [interlocutorImg, setInterlocutorImg] = useState<any>();
  const [interlocutor, setInterlocutor] = useState<any>();
  const [userObject, setUserObject] = useState<any>();

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
    if (userData) {
      if (conversationData?.colaborador2 == userData.id) {
        setInterlocutor(conversationData?.colaborador1);
      }
      if (conversationData?.colaborador2 != userData.id) {
        setInterlocutor(conversationData?.colaborador2);
      }
    }
  }, [userData, conversationData]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (conversationChosen && interlocutor) {
        const docRef = doc(db, "users", interlocutor);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const interlocutorUserData = response.data() as User;
          setInterlocutorImg(interlocutorUserData.profilepicture);
        }
      }
    };

    fetchDoc();
  }, [interlocutor]);

  useEffect(() => {
    setMessagesArray(conversationData?.messagesArray);
  }, [conversationData]);

  useEffect(() => {
    setUserIdRecibido(userData?.id);
    setUserObject(userData);
  }, [userData]);

  useEffect(() => {
    if (conversationData) {
      setConversationRecibida(conversationData.conversationId);
    }
  }, [conversationData]);

  return (
    <div className='flex flex-col h-full flex-1'>
      <ChatHeader interlocutor={interlocutor} interlocutorImg={interlocutorImg} />
      <ContentRendering interlocutor={interlocutor} userId={userIdRecibido} messagesArray={messagesArray} />
      <InputForm userId={userIdRecibido} conversationId={conversationRecibida} userObject={userObject} />
    </div>
  );
};

export default Chatcontent;
