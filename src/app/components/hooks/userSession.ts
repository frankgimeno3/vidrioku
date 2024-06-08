"use client"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { updateUser } from '@/redux/features/userSlice';
import { User } from '../interfaces/interfaces'; 

interface UserSession {
  userData: User | null; // Ensure userData is a User object or null
  session: any; // Adjust the type as needed
  userType: string;
}

const useUserSession = (): UserSession => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null); // Ensure userData is a User object or null
  const [userType, setUserType] = useState<string>('');

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  useEffect(() => {
    const fetchDoc = async () => {
      if (session?.data?.user?.email) {
        const docRef = doc(db, "users", session.data.user.email);  
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          dispatch(updateUser(myUserData));
          setUserType(myUserData.userType);
          setUserData(myUserData);
        }
      } else {
        setUserData(null);
      }
    };
    fetchDoc();
  }, [session?.data?.user?.email, dispatch]);

  return { userData, session, userType };
};

export default useUserSession;
