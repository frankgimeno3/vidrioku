import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import ChatHeader from './chatcomponents/ChatHeader';
import ContentRendering from './chatcomponents/ContentRendering';
import InputForm from './chatcomponents/InputForm';
import { selectUser } from '@/redux/features/userSlice';

interface ChatcontentProps {
  conversationChosen: any;
}

interface Conversation {
  colaborador1: any;
  colaborador2: any;
  conversationId: any;
  lastMessageSeenC1: any;
  lastMessageSeenc2: any;
  lastMessageSent: any;
  messagesArray: any;
}

const Chatcontent: FC<ChatcontentProps> = ({ conversationChosen }) => {
  const user = useSelector(selectUser);

  const [conversationData, setConversationData] = useState<any>();
  const [messagesArray, setMessagesArray] = useState<any>();
  const [userIdRecibido, setUserIdRecibido] = useState<any>();
  const [conversationRecibida, setConversationRecibida] = useState<any>();
  const [interlocutorImg, setinterlocutorImg] = useState<any>();
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
    if (user) {
      if (conversationData?.colaborador2 == user.id) {
        setInterlocutor(conversationData?.colaborador1);
      }
      if (conversationData?.colaborador2 != user.id) {
        setInterlocutor(conversationData?.colaborador2);
      }
    }
  }, [user, conversationData]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (conversationChosen && interlocutor) {
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
    setMessagesArray(conversationData?.messagesArray);
  }, [conversationData]);

  useEffect(() => {
    setUserIdRecibido(user?.id);
    setUserObject(user);
  }, [user]);

  useEffect(() => {
    if (conversationData) {
      setConversationRecibida(conversationData.conversacion);
    }
  }, [conversationData]);

  return (
    <div className='flex flex-col h-full flex-1  '>
      <ChatHeader interlocutor={interlocutor} interlocutorImg={interlocutorImg} />
      <ContentRendering interlocutor={interlocutor} userId={userIdRecibido} messagesArray={messagesArray} />
      <InputForm userId={userIdRecibido} conversationId={conversationRecibida} userObject={userObject} />
    </div>
  );
};

export default Chatcontent;
