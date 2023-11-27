import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ConectarButtonProps {
    usuario: any
    oferta: any
    solicitudId: any
}

const ConectarButton: React.FC<ConectarButtonProps> = ({ usuario, oferta, solicitudId }) => {

    const [empresa, setEmpresa] = useState()
    const [userData, setUserData] = useState('');
    const [idConversacionAsignado, setIdConversacionAasignado] = useState()

    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/signin');
        },
      });
      useEffect(() => {
        if (session?.data?.user?.email) {
          setUserData(session.data.user.email);
        } else {
          setUserData('Usuario');
        }
      }, [session?.data?.user?.email]);

      //creamos funcion para crear primer mensaje para usar + adelante
      const addmessageInFirebase = async (  conversationId: any, usuario:any, empresa:any) => {
        try {
           const messagesCollection = collection(db, 'conversations');
           const newMessageRef = await addDoc(messagesCollection, {
               messageId: '',
               conversacion: conversationId,
               emisor: empresa,
               receptor: usuario,
               readc1: true,
               readc2: false,
               sent: Timestamp.now,
               content: `Hola ${usuario}, somos la empresa ${empresa}, estamos interesados en su perfil.`,
           });
           await updateDoc(newMessageRef, { conversationId: newMessageRef.id });

       } catch (error) {
           console.error('Error al crear la conversación en Firestore:', error);
       }
   };

   //creamos funcion para crear conver para usar + adelante. Llamamos desde aqui a la de crear el mensaje.
    const addConversationInFirebase = async (  solicitudId: any, usuario:any, empresa:any) => {
        setIdConversacionAasignado
         try {
            const conversationsCollection = collection(db, 'conversations');
            const newConversationRef = await addDoc(conversationsCollection, {
                conversationId: '',
                conversacion: solicitudId,
                colaborador1: empresa,
                colaborador2: usuario,
                lastMessageSeenC1: true,
                lastMessageSeenc2: false,
                lastMessageSent: Timestamp.now,
                messagesArray: []
             });
            await updateDoc(newConversationRef, { conversationId: newConversationRef.id });
            await addmessageInFirebase(newConversationRef, usuario, userData)

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
                onClick={() => { startConversation }}>
                Conectar con el profesional</button>
        </Link>
    )
}

export default ConectarButton
