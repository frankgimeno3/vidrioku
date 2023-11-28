import React, { FC } from 'react'

interface ContentRenderingProps {
    interlocutor: any
    user: any
    messagesArray: any
   }
const ContentRendering: FC<ContentRenderingProps> = ({ interlocutor, user, messagesArray }) => {    
    return (
        <div className="flex h-full flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 mt-4  ">
            <div className="flex h-full flex-col  h-full mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1">
            </div>
        </div>
    )
}

export default ContentRendering