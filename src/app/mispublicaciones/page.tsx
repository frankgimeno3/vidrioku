import React, { FC, useEffect, useState } from 'react';
import { updateUser, selectUser } from '@/redux/features/userSlice';
import { Providers } from '@/redux/provider';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../components/interfaces/interfaces';
 
interface MispublicacionesProps {
  
}

const Mispublicaciones: FC<MispublicacionesProps> = ({ }) => {
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
              setUserType(myUserData.userType);
             }
          }
        };
    
        fetchDoc();
      }, [userData]);

      
  return (
    <div>Mispublicaciones</div>
  );
};

export default Mispublicaciones;

function setUserType(userType: any) {
    throw new Error('Function not implemented.');
}
