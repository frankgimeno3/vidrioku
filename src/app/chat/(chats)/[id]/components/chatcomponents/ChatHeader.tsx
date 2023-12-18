import React, { FC, useEffect } from 'react';
import Image from 'next/image';

interface User {
  id: any;
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
}

interface ChatHeaderProps {
  interlocutor: any;
  interlocutorImg:any;
}

const ChatHeader: FC<ChatHeaderProps> = ({ interlocutor, interlocutorImg }) => {

  // useEffect(() => {
  //   alert(interlocutorImg)
  // }, [interlocutorImg]);

  return (
    <div className="flex flex-row items-center pb-2 bg-white bg-opacity-10">
      <div>
        <Image
          src={interlocutorImg || "/icons/empty-user-profile.png"}
          alt="ing1"
          width={50}
          height={50}
          className="shadow-lg rounded-full flex-1 mt-3 ml-3"
          priority={false}
        />
      </div>

      <h2 className="pt-2 px-3">{interlocutor || "Seleccione un chat para interactuar"}</h2>
    </div>
  );
};

export default ChatHeader;