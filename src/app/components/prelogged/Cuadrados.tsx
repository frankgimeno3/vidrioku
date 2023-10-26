import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

const Cuadrados: React.FC = ({ }) => {
 

  return (
    <div className='flex flex-col md:flex-row text-center border border-red-200   '>
      <div className='flex flex-col  '>
        <div className="bg-white rounded shadow p-2 md:p-5 px-10 my-2 mx-5 h-96"  >

          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Departamento técnico
          </h3>
          <p className="mb-2">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
          </p>
          <Image src="/icons/dtecnico.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

        </div>
        <div className="bg-white rounded shadow p-2 md:p-5 px-10 my-2 mx-5 h-96"        >
          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Ingenieros
          </h3>
          <p className="mb-2">
            En nuestra bolsa específica de ingenieros encontrará personal licenciado en ingeniería, filtrado según su educación o experiencia previa
          </p>
          <Image src="/icons/ingenieros.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

        </div>
      </div>
      <div className='flex flex-col '>

        <div className="bg-white rounded shadow p-2 md:p-5 px-10 my-2 mx-5 h-96"        >
          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Operarios
          </h3>
          <p className="mb-2">
            Encuentre operarios de todo tipo, desde peones de fábrica, operarios de transporte, mantenimiento, y otros, todos ellos especializados en el sector del vidrio.
          </p>
          <Image src="/icons/operarios.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

        </div>
        <div className="bg-white rounded shadow p-2 md:p-5 px-10 my-2 mx-5 h-96"        >
          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Departamento comercial y compras
          </h3>
          <p className="mb-2">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
          </p>
          <Image src="/icons/comercialycompras.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

        </div>
      </div>
    </div>
  )
}
export default Cuadrados