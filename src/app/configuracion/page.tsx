"use client"
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Configuracion: FC = ({ }) => {
  const router = useRouter();



  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Configuración</h2>
        <div className=" mx-6  bg-white  h-full text-zinc-900">
          <div className="p-5">
            Cambiar mi contraseña
          </div>
          <div className="p-5">
            Cambiar email
          </div>
          <div className="p-5">
            Denunciar usuario
          </div>
          <div className="p-5">
            Borrar cuenta
          </div>
        </div>
      </div>
      <Footer  />

    </>
  );
};

export default Configuracion;