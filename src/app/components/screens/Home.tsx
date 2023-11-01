import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HomeProps {
 userData: any
}

// const Navbar: FC<NavbarProps> = ({ currentComponent, setCurrentComponent }) => {

const HOME: FC <HomeProps> = ({ userData }) => {
  const router = useRouter();
 
  useEffect(() => {
    console.log("userdata: ", {userData})
  }, []);

  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Bienvenido, {userData}</h2>
 
     </div>
  );
};

export default HOME;