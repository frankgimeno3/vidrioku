import { FC, useEffect, useState } from 'react';
import ContentRendering from './chatcomponents/ContentRendering';
import ChatHeader from './chatcomponents/ChatHeader';


 

const Chatcontent: FC  = ({   }) => {
 
  
    return (
        <div className='flex flex-col h-full flex-1  '>
            <ChatHeader  />
             <ContentRendering  />
         </div>
    );
};

export default Chatcontent;