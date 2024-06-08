"use client"
import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';
import useUserSession from '../components/hooks/userSession';
import Seguidocard from './Seguidocard';

const Seguimientos: FC = ({ }) => {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);


  return (
    <>
      <Navbar />

      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Seguimientos</h2>
        <div className="mx-6 bg-white bg-opacity-50 h-full text-zinc-900 p-5">
          {user?.seguidos?.map((id: string) => (
            <Seguidocard key={id} id={id} />
          ))}
          {user?.seguidos == undefined || user?.seguidos == null &&
          <p>No se encontró contenido a mostrar</p>}
        </div>
      </div>
    </>
  );
};

export default Seguimientos;
