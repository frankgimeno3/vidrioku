import React, { FC } from 'react'
import Image
 from 'next/image'
interface MessageListComponentProps {
   
}
const MessageListComponent: FC<MessageListComponentProps> = ({   }) => {

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
      <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de usuario</h2>

      <div className='flex flex-col'></div>
      <h2 className='mt-1 text-sm   mx-5'>El usuario
        <span className='font-bold'> Miquel Àngel Rodriguez </span>le ha enviado un mensaje </h2>
    </div>
  </div>
  )
}

export default MessageListComponent