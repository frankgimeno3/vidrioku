import React, { FC } from 'react';
import Image from 'next/image';

interface ChatHeaderProps {
  interlocutor: string | null;
  interlocutorImg: string | null;
}

const ChatHeader: FC<ChatHeaderProps> = ({ interlocutor, interlocutorImg }) => {
  return (
    <div className="flex flex-row items-center pb-2 bg-white bg-opacity-10">
      <div>
        <Image
          src={interlocutorImg || "/icons/empty-user-profile.png"}
          alt="Profile Image"
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
