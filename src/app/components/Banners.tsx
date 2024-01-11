import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface BannerProps {
    widthProp: any;  
}

const Banners: FC<BannerProps> = ({ widthProp }) => {

   return (
         <div className='flex flex-col  overflow-hidden bg-white h-[800px]'>
          <Link href={'https://www.google.com/'}>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner2.jpg'}
              alt={''}
              width={widthProp} // Ajusta este valor según sea necesario
              height={0}
              style={{objectFit:"cover"}}            />
          </div>
          </Link>
          <Link href={'https://www.google.com/'}>
          <div className='h-1/2'>
            <Image
              src={'/inventedlogos/banner2.jpg'}
              alt={''}
              width={widthProp} // Ajusta este valor según sea necesario
              height={0}
              style={{objectFit:"cover"}}            />
          </div>
          </Link>
        </div>
   )
}

export default Banners