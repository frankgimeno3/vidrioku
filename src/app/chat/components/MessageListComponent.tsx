import React, { FC, useEffect, useState } from 'react'
import Image
 from 'next/image'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
interface MessageListComponentProps {
  value:any
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

const MessageListComponent: FC<MessageListComponentProps> = ({ value}) => {
  const [interlocutor, setInterlocutor] = useState<User>()
  useEffect(() => {
    const fetchDoc = async () => {
        if (value) {
            const docRef = doc(db, "users", value);
            const response = await getDoc(docRef);
            if (response.exists()) {
                const interlocutorData = response.data() as User;
                setInterlocutor(interlocutorData);
            }
        }
    };

    fetchDoc();
}, [value]);

   return (
    <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1">
    <div>
      <Image
        src="/profilepictures/2.jpg"
        alt="ing1"
        width={100}
        height={100}
        className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
      />
    </div>

    <div className='flex flex-col px-3 flex-3'>
      <h2 className='text-right  pt-2 text-gray-400 text-sm'>{value}</h2>

      <div className='flex flex-col'></div>
      <h2 className='mt-1 text-sm   mx-5'>El usuario
        <span className='font-bold'> Miquel Àngel Rodriguez </span>le ha enviado un mensaje </h2>
    </div>
  </div>
  )
}

export default MessageListComponent