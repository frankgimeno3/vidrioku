'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { getDoc, doc, } from 'firebase/firestore';
import { db } from './../firebase';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeEmpr from './components/HomeEmpr'
import HomeTrab from './components/HomeTrab';
import HomeAdmin from './components/HomeAdmin';
import { selectUser, updateUser } from '@/redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../components/interfaces/interfaces';
 

export default function Dashboard() {
  const [userType, setUserType] = useState<string>('');
  

  const dispatch = useDispatch();
  const [userData, setUserData] = useState('');

  const user = useSelector(selectUser); 

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

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
          dispatch(updateUser(myUserData));
          setUserType(myUserData.userType);

        }
      }
    };
    fetchDoc();
  }, [userData, dispatch]);
  
 
  return (
    <div className=" ">

      <main className=' bg-gradient-to-b from-zinc-900 to-zinc-600   '>
        <Navbar />
        {userType == 'empresa' && <HomeEmpr userData={userData} />}
        {userType == 'profesional' &&<HomeTrab userData={userData} /> }
        {userType == 'admin' &&<HomeAdmin userData={userData} /> }
        <Footer  />

      </main>
    </div>
  )
}

Dashboard.requireAuth = true