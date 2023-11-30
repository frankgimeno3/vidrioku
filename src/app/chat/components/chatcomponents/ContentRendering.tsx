import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ContentRenderingProps {
 
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

const ContentRendering: FC = ({   }) => {
  const [renderingObjectArray, setRenderingObjectArray] = useState<Mensaje[]>([]);
  const [filteredArray, setFilteredArray] = useState<Mensaje[]>([]);
 

  return (
    <div className="flex h-96 flex-row mx-6 pb-3 bg-white bg-opacity-10 text-zinc-100 rounded-lg my-1 mt-4"
    style={{ height: '600px' }} >
      <div className="flex h-full flex-col  mx-6 pb-3  text-zinc-100 rounded-lg my-1 pt-5 w-full"
          style={{   overflowX: 'auto' }}
          >
              <p>Seleccione un chat para mostrar contenido aquí</p>
      </div>
    </div>
  );
};

export default ContentRendering;