import React, { FC } from 'react'
import Image from 'next/image';

interface AdvertComponentProps {
    bannerName: any;
     bannerUrl: any;
     activo: any;
}

const  AdvertComponent : FC<AdvertComponentProps> = ({ bannerName, activo,  bannerUrl}) => {
  return (
    <>
        <div className='flex flex-row mx-auto px-36 py-12 bg-gray-300 my-2 rounded-lg shadow-lg'>
          <div className='flex flex-col'>
            <Image src={bannerUrl} alt={''} height={250} width={100} />
          <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
            > Cambiar banner</button>
          </div>
          <div className='flex flex-col px-12'>
            <p><span className='font-medium mr-1'>Nombre: </span> {bannerName}</p>
            <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
            > Cambiar nombre</button>
            <p><span className='font-medium mr-1 mt-12'>Estado: </span> {activo} </p>
            <button
              className='bg-white p-2 px-3 rounded-lg shadow-lg text-xs hover:bg-gray-50 border-gray-100 text-gray-500 my-2'
            > Cambiar estado</button>
          </div>
        </div>
    </>
  )
}

export default AdvertComponent