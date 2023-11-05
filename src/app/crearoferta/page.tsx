"use client"
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';



const Crearoferta: FC = ({ }) => {
  const router = useRouter();



  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
         <h2>Crear oferta</h2>
      </div>
    </>
  );
};

export default Crearoferta;