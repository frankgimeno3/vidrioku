import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ContentRenderingProps {
  interlocutor: any;
  userId: any;
  messagesArray: any;
}

interface Mensaje {
  content: any;
  conversacion: any;
  emisor: any;
  messageId: any;
  readc1: any;
  readc2: any;
  receptor: any;
  sent: any;
}

const ContentRendering: FC<ContentRenderingProps> = ({ interlocutor, userId, messagesArray }) => {
  const [renderingObjectArray, setRenderingObjectArray] = useState<Mensaje[]>([]);
  const [filteredArray, setFilteredArray] = useState<Mensaje[]>([]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (messagesArray) {
        let newArray: Mensaje[] = [];

        for (const messageId of messagesArray) {
          const docRef = doc(db, 'messages', messageId);
          const response = await getDoc(docRef);

          if (response.exists()) {
            const messagesObjectList = response.data() as Mensaje;
            newArray.push(messagesObjectList);
          }
        }

        setRenderingObjectArray(newArray);
      }
    };

    fetchDoc();
  }, [messagesArray]);

  useEffect(() => {
    // Ordena el array alfabéticamente según la propiedad 'sent'
    const sortedArray = [...renderingObjectArray].sort((a, b) => {
      // Verifica si a.sent y b.sent son cadenas antes de llamar a localeCompare
      const sentA = a.sent && typeof a.sent === 'string' ? a.sent : '';
      const sentB = b.sent && typeof b.sent === 'string' ? b.sent : '';

      // Ajusta la lógica de ordenación según tus necesidades
      return sentA.localeCompare(sentB);
    });

    setFilteredArray(sortedArray);
  }, [renderingObjectArray]);

  useEffect(() => {
    if (filteredArray) {
      console.log(filteredArray);
    }
  }, [filteredArray]);

const usertype = (message: any) => {
  return message.emisor === interlocutor ? 'mr-24' : 'ml-24';
};

return (
  <div className="flex h-full flex-row mx-6 pb-3 bg-white bg-opacity-10 text-zinc-100 rounded-lg my-1 mt-4">
    <div className="flex h-full flex-col h-full mx-6 pb-3 bg-white bg-opacity-10 text-zinc-100 rounded-lg my-1 pt-5 w-full">
      {filteredArray.map((message) => (
      <div key={message.messageId} className='my-2' >
        {message.emisor!=interlocutor && <p className='text-xs text-gray-100 text-right mr-5'>Usted</p>}
        <div className={`p-5 text-md bg-white text-gray-500 rounded-lg mx-2 ${usertype(message)}`}>
          {message.content}
          </div>
          </div>
      ))}
    </div>
  </div>
);
      }

export default ContentRendering;