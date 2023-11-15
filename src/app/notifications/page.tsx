"use client"
import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

// interface NavbarProps {
//   currentComponent: string;
//   setCurrentComponent: (component: string) => void;
// }

// const Navbar: FC<NavbarProps> = ({ currentComponent, setCurrentComponent }) => {

const Notifications: FC = ({ }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);



  return (
    <>
      <Navbar  />

    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Notificaciones</h2>
        <div className='flex flex-col '>
          <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-6">
            <h2 className='mt-2 text-md text-center px-8 pt-5'>Tienes <span className='font-bold'>4</span> notificaciones nuevas</h2>

            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Mensaje</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>La empresa
                <span className='font-bold'> VIDRIOPERFIL </span>le ha enviado un mensaje </h2>
            </div>

            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Oportunidad</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>Hay
                <span className='font-bold'> 3 </span>nuevas ofertas de trabajo, que encajan con tu perfil en Barcelona </h2>
            </div>
            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Seguimientos</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>La empresa
                <span className='font-bold'> GLASTON </span> ha publicado 3 nuevas ofertas de empleo</h2>
            </div>
            <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Mensaje</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>El usuario
                <span className='font-bold'> Alex Gimeno </span>le ha enviado un mensaje </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;