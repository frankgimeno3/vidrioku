import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfesionalesListProps {
 userData: any
}


const ProfesionalesList: FC <ProfesionalesListProps> = ({ userData }) => {
  const router = useRouter();
 

  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
             contenido listado profesionales
    </div>
  );
};

export default ProfesionalesList;