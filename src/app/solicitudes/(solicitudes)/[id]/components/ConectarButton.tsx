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

    const addConversationInFirebase = async (  solicitudId: any, usuario:any, empresa:any) => {
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
                // content: `Hola, ${usuario}, somos la empresa ${empresa}`,
            });
            await updateDoc(newConversationRef, { conversationId: newConversationRef.id });


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
