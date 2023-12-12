'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, where, DocumentSnapshot, DocumentData, } from 'firebase/firestore';
import { db } from './../firebase';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeEmpr from './components/HomeEmpr'
import HomeTrab from './components/HomeTrab';
import HomeAdmin from './components/HomeAdmin';


interface User {
  id: any,
  userEmail: string;
  userType: string;
}


export default function Dashboard() {
  const [userType, setUserType] = useState<string>('');
  
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  
  const [userData, setUserData] = useState('');
  const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData> | null>(null);

  const router = useRouter();
  

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
         }
      }
    };

    fetchDoc();
  }, [userData]);
  

  return (
    <div className=" ">

      <main className=' bg-gradient-to-b from-zinc-900 to-zinc-600   '>
        <Navbar />
        {userType == 'empresa' && <HomeEmpr userData={userData} />}
        {userType == 'profesional' &&<HomeTrab userData={userData} /> }
        {userType == 'admin' &&<HomeAdmin userData={userData} /> }
        {/* <Footer onPageChange={handlePageChange} /> */}

      </main>
    </div>
  )
}

Dashboard.requireAuth = true