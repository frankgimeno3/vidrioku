import Link from 'next/link';
import React, { FC, useState } from 'react'

interface componenteFinalProps {
  user: any;
}

const componenteFinal: FC<componenteFinalProps> = ({ }) => {


  return (
    <div className='text-gray-800'>
      <p>Ha completado el cuestionario</p>
      <Link href={'/perfil'}>
        <button className='w-56 mx-auto py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'>
          Guardar y seguir
        </button>
      </Link>
    </div>
  )
}

export default componenteFinal