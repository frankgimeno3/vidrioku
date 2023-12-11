"use client"
import Navbar from '@/app/components/Navbar';
import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

interface ConectarProps {
  params: { id: string }
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


const Conectar: FC<ConectarProps> = ({ params }) => {
  const [paramsunsolved, setparamsunsolved] = useState<any>()
  const [paramssolved, setparamssolved] = useState<any>()
  const [user, setUser] = useState<any>();
  const [nuestroId, setNuestroId] = useState<User>();
  const [content, setContent] = useState<string>('');

    //OBTENEMOS DATOS DE NOSOTROS MISMOS COMO nuestroId

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });
    useEffect(() => {
        if (session?.data?.user?.email) {
          setNuestroId(session.data.user as User);
        } else {
          setNuestroId(undefined);
        }
    }, [session?.data?.user?.email]);
  //AQUÍ OBTENEMOS DATOS DEL PROFESIONAL COMO USER
  useEffect(() => {
    setparamsunsolved(params.id)
 
  }, [params]);

  useEffect(() => {
    if (paramsunsolved) {
      setparamssolved(paramsunsolved.replace(/%40/g, '@'));
     }
  }, [paramsunsolved]);

  useEffect(() => { 
    const fetchDoc = async () => {
      if (paramssolved) {
        const docRef = doc(db, "users", paramssolved);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
        }
      }
    };

    fetchDoc();
   }, [paramssolved]);
 
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

    //creamos funcion para crear primer mensaje para usar + adelante
    const addmessageInFirebase = async ( conversationId: any, usuario: any, empresa: any, contenidoMensaje: string ) => {
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
          content: contenidoMensaje, // Utilizamos el contenido del mensaje pasado como argumento
        });
        await updateDoc(newMessageRef, { messageId: newMessageRef.id });
        try {
          const docRef = doc(db, "conversations", conversationId.id);
         const userDoc = await getDoc(docRef);
          if (userDoc.exists()) {
             const datosConversacion = userDoc.data();
              if (datosConversacion.messagesArray ) {
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
      } catch (error) {
        console.error('Error al crear la conversación en Firestore:', error);
      }
    };

  const addConversationToUsuario = async (conversationId: any, usuario: any) => {
      try {
          const docRef = doc(db, "users", usuario.email);
          const userDoc = await getDoc(docRef);
         
          if (userDoc.exists()) {
              const datosUsuario = userDoc.data() as User;
 
              if (datosUsuario.conversations && Array.isArray(datosUsuario.conversations)
                ) {
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

  //creamos funcion para crear conver para usar + adelante. Llamamos desde aqui a la de crear el mensaje.
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
        setTimeout(function() {
          addmessageInFirebase(newConversationRef, usuario, nuestroId, content);  
        }, 200);   

      } else {
        console.error('User data is undefined');
      }
    } catch (error) {
      console.error('Error al crear la conversación en Firestore:', error);
    }
  };

  const startConversation = () => {
      addConversationInFirebase(user, nuestroId)
  }
  return (
    <>
             <Navbar />

            <div className="flex flex-col  bg-gradient-to-b from-zinc-900 to-zinc-600">
                <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
                    <h2 className="font-bold text-lg text-center mx-auto">Detalles de la solicitud</h2>
                </div>
                <div className="flex flex-col p-5 bg-white bg-opacity-10 text-center">      <div className="flex flex-col  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen text-center  ">
        <p className="text-lg pt-12">Está a punto de conectar con el usuario {user?.nombre} {user?.apellidos}</p>
        <div className="mx-96 px-24 mt-6 ">
           <textarea
            className="rounded-lg w-full text-gray-600 h-64 p-6"
            placeholder="Por favor, inserte a continuación el mensaje para comenzar la conversación con el usuario"
            value={content}
            onChange={handleTextareaChange}
          />
        </div>
        <Link href={'/chat'}>
          <button
            className="mx-auto mt-5 bg-gray-50 text-xs rounded-lg shadow p-4 py-2 text-gray-600"
            onClick={() => {
              startConversation();
            }}
          >
            Enviar y conectar
          </button>
        </Link>
        </div>
        </div>
        </div>
    </>
  );
};

export default Conectar;