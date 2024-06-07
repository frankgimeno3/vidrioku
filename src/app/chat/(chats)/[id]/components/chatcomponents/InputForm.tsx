import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { Conversation,  User } from '../../../../../components/interfaces/interfaces';  

interface InputFormProps {
  userId: string | null;
  conversationId: string | null;
  userObject: User | null;
}

const InputForm: FC<InputFormProps> = ({ userId, conversationId, userObject }) => {
  const [inputContent, setInputContent] = useState<string>('');
  const [conversationData, setConversationData] = useState<Conversation | null>(null);
  const [interlocutorSelected, setInterlocutorSelected] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      if (conversationId) {
        const docRef = doc(db, 'conversations', conversationId);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const conversationDataObject = response.data() as Conversation;
          setConversationData(conversationDataObject);
        }
      }
    };
    fetchDoc();
  }, [conversationId]);

  useEffect(() => {
    if (conversationData) {
      if (conversationData.colaborador1 === userId) {
        setInterlocutorSelected(conversationData.colaborador2);
      } else {
        setInterlocutorSelected(conversationData.colaborador1);
      }
    }
  }, [conversationData, userId]);

  const addMessageToConversation = async (messageId: string, conversationId: string) => {
    try {
      const docRef = doc(db, "conversations", conversationId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const datosConversacion = userDoc.data() as Conversation;

        if (datosConversacion.messagesArray && Array.isArray(datosConversacion.messagesArray)) {
          await updateDoc(docRef, {
            ...datosConversacion,
            messagesArray: [...datosConversacion.messagesArray, messageId],
          });
        } else {
          await updateDoc(docRef, {
            ...datosConversacion,
            messagesArray: [messageId],
          });
        }
      } else {
        console.error('El documento de la conversacion no existe');
      }
    } catch (error) {
      console.error('Error al añadir la conversacion:', error);
    }
  };

  const addNotificationToUsuario = async (notifref: string, interlocutor: string) => {
    try {
      const docRef = doc(db, "users", interlocutor);
      const response = await getDoc(docRef);
      if (response.exists()) {
        const userObjectData = response.data() as User;
        const updatedUnreadNotifications = userObjectData.unreadnotifications
          ? [...userObjectData.unreadnotifications, notifref]
          : [notifref];

        const updatedUserData = {
          unreadnotifications: updatedUnreadNotifications,
        }

        const filteredData = Object.fromEntries(
          Object.entries(updatedUserData).filter(([_, value]) => value !== undefined)
        );

        await setDoc(docRef, {
          ...userObjectData,
          ...filteredData,
        });
      }
    } catch (error) {
      console.error('Error al añadir la notificación al usuario:', error);
    }
  };

  const crearNotificacion = async (interlocutor: string, conversationId: string) => {
    try {
      const notificationsCollection = collection(db, 'notificaciones');
      const newNotificationRef = await addDoc(notificationsCollection, {
        idnotificacion: '',
        content: `Has recibido un nuevo mensaje de ${userObject?.nombre}`,
        generada: Timestamp.now(),
        redireccion: `/chat/${conversationId}`,
        tipo: "Mensaje",
        usuario: interlocutor,
      });

      await updateDoc(newNotificationRef, { idnotificacion: newNotificationRef.id });

      setTimeout(() => {
        addNotificationToUsuario(newNotificationRef.id, interlocutor);
      }, 200);
    } catch (error) {
      console.error('Error al crear la notificación en Firestore:', error);
    }
  };

  const addMessageInFirebase = async (conversationId: string, usuario: string, interlocutor: string, content: string) => {
    try {
      const messagesCollection = collection(db, 'messages');
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
      await addMessageToConversation(newMessageRef.id, conversationId);
      await crearNotificacion(interlocutor, conversationId);
    } catch (error) {
      console.error('Error al añadir el mensaje en Firestore:', error);
    }
  };

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (conversationId && userId && interlocutorSelected && inputContent.trim()) {
      addMessageInFirebase(conversationId, userId, interlocutorSelected, inputContent);
      setInputContent('');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div>
      <form className="flex flex-row mx-6 py-2 bg-white bg-opacity-10 text-zinc-100 rounded-lg my-1 justify-between mb-5">
        <input
          className="text-gray-300 py-3 pl-5 px-5 text-sm bg-transparent rounded-lg w-full mx-4 placeholder-gray-300"
          placeholder="Inserte su texto aquí"
          id="inputData"
          name="inputData"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          required
        />
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
