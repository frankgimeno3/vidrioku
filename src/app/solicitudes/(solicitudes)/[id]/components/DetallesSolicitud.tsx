import React, { FC } from 'react'

type solicitudProps = {
    solicitudId: any;
 };
 

const DetallesSolicitud: FC<solicitudProps> = ({solicitudId}) => {
  return (
    <div className='bg-white py-5 text-gray-500'>DetallesSolicitud</div>
  )
}

export default DetallesSolicitud