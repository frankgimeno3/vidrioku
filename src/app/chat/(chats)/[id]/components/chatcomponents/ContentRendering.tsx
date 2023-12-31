import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState, useRef } from 'react';

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

  useEffect(() => {
    fetchDoc();
  }, [messagesArray]);

  useEffect(() => {
    const sortedArray = [...renderingObjectArray].sort((a, b) => {
      const sentA = a.sent && typeof a.sent === 'string' ? a.sent : '';
      const sentB = b.sent && typeof b.sent === 'string' ? b.sent : '';

      return sentA.localeCompare(sentB);
    });

    setFilteredArray(sortedArray);
  }, [renderingObjectArray]);
 
  const scrollContainerRef = useRef<HTMLDivElement>(null);  // Referencia para el contenedor de scroll

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Ajusta la posición de scroll al final del contenedor
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [filteredArray]);

  const usertype = (message: any) => {
    return message.emisor === interlocutor ? 'mr-24' : 'ml-24';
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDoc();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex h-96 flex-row mx-6 pb-3 bg-white bg-opacity-10 text-zinc-100 rounded-lg my-1 mt-4"
         style={{ height: '600px' }} >
      <div className="flex h-full flex-col mx-6 pb-3 text-zinc-100 rounded-lg my-1 pt-5 w-full overflow-scroll"
           style={{ overflowX: 'auto' }}
           ref={scrollContainerRef}>  {/* Ref al contenedor de scroll */}
        {filteredArray.map((message) => (
          <div key={message.messageId} className='my-2' >
            {message.emisor !== interlocutor && <p className='text-xs text-gray-100 text-right mr-5'>Usted</p>}
            <div className={`px-4 py-3 text-md bg-white text-gray-500 rounded-lg mx-2 ${usertype(message)}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRendering;