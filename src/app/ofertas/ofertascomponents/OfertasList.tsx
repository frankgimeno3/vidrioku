import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OfertasListProps {
 userData: any
}


const OfertasList: FC <OfertasListProps> = ({ userData }) => {
  const router = useRouter();
 

  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
 
    </div>
  );
};

export default OfertasList;