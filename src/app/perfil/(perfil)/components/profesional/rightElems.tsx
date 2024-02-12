import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import RecorridoCard from './cards/recorridoCard';
import EstudiosCard from './cards/estudiosCard';
import IdiomasCard from './cards/idiomaCard';

interface rightElemsProps {
  user: any;
  userData: any;
  setIsRecorridoSelected: any;
  setIsEstudiosSelected: any;
  setIsIdiomasSelected: any;
}


const rightElems: FC<rightElemsProps> = ({ user, userData, setIsRecorridoSelected, setIsEstudiosSelected, setIsIdiomasSelected }) => {

  const [isRecorridoShown, setIsRecorridoShown] = useState(true)
  const [isEstudiosShown, setIsStudiosShown] = useState(true)
  const [isIdiomasShown, setIsIdiomasShown] = useState(true)
  const [receivedUser, setReceivedUser] = useState<any>()

  useEffect(() => {
    if (user) console.log("recorridoLaboral: ", user?.recorridoLaboral)
  }, [user])

  const recorridoHandler = () => {
    if (isRecorridoShown == true) { setIsRecorridoShown(false) }
    else if (isRecorridoShown == false) { setIsRecorridoShown(true) }
  }
  const estudiosHandler = () => {
    if (isEstudiosShown == true) { setIsStudiosShown(false) }
    else if (isEstudiosShown == false) { setIsStudiosShown(true) }
  }
  const idiomasHandler = () => {
    if (isIdiomasShown == true) { setIsIdiomasShown(false) }
    else if (isIdiomasShown == false) { setIsIdiomasShown(true) }
  }

  return (
    <div className='flex flex-col mx-8 flex-1 py-8  text-gray-500 '>
      <h2 className='text-white py-2'>Currículum vitae </h2>
      <div className='flex flex-col mb-1 items-center '>
        <div className='flex flex-col   w-full mx-12 p-5 text-gray-50'>
          <h3 className='mr-5'>Recorrido laboral</h3>
          <div className='flex flex-row'>

            {isRecorridoShown == false &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => recorridoHandler()}>
                <div className='flex flex-row'>
                  <p>Mostrar experiencia</p>
                  <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            {isRecorridoShown == true &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => recorridoHandler()}>
                <div className='flex flex-row'>
                  <p>Ocultar experiencia</p>
                  <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'
                    onClick={() => recorridoHandler()}>
                    <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs  mx-2'
              onClick={() => { setIsRecorridoSelected(true) }}>Añadir experiencia</button>
          </div>

          {isRecorridoShown && (
            <div className='w-full'>
              {user?.recorridoLaboral?
                user.recorridoLaboral.map((recorrido: any, index: number) => (
                  <RecorridoCard
                    key={index}
                    Cargo={recorrido?.cargo}
                    Empresa={recorrido?.empresa}
                    Desde={recorrido?.desde}
                    Hasta={recorrido?.hasta}
                    Lugar={recorrido?.lugar}
                    Descripcion={recorrido?.descripcion}
                  />
                ))
                :
                <p>No has añadido ninguna experiencia laboral a tu CV</p>
              }
            </div>
          )}

        </div>
      </div>

      <div className='flex flex-col   mb-1 items-center'>
        <div className='flex flex-col w-full mx-12 p-5 text-gray-50'>
          <h3 className='mr-5'>Estudios, títulos, certificados y reconocimientos</h3>
          <div className='flex flex-row'>
            {isEstudiosShown == false &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => estudiosHandler()}>
                <div className='flex flex-row  '>
                  <p>Mostrar formación</p>
                  <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            {isEstudiosShown == true &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => estudiosHandler()}>
                <div className='flex flex-row  '>
                  <p>Ocultar  formación</p>
                  <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs  mx-2'
              onClick={() => { setIsEstudiosSelected(true) }}>Añadir formación</button>
          </div>
          {isEstudiosShown && (
            <div className='w-full'>
              {user?.estudios ?
                user.estudios.map((estudio: any, index: any) => (
                  <EstudiosCard
                    key={index}
                    Concepto={estudio.concepto}
                    Descripcion={estudio.descripcion}
                    Desde={estudio.desde}
                    Hasta={estudio.hasta}
                    Entidad={estudio.entidadEmisora}
                  />
                ))
                :
                <p>No has añadido ningún estudio, título, certificado o reconocimiento a tu CV</p>
              }
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col  mb-1 items-center'>
        <div className='flex flex-col  w-full mx-12 p-5 text-gray-50'>
          <h3 className='mr-5'>Idiomas</h3>
          <div className='flex flex-row'>
            {isIdiomasShown == false &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => idiomasHandler()}>
                <div className='flex flex-row  '>
                  <p>Mostrar Idiomas</p>
                  <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            {isIdiomasShown == true &&
              <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs '
                onClick={() => idiomasHandler()}>
                <div className='flex flex-row  '>
                  <p>Ocultar  Idiomas</p>
                  <svg className='w-5 h-5 text-gray-600 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                  </svg>
                </div>
              </button>
            }
            <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mx-2'
              onClick={() => { setIsIdiomasSelected(true) }}>Añadir idiomas</button>
          </div>
          {isIdiomasShown ? (
            <div className='w-full'>
              {user?.idiomas ? (
                user.idiomas.map((idioma: any, index: any) => (
                  <IdiomasCard
                    key={index}
                    Idioma={idioma?.idioma}
                    Nivel={idioma?.nivel}
                  />
                ))
              ) : (
                <p>No has añadido ningún idioma a tu CV</p>
              )}
            </div>
          ) : null}
        </div>
        <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs my-5'>Descargar Currículum en PDF</button>
      </div>
    </div >
  )
}

export default rightElems