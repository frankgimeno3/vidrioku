import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react' 
import Link from "next/link";
import Email from './Email';

const inter = Inter({ subsets: ['latin'] })

const Contactenos: React.FC = ({  }) => {

 
  return (
    <>
    <div className="flex flex-col p-10 bg-white bg-opacity-40 p-4 w-full">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl mt-2 mb-3 text-center text-white">Sobre Nosotros</h1>
        <div className="flex grid grid-cols-3 gap-10 p-5 text-black">
          <div
            className="flex flex-col items-center justify-center shadow-md bg-white rounded-lg"
            style={{ height: "45vh" }}
          >
            <p className="  text-base text-center px-8 p-2">
              Facilitamos la conexión entre aquellos que buscan talento y
              aquellos que poseen un conocimiento especializado.
            </p>
            <Image src="/icons/handshake.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

          </div>

          <div
            className="flex flex-col items-center justify-center shadow-md bg-white rounded-lg"
            style={{ height: "45vh" }}
          >
            <p className=" text-base text-center p-8">
              Ofrecemos un sistema de chat para facilitar el contacto
            </p>
            <Image src="/icons/message.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

          </div>

          <div
            className="flex flex-col items-center justify-center shadow-md bg-white rounded-lg"
            style={{ height: "45vh" }}
          >
            <p className="  text-base text-center p-8">
             Contamos con un sistema de alertas y notificaciones, para que pueda recibir avisos cuando tengamos algún candidato u oferta que encaje con sus expectativas
            </p>
            <Image src="/icons/bell.png" alt="Logo3" width={190} height={190}  className='opacity-60 mx-auto hover:opacity-100'/>

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