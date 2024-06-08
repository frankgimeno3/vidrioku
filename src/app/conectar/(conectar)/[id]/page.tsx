"use client"
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { db } from '@/app/firebase';
import { User } from '../../../components/interfaces/interfaces';
import useUserSession from '../../../components/hooks/userSession';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';

interface ConectarProps {
  params: { id: string };
}

const Conectar: FC<ConectarProps> = ({ params }) => {
  const { userData: nuestroId } = useUserSession();
   const [content, setContent] = useState<string>('');
  const router = useRouter();

  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchUserData = async () => {
      if (params.id) {
        const docRef = doc(db, 'users', params.id.replace(/%40/g, '@'));
        const response = await getDoc(docRef);
        if (response.exists()) {
          const userData = response.data() as User;
         }
      }
    };

    fetchUserData();
  }, [params.id]);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const addMessageInFirebase = async (conversationId: any, usuario: any, empresa: any, contenidoMensaje: string) => {
    try {
      const messagesCollection = collection(db, 'messages');
      const newMessageRef = await addDoc(messagesCollection, {
        messageId: '',
        conversationId: conversationId.id,
        emisor: empresa.email,
        receptor: usuario.email,
        readc1: true,
        readc2: false,
        sent: Timestamp.now(),
        content: contenidoMensaje,
      });
      await updateDoc(newMessageRef, { messageId: newMessageRef.id });

      const docRef = doc(db, 'conversations', conversationId.id);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        const datosConversacion = userDoc.data();
        if (datosConversacion.messagesArray) {
          await updateDoc(docRef, {
            ...datosConversacion,
            messagesArray: [...datosConversacion.messagesArray, newMessageRef.id],
          });
        } else {
          await updateDoc(docRef, {
            ...datosConversacion,
            messagesArray: [newMessageRef.id],
          });
        }
      } else {
        console.error('El documento de la conversacion no parece existir');
      }
    } catch (error) {
      console.error('Error al encontrar la conversacion para añadir el mensaje correspondiente:', error);
    }
  };

  const addConversationToUsuario = async (conversationId: any, usuario: any) => {
    try {
      const docRef = doc(db, 'users', usuario.email);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const datosUsuario = userDoc.data() as User;

        if (datosUsuario.conversations && Array.isArray(datosUsuario.conversations)) {
          await updateDoc(docRef, {
            ...datosUsuario,
            conversations: [...datosUsuario.conversations, conversationId.id],
          });
        } else {
          await updateDoc(docRef, {
            ...datosUsuario,
            conversations: [conversationId.id],
          });
        }
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
    }
  };

  const addConversationInFirebase = async (usuario: any, empresa: any) => {
    try {
      const conversationsCollection = collection(db, 'conversations');
      const newConversationRef = await addDoc(conversationsCollection, {
        conversacion: '',
        colaborador1: empresa.email,
        colaborador2: usuario.email,
        lastMessageSeenC1: true,
        lastMessageSeenc2: false,
        lastMessageSent: Timestamp.now(),
        messagesArray: [],
      });
      await updateDoc(newConversationRef, { conversacion: newConversationRef.id });

      if (nuestroId) {
        addConversationToUsuario(newConversationRef, nuestroId);
        addConversationToUsuario(newConversationRef, usuario);
        setTimeout(function () {
          addMessageInFirebase(newConversationRef, usuario, nuestroId, content);
        }, 200);
      } else {
        console.error('User data is undefined');
      }
    } catch (error) {
      console.error('Error al crear la conversación en Firestore:', error);
    }
  };

  const startConversation = () => {
    addConversationInFirebase(user, nuestroId);
    setTimeout(function () {
      router.push('/chat');
    }, 500);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-600">
        <div className="flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60">
          <h2 className="font-bold text-lg text-center mx-auto">Detalles de la solicitud</h2>
        </div>
        <div className="flex flex-col p-5 bg-white bg-opacity-10 text-center">
          <div className="flex flex-col mx-6 bg-white bg-opacity-5 text-zinc-100 min-h-screen text-center">
            <p className="text-lg pt-12">
              Está a punto de conectar con el usuario {user?.nombre} {user?.apellidos}
            </p>
            <div className="mx-96 px-24 mt-6">
              <textarea
                className="rounded-lg w-full text-gray-600 h-64 p-6"
                placeholder="Por favor, inserte a continuación el mensaje para comenzar la conversación con el usuario"
                value={content}
                onChange={handleTextareaChange}
              />
            </div>
            <button
              className="mx-auto mt-5 bg-gray-50 text-xs rounded-lg shadow p-4 py-2 text-gray-600"
              onClick={() => {
                startConversation();
              }}
            >
              Enviar y conectar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Conectar;
