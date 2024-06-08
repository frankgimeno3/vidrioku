"use client"
import { FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ConfigurationRender from './components/ConfigurationRender';
import LeftContent from './LeftContent';
import { User } from '../components/interfaces/interfaces';
import useUserSession from '../components/hooks/userSession';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';



const Configuracion: FC = ({ }) => {
  
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

    const [renderElement, setRenderElement] = useState<string>('none');

 
 


  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">

        <div className='flex flex-row  '>

          <LeftContent setRenderElement={setRenderElement} userData={userData} user={user}/>
          <ConfigurationRender renderElement={renderElement} setRenderElement={setRenderElement} />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Configuracion;