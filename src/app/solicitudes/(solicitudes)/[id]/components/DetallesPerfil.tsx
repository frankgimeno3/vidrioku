import React, { FC } from 'react'

type perfilProps = {
    usuario: any;
 };
 
 const DetallesPerfil: FC< perfilProps> = ({ usuario }) => {

   return (
    <div className='bg-white py-5 text-gray-500'>DetallesPerfil</div>
  )
}

export default DetallesPerfil