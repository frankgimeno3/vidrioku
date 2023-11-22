import React, { FC } from 'react'


type ofertaProps = {
     oferta: any;
 };
 

const DetallesOferta: FC< ofertaProps> = ({ oferta }) => {
  return (
    <div className='bg-white py-5 text-gray-500'>DetallesOferta</div>
  )
}

export default DetallesOferta