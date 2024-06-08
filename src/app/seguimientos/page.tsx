"use client"
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';
import useUserSession from '../components/hooks/userSession';



const Seguimientos: FC = ({ }) => {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);


  return (
    <>
      <Navbar />

      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Seguimientos</h2>
        <div className=" mx-6  bg-white  h-full text-zinc-900">
          <div className="p-5">

          </div>
        </div>
      </div>
    </>
  );
};

export default Seguimientos;