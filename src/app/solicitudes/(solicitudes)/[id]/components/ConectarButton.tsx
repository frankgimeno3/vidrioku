import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ConectarButtonProps {
    usuario: any
    oferta: any
    solicitudId: any
}

interface User {
  id:any
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any
}


const ConectarButton: React.FC<ConectarButtonProps> = ({ usuario, oferta, solicitudId }) => {

    const [userData, setUserData] = useState<User>();

    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/signin');
        },
      });
      useEffect(() => {
        if (session?.data?.user?.email) {
            setUserData(session.data.user as User);
        } else {
            setUserData(undefined);
        }
    }, [session?.data?.user?.email]);

      //creamos funcion para crear primer mensaje para usar + adelante
      const addmessageInFirebase = async (  conversationId: any, usuario:any, empresa:any) => {
        try {
           const messagesCollection = collection(db, 'messages');
           const newMessageRef = await addDoc(messagesCollection, {
               messageId: '',
               conversationId: conversationId,
               emisor: empresa,
               receptor: usuario,
               readc1: true,
               readc2: false,
               sent: Timestamp.now(),
               content: `Hola ${usuario}, somos la empresa ${empresa}, estamos interesados en su perfil.`,
           });
           await updateDoc(newMessageRef, { messageId: newMessageRef.id });

       } catch (error) {
           console.error('Error al crear la conversación en Firestore:', error);
       }
   };

   const addConversationToUsuario = async (conversationId: any, usuario: User) => {
    try {
        const docRef = doc(db, "users", usuario.id);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
            const datosUsuario = userDoc.data() as User;

            if (datosUsuario.conversations && Array.isArray(datosUsuario.conversations)) {
                await updateDoc(docRef, {
                    ...datosUsuario,
                    conversations: [...datosUsuario.conversations, conversationId],
                });
            } else {
                await updateDoc(docRef, {
                    ...datosUsuario,
                    conversations: [conversationId],
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
    const addConversationInFirebase = async (  solicitudId: any, usuario:any, empresa:any) => {
        
         try {
            const conversationsCollection = collection(db, 'conversations');
            const newConversationRef = await addDoc(conversationsCollection, {
                conversacion: solicitudId,
                colaborador1: empresa,
                colaborador2: usuario,
                lastMessageSeenC1: true,
                lastMessageSeenc2: false,
                lastMessageSent: Timestamp.now(),
                messagesArray: []
             });
             if (userData) {
              addmessageInFirebase(newConversationRef, usuario, userData);
              addConversationToUsuario(newConversationRef, userData);
              addConversationToUsuario(newConversationRef, usuario);
          } else {
              console.error('User data is undefined');
          }

        } catch (error) {
            console.error('Error al crear la conversación en Firestore:', error);
        }

    };


    

    const startConversation = () => {
        addConversationInFirebase(solicitudId, usuario, userData)
    }
    return (
         <Link href={"/chat"}>
            <button className='bg-white px-4 py-2 rounded text-xs text-gray-500 shadow w-56 mx-auto my-2'
                onClick={() => { startConversation() }}>
                Conectar con el profesional</button>
        </Link>
     )
}

export default ConectarButton
