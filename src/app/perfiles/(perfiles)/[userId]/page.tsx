"use client<>"
import React, { FC, useEffect } from 'react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import useUserSession from '@/app/components/hooks/userSession';
import { selectUser } from '@/redux/features/userSlice';
 import { useSelector } from 'react-redux';
 import { selectParamsId, setParamsId } from '@/redux/features/paramsSlice';

import PerfilesEmpresas from './components/empresas/perfilesEmpresas';
import PerfilesProfesionales from './components/profesionales/perfilesProfesionales';
interface PerfilesProps {
  params: { id: string };

}

const Perfiles: FC<PerfilesProps> = ({params}) => {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(setParamsId(params.id));
  }, [dispatch, params.id]);

  const paramsId = useSelector(selectParamsId);

  useEffect(() => {
    console.log("paramsId: ", paramsId)
  }, [paramsId]);


  return (
    <div className=" ">

    <Navbar />
  <main className=' bg-gradient-to-b from-zinc-900 to-zinc-600  min-h-screen '>
    {user?.userType == 'empresa' && <PerfilesEmpresas  />}
    {user?.userType == 'profesional' &&<PerfilesProfesionales /> }

  </main>
    <Footer  />
</div>
  );
};

export default Perfiles;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
