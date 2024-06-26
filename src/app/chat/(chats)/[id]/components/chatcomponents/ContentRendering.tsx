import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState, useRef } from 'react';
import { Mensaje, User } from '../../../../../components/interfaces/interfaces';

interface ContentRenderingProps {
  interlocutor: string | null;
  userId: string | null;
  messagesArray: string[] | null;
  isLoading: any;
  setIsLoading:any
}


const ContentRendering: FC<ContentRenderingProps> = ({ interlocutor, userId, messagesArray, isLoading, setIsLoading }) => {
  const [renderingObjectArray, setRenderingObjectArray] = useState<Mensaje[]>([]);
  const [filteredArray, setFilteredArray] = useState<Mensaje[]>([]);
  const fetchDoc = async () => {
    if (messagesArray) {
      const newArray: Mensaje[] = [];

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
    if(messagesArray== undefined){setIsLoading(true)}
    if(messagesArray!= undefined){setIsLoading(false)}
  }, [messagesArray]);

  useEffect(() => {
    const sortedArray = [...renderingObjectArray].sort((a, b) => {
      const sentA = a.sent && typeof a.sent === 'string' ? a.sent : '';
      const sentB = b.sent && typeof b.sent === 'string' ? b.sent : '';

      return sentA.localeCompare(sentB);
    });

    setFilteredArray(sortedArray);
  }, [renderingObjectArray]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [filteredArray]);

  const usertype = (message: Mensaje) => {
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
      {isLoading == false &&
        <div className="flex h-full flex-col mx-6 pb-3 text-zinc-100 rounded-lg my-1 pt-5 w-full overflow-scroll" style={{ overflowX: 'auto' }} ref={scrollContainerRef}>
        {filteredArray.map((message) => (
          <div key={message.messageId} className='my-2' >
            {message.emisor !== interlocutor && <p className='text-xs text-gray-100 text-right mr-5'>Usted</p>}
            <div className={`px-4 py-3 text-md bg-white text-gray-500 rounded-lg mx-2 ${usertype(message)}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>}
      {isLoading == true &&
        <div className="flex h-full flex-col mx-6 pb-3 text-zinc-100 rounded-lg my-1 pt-5 w-full overflow-scroll" style={{ overflowX: 'auto' }} ref={scrollContainerRef}>
        <p className='py-auto'> Cargando...</p>
      </div>}
    </div>
  );
};

export default ContentRendering;