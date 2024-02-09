import React, { FC, useState } from 'react'
import Image from 'next/image'


interface rightElemsProps {
  user: any;
  userData: any;
}


const rightElems: FC<rightElemsProps> = ({ user, userData }) => {

  const [isRecorridoShown, setIsRecorridoShown] = useState(false)
  const [isEstudiosShown, setIsStudiosShown] = useState(false)
  const [isIdiomasShown, setIsIdiomasShown] = useState(false)

  const recorridoHandler = ()=>{
    if (isRecorridoShown == true) {setIsRecorridoShown(false)}
    else if (isRecorridoShown == false) {setIsRecorridoShown(true)}
  }
  const estudiosHandler = ()=>{
    if (isEstudiosShown == true) {setIsStudiosShown(false)}
    else if (isEstudiosShown == false) {setIsStudiosShown(true)}
  }
  const idiomasHandler = ()=>{
    if (isIdiomasShown == true) {setIsIdiomasShown(false)}
    else if (isIdiomasShown == false) {setIsIdiomasShown(true)}
  }

  return (
    <div className='max-h-screen mx-auto mt-5 text-center flex-1 overflow-y-auto overflow-x-hidden h-full'>
      <h2 className='font-bold'>Currículum vitae</h2>
      <div className='flex flex-col my-5 items-center '>
        <div className='flex flex-row'>
          <h3 className='mr-5'>Recorrido laboral</h3>
          <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
          <svg className='w-5 h-5 text-gray-100 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'
                    onClick={()=>recorridoHandler()}>
            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
          </svg>
        </div>
        {isRecorridoShown &&
          <>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2'>
              <div className='w-100 h-100 px-5'>
                <Image src={'/logos/1.png'} alt={''} width={100} height={100} className='pt-3 pb-2' />
                <div className='flex flex-col mt-2'>
                  <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mb-3 mr-1'>Editar </button>
                  <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mb-3'>Elminar </button>
                </div>
              </div>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Cargo</h2>
                <p>Empresa: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Lugar, País</p>
                <p>Descripción</p>
              </div>
            </div>

            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 '>
              <div className='w-100 h-100 px-5'>
                <Image src={'/logos/1.png'} alt={''} width={100} height={100} className='pt-3 pb-2' />
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mb-3'>Editar </button>
              </div>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Cargo</h2>
                <p>Empresa: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Lugar, País</p>
                <p>Descripción</p>
              </div>
            </div>
          </>}
      </div>

      <div className='flex flex-col my-5 items-center'>
        <div className='flex flex-row'>
          <h3 className='mr-5'>Estudios, títulos, certificados y reconocimientos</h3>
          <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
          <svg className='w-5 h-5 text-gray-100 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'
            onClick={()=>estudiosHandler()}>
            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
          </svg>
        </div>
        {isEstudiosShown &&
          <>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Concepto</h2>
                <p>Descripción: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Entidad emisora</p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Concepto</h2>
                <p>Descripción: </p>
                <p>Desde, Año - Hasta, Año</p>
                <p>Entidad emisora</p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
          </>}
      </div>
      <div className='flex flex-col my-5 items-center'>
        <div className='flex flex-row'>
          <h3 className='mr-5'>Idiomas</h3>
          <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
          <svg className='w-5 h-5 text-gray-100 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'
          onClick={()=>idiomasHandler()}>
            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
          </svg>
        </div>
        {isIdiomasShown &&
          <>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Idioma</h2>
                <p>Nivel: </p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
            <div className='flex flex-row bg-white justify-left rounded-md text-gray-500 my-2 items-center px-10 my-2'>
              <div className='flex flex-col text-left p-5 text-sm'>
                <h2>Idioma</h2>
                <p>Nivel: </p>
              </div>
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'>Editar </button>
            </div>
          </>}
      </div>
      <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mb-5'>Descargar Currículum en PDF</button>

    </div>
  )
}

export default rightElems