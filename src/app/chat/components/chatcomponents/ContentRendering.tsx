import { db } from '@/app/firebase'
import { doc, getDoc } from 'firebase/firestore'
import React, { FC, useEffect, useState } from 'react'

interface ContentRenderingProps {
    interlocutor: any
    userId:any 
    messagesArray: any
   }

   interface Mensaje {
    content: any
    conversacion: any
    emisor: any
    messageId: any
    readc1: any
    readc2: any
    receptor: any
    sent: any
   }

const ContentRendering: FC<ContentRenderingProps> = ({ interlocutor, userId, messagesArray }) => {    
    const [renderingObjectArray, setRenderingObjectArray] = useState()

    useEffect(() => {
      const fetchDoc = async () => {
        if (messagesArray) {
          const docRef = doc(db, "messages", );
          const response = await getDoc(docRef);
          if (response.exists()) {
            const messagesObjectList = response.data() as any
            //  as Mensaje;
            setRenderingObjectArray(messagesObjectList);
          }
        }
      };
  
      fetchDoc();
  }, [messagesArray]);

    // useEffect(() => {
    //     const fetchDoc = async () => {
    //       if (messagesArray) {
    //         const docRef = doc(db, "messages", messageId);
    //         const response = await getDoc(docRef);
    //         if (response.exists()) {
    //           const messageDataObject = response.data() as Mensaje;
    //           setConversationData(conversationDataObject);
    //         }
    //       }
    //     };
    
    //     fetchDoc();
    // }, [messagesArray]);


    return (
        <div className="flex h-full flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 mt-4  ">
            <div className="flex h-full flex-col  h-full mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1">
            </div>
        </div>
    )
}

export default ContentRendering