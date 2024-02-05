"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ConfigurationRender from './components/ConfigurationRender';

interface User {
  id: any,
  userEmail: string;
  userType: string;
}

const Configuracion: FC = ({ }) => {
  const router = useRouter();
  const [userType, setUserType] = useState<string>('');
  
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  
  const [userData, setUserData] = useState('');
  const [user, setUser] = useState<any>();
  const [renderElement, setRenderElement] = useState<string>('none');

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {
      setUserData('Usuario');
    }
  }, [session?.data?.user?.email]);
  
  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUserType(myUserData.userType);
          setUser(myUserData)
         }
      }
    };

    fetchDoc();
  }, [userData]);
  

  return (
    <>
      <Navbar />
      <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        
        <div className='flex flex-row  '>

        <div className='flex flex-row h-full w-full flex shadow shadow-sm ' style={{ height: '800px', width: '500px' }}           >
        <div className="flex flex-col   flex  text-center justify-center w-full  bg-white text-gray-500  ">
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
              <p className="flex flex-row flex-wrap font-medium  mx-auto justify-center">
                <span className="mr-1">{user?.nombre}</span>
                <span className="capitalize">{user?.apellidos}</span>
              </p>
              <span  className='text-sm'>{user?.ubi}</span>
              <span className='italic text-sm'>{userData}</span>
            </div>
            <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>router.push('/perfil')}
             >Perfil Completo</button>
          </div>
          <div className='flex flex-col flex-1 pt-12 px-12'>
          <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>setRenderElement('cambiocontra')}
             >              Cambiar mi contraseña
             </button>
             <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>setRenderElement('cambioemail')}
             > Cambiar email
              </button>

            <button
              className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>setRenderElement('borrarcuenta')}
             >              Borrar cuenta
             </button>
          </div>
        </div>
      </div>
         <ConfigurationRender renderElement={renderElement} setRenderElement={setRenderElement}/>         
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Configuracion;