import React, { FC, useEffect, useState } from 'react';
import { updateUser, selectUser } from '@/redux/features/userSlice';
import { Providers } from '@/redux/provider';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../components/interfaces/interfaces';
import useUserSession from '../components/hooks/userSession';
 
interface MispublicacionesProps {
  
}

const Mispublicaciones: FC<MispublicacionesProps> = ({ }) => {
    const dispatch = useDispatch();
    const { userData, session } = useUserSession();
    const user = useSelector(selectUser); 
    
 
       

      
  return (
    <div>Mispublicaciones</div>
  );
};

export default Mispublicaciones;

function setUserType(userType: any) {
    throw new Error('Function not implemented.');
}
