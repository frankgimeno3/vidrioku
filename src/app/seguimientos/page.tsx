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

  const router = useRouter()
  const handleEncontrarEmpresas = () => {
    router.push('/search/ofertas')
  }
  const handleEncontrarProfesionales = () => {
    router.push('/search/profesionales')
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 h-full">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Seguimientos</h2>
        <div className="mx-6 bg-white bg-opacity-50   text-zinc-900 p-5 ">
          {user?.seguidos[0] != '' && user?.seguidos?.map((id: string) => (
            <Seguidocard key={id} id={id} />
          ))}
          {user?.seguidos == undefined || user?.seguidos == null || user?.seguidos[0] == '' &&
            <div className='text-gray-600 bg-white text-center py-12 '>
              <p className='text-center font-light text-gray-500 text-xl px-12 pt-5'>En estos momentos no sigues a ningún otro usuario, o no se han encontrado publicaciones de los usuarios que sigues</p>
              <p className='text-center font-light text-gray-500 text-lg px-12  pt-24'> Encuentra empresas o usuarios a los que seguir</p>
              <button onClick={handleEncontrarEmpresas}
                className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-2 text-sm m-1 mb-6"
              >Encontrar empresas</button>
              <button onClick={handleEncontrarProfesionales}
                className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-2 text-sm m-1 mb-6"
              >Encontrar profesionales</button>
            </div>}
        </div>
      </div>
    </>
  );
};

export default Seguimientos;
