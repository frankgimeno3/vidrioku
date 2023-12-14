import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react' 
import Link from "next/link";
import Email from './Email';

const inter = Inter({ subsets: ['latin'] })

const Contactenos: React.FC = ({  }) => {

 
  return (
    <>
    <div className="flex flex-col p-10 bg-gray-100 p-4 w-full ">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl mt-8  text-center text-gray-700 font-medium my-5">Sobre Nosotros</h1>
        <div className="flex flex-col mx-12 md:mx-24 pb-5 text-gray-850 font-light">
          <div
            className="flex border border-gray-100 flex-col items-center justify-center shadow-xl bg-white rounded-xl my-4 h-36"
           >
            <p className="  md:text-xl text-base text-center px-8 p-2">
              <span className='font-medium'>Facilitamos la conexión </span> entre aquellos que buscan talento y
              aquellos que poseen un conocimiento especializado.
            </p>
            {/* <Image src="/icons/handshake.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}
          </div>

          <div
            className="flex border border-gray-100 flex-col items-center justify-center shadow-xl bg-white rounded-xl my-4 h-36"
           >
            <p className="  md:text-xl text-base text-center px-8 p-2">
              Ofrecemos un <span className='font-medium'>sistema de chat</span> para facilitar el contacto
            </p>
            {/* <Image src="/icons/message.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}

          </div>

          <div
            className=" flex border border-gray-100 flex-col items-center justify-center shadow-xl bg-white rounded-xl my-4 h-56 md:h-36"
            
          >
            <p className="  md:text-xl text-base text-center px-8 p-2">
             Contamos con un sistema de alertas y notificaciones, para que pueda <span className='font-medium'>recibir avisos</span> cuando tengamos algún candidato u oferta que encaje con sus expectativas
            </p>
            {/* <Image src="/icons/bell.png" alt="Logo3" width={190} height={190}  className='opacity-60 mx-auto hover:opacity-100'/> */}

          </div>
        </div>
        
 
      </div>
    </div>
    <div className="mt-10 pb-10 flex-column justify-center ">
      <div className="flex justify-center mx-auto text-base   ">
        <Email/>
      </div>
    </div>
  </>
  )
}
export default Contactenos