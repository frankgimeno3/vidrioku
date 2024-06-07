import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { updateUser } from '@/redux/features/userSlice';
import { User } from '../interfaces/interfaces'; 

const useUserSession = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState<string | null>(null); // Ensure userData is a string or null
  const [userType, setUserType] = useState<string>('');

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
      setUserData("Usuario");
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
           setUserData(myUserData.email || "Usuario");
        }
      }
    };
    fetchDoc();
  }, [userData, dispatch]);

  return { userData, session, userType };
};

export default useUserSession;
