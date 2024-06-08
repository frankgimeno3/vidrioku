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
import useUserSession from '../components/hooks/userSession';
 

export default function Dashboard() {
  const [userType, setUserType] = useState<string>('');
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
 
   
 
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