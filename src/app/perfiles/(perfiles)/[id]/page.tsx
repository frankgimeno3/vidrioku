"use client"
import React, { FC, useEffect, useState } from 'react';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import useUserSession from '@/app/components/hooks/userSession';
import { selectUser } from '@/redux/features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectParamsId, setParamsId } from '@/redux/features/paramsSlice';
import PerfilesEmpresas from './components/empresas/perfilesEmpresas';
import PerfilesProfesionales from './components/profesionales/perfilesProfesionales';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface PerfilesProps {
  params: { id: string };
}

const Perfiles: FC<PerfilesProps> = ({ params }) => {
  const dispatch = useDispatch();
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  const [selectedUserType, setSelectedUserType] = useState<string | undefined>();
  const [decodedParams, setDecodedParams] = useState<any>()

  useEffect(() => {
    dispatch(setParamsId(params.id));
  }, [dispatch, params.id]);

  const paramsId = useSelector(selectParamsId);

  useEffect(() => {
    const decodedParamsId = decodeURIComponent(paramsId);  
    setDecodedParams(decodedParamsId);
  }, [paramsId]);

  useEffect(() => {
    const fetchUserDoc = async () => {
      if (decodedParams) {
        try {
          const docRef = doc(db, "users", decodedParams);  
          const userDoc = await getDoc(docRef);
  
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setSelectedUserType(userData.userType);
          } else {
            console.error('El documento del usuario no existe');
          }
        } catch (error) {
          console.error('Error al buscar empresa por id:', error);
        }
      } else {
        console.error('paramsId es nulo o indefinido');
      }
    };
  
    fetchUserDoc();
  }, [decodedParams]);
  

  return (
    <div className="">
      <Navbar />
      <main className='bg-gradient-to-b from-zinc-900 to-zinc-600 min-h-screen'>
        {selectedUserType === 'empresa' && <PerfilesEmpresas id={decodedParams} />}
        {selectedUserType === 'profesional' && <PerfilesProfesionales id={decodedParams} />}
      </main>
      <Footer />
    </div>
  );
};

export default Perfiles;
