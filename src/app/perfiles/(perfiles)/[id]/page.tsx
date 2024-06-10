"use client"
import React, { FC, useEffect } from 'react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import useUserSession from '@/app/components/hooks/userSession';
import { selectUser } from '@/redux/features/userSlice';
import { useSelector, useDispatch } from 'react-redux';  // Asegúrate de importar useDispatch
import { selectParamsId, setParamsId } from '@/redux/features/paramsSlice';

import PerfilesEmpresas from './components/empresas/perfilesEmpresas';
import PerfilesProfesionales from './components/profesionales/perfilesProfesionales';

interface PerfilesProps {
  params: { id: string };
}

const Perfiles: FC<PerfilesProps> = ({ params }) => {
  const dispatch = useDispatch();  // Usa useDispatch
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(setParamsId(params.id));
  }, [dispatch, params.id]);

  const paramsId = useSelector(selectParamsId);

  useEffect(() => {
    console.log("paramsId: ", paramsId);
  }, [paramsId]);

  return (
    <div className="">
      <Navbar />
      <main className='bg-gradient-to-b from-zinc-900 to-zinc-600 min-h-screen'>
        {user?.userType === 'empresa' && <PerfilesEmpresas id={params.id} />}
        {user?.userType === 'profesional' && <PerfilesProfesionales id={params.id} />}
      </main>
      <Footer />
    </div>
  );
};

export default Perfiles;
