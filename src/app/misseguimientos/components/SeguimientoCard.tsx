import React, { FC } from 'react';

interface SeguimientoCardProps {
  
}

const SeguimientoCard: FC<SeguimientoCardProps> = ({ }) => {
  return (
    <div className='bg-white shadow-xl rounded-lg p-12 p-12 text-gray-600'>
        <p className='font-bold'>User name</p>
        <p>User type</p>
        <button>Ver perfil completo</button>
        <button>Dejar de seguir</button>
    </div>
  );
};

export default SeguimientoCard;