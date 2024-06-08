import React, { FC } from 'react';
import useUserSession from '../components/hooks/userSession';
import { selectUser } from '@/redux/features/userSlice';
import { useSelector } from 'react-redux';

interface MisSeguimientosProps {
  
}

const MisSeguimientos: FC<MisSeguimientosProps> = ({ }) => {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  
  return (
    <div>
        <p>Aqui debería de sacarse un listado con seguimientocards</p>
        <p>Un map a user, de ahi seguimientos</p>
        <p>cada seguimiento debe de ser un user</p>
        <p>Hay que pasar a cada card la info correspondiente de cada uno de esos seguimientos</p>
    </div>
  );
};

export default MisSeguimientos;