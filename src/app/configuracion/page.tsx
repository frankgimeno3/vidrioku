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

          <LeftContent setRenderElement={setRenderElement} userData={userData} user={user}/>
          <ConfigurationRender renderElement={renderElement} setRenderElement={setRenderElement} />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Configuracion;