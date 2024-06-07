import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { updateUser } from '@/redux/features/userSlice';

interface User {
  id: any;
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
}

const useUserSession = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const docRef = doc(db, 'users', session.user.email);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const userData = response.data() as User;
          setUserData(userData);
          dispatch(updateUser(userData));
        }
      } else {
        router.push('/auth/login');  
      }
    };

    fetchUserData();
  }, [session, dispatch, router]);

  return { userData, session };
};

export default useUserSession;
