import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface InputFormProps {
  userId: any;
  conversationId: any;
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

const InputForm: FC<InputFormProps> = ({ userId, conversationId }) => {
  const [inputContent, setInputContent] = useState<any>();
  const [conversationData, setConversationData] = useState<any>();
  const [interlocutorSelected, setInterlocutorSelected] = useState<any>();
 
  //OBTENEMOS INFO DE LA CONVERSACION ACTUAL


  useEffect(() => {
    const fetchDoc = async () => {
      if (conversationId) {
        // console.log("conversationId: ", conversationId)
        const docRef = doc(db, 'conversations', conversationId);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const conversationDataObject = response.data() as Conversation;
          setConversationData(conversationDataObject);
          // console.log("conversationDataObject: ", conversationDataObject) - SÍ FUNCIONA CORRECTAMENTE

        }
      }
    };
    fetchDoc();
  }, [conversationId]);


  //DEDUCIMOS DE LA CONVER EL COLAB QUE SOMOS, comparando con el userId que sale de session

  useEffect(() => {
    if (conversationData && conversationData.colaborador1 == userId) {
      setInterlocutorSelected(conversationData.colaborador2);
    } else if (conversationData) {
      setInterlocutorSelected(conversationData.colaborador1);
    }
  }, [conversationData, userId]);

  // useEffect(() => {
  //   console.log("interlocutorSelected: ", interlocutorSelected) ------------------ ESTO FUNCIONA
  // }, [interlocutorSelected]);

  const addMessageToConversation = async (messageId: any, conversationId: any) => {
    console.log("conversation: ", conversationId)
    try {
      const docRef = doc(db, "conversations", conversationId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const datosConversacion = userDoc.data() as any;

        if (datosConversacion.messagesArray && Array.isArray(datosConversacion.messagesArray)) {
          await updateDoc(docRef, {
            ...datosConversacion,
            messagesArray: [...datosConversacion.messagesArray, messageId.id],
          });
        } else {
          await updateDoc(docRef, {
            ...datosConversacion,
            messagesArray: [messageId.id],
          });
        }
      } else {
        console.error('El documento de la conversacion no existe');
      }
    } catch (error) {
      console.error('Error al añadir la conversacion:', error);
    }
  };


  const addmessageInFirebase = async (conversationId: any, usuario: any, interlocutor: any, content: any) => {
    try {
      const messagesCollection = collection(db, 'messages');
      console.log("conversationid", conversationId)
      const newMessageRef = await addDoc(messagesCollection, {
        messageId: '',
        conversationId: conversationId,
        emisor: usuario,
        receptor: interlocutor,
        readc1: true,
        readc2: false,
        sent: Timestamp.now(),
        content: content,
      });
      await updateDoc(newMessageRef, { messageId: newMessageRef.id });
      await addMessageToConversation(newMessageRef, conversationId)

    } catch (error) {
      console.error('Error al crear la conversación en Firestore:', error);
    }
  };

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("esto ocurre")
    addmessageInFirebase(conversationId, userId, interlocutorSelected, inputContent);
    setTimeout(() => {
      window.location.reload();
    }, 1000);   };


  return (
    <div>
      <form className="flex flex-row  mx-6  py-2 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 justify-between mb-5 ">
        <input
          className="text-gray-300 py-3 pl-5 px-5 text-sm bg-transparent rounded-lg w-full mx-4 placeholder-gray-300"
          placeholder="Inserte su texto aquí"
          id="inputData"
          name="inputData"
          onChange={(e) => setInputContent(e.target.value)}
          required
        ></input>
        <button
          className="text-gray-300 px-2 mx-2 mr-4 text-sm bg-white bg-opacity-10 rounded-lg text-xs"
          onClick={handleEnviar}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default InputForm;