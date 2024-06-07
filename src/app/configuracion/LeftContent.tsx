import { useRouter } from 'next/navigation';  // Correct import for useRouter
import React, { FC } from 'react';  // Correct import for React

interface LeftContentProps {
  setRenderElement: any;
  userData: any;
  user: any;
}

const LeftContent: FC<LeftContentProps> = ({ setRenderElement, userData, user }) => {
  const router = useRouter();

  const handlePerfilRedirection = () => {
    router.push('/perfil');
  };

  return (
    <div className="flex flex-col flex text-center justify-center h-full w-full flex shadow shadow-sm bg-white text-gray-500" style={{ height: '800px', width: '500px' }}>
      <div className='bg-gradient-to-b from-cyan-600 to-zinc-700 h-full px-12 flex flex-col py-12 flex-1'>
        <div className="relative w-44 h-44 overflow-hidden rounded-full mx-auto my-5 shadow-xl">
          <img
            src={user?.profilepicture || "/icons/empty-user-profile.png"}
            alt=""
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className='flex flex-col text-md text-center text-white'>
          <p className="flex flex-row flex-wrap font-medium mx-auto justify-center">
            <span className="mr-1">{user?.nombre}</span>
            <span className="capitalize">{user?.apellidos}</span>
          </p>
          <span className='text-sm'>{user?.ubi}</span>
          <span className='italic text-sm'>{userData}</span>
        </div>
        <button
          className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
          onClick={handlePerfilRedirection}
        >
          Perfil Completo
        </button>
      </div>
      <div className='flex flex-col flex-1 pt-12 px-12'>
        <button
          className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
          onClick={() => setRenderElement('cambiocontra')}
        >
          Cambiar mi contraseña
        </button>
        <button
          className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
          onClick={() => setRenderElement('cambioemail')}
        >
          Cambiar email
        </button>

        <button
          className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
          onClick={() => setRenderElement('borrarcuenta')}
        >
          Borrar cuenta
        </button>
      </div>
    </div>
  );
};

export default LeftContent;
