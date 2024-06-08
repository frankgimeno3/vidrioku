import useUserSession from '@/app/components/hooks/userSession';
import { selectUser } from '@/redux/features/userSlice';
import React from 'react'
import { useSelector } from 'react-redux';

function page() {
  const { userData, session } = useUserSession();
  const user = useSelector(selectUser);
  return (
    <div>
        <p>Se pilla user id por params, se hace fetch, y pillamos el type</p>
        <p>Renderizar una cosa u otra dependiendo de lo que sea</p>
        <p>Lo mismo que en perfil, pero sin botones de editar</p>
    </div>
  )
}

export default page