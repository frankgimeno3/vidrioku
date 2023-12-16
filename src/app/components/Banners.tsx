import React from 'react'
import Image from 'next/image'

function Banners() {
  return (
         <div className='flex flex-col border border-red-300 overflow-hidden bg-white h-[800px]'>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner.jpg'}
              alt={''}
              width={300} // Ajusta este valor según sea necesario
              height={400}
              objectFit="cover"
            />
          </div>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner.jpg'}
              alt={''}
              width={300} // Ajusta este valor según sea necesario
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
   )
}

export default Banners