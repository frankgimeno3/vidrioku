import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// interface NavbarProps {
//   currentComponent: string;
//   setCurrentComponent: (component: string) => void;
// }

// const Navbar: FC<NavbarProps> = ({ currentComponent, setCurrentComponent }) => {

const HOME: FC = ({ }) => {
  const router = useRouter();
  const [usuario, setUsuario] = useState("Frank")


  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Bienvenido, {usuario}</h2>
      <div className='flex flex-col '>
        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-6">
          <div className='px-12 py-5 '>
            <h2 className='text-center font-bold '>Notificaciones</h2>
            <h2 className='mt-3 text-sm mb-2'>Tienes <span className='font-bold'>4</span> notificaciones nuevas</h2>
          </div>
        </div>

        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6">
          <div className='text-center py-5'>
            <h2 className='text-center font-bold '>Mensajes</h2>
            <h2 className='mt-3 text-sm mb-2'>Tienes <span className='font-bold'>3 </span>mensajes de <span className='font-bold'>2</span> conversaciones</h2>
          </div>
        </div>

        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6">
          <div className='text-center py-5'>
            <h2 className='text-center font-bold '>Seguimientos</h2>
            <h2 className='mt-3 text-sm mb-2 px-7'>Hay <span className='font-bold'>2 </span>nuevas ofertas que se ajustan a tu perfil</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOME;