import React, { FC } from 'react'

interface CambiarFotoProps {

}
const CambiarFoto: FC<CambiarFotoProps> = ({ }) => {

     return (
      <div className='flex flex-row bg-white rounded-lg shadow-xl p-12 z-0 mx-auto my-auto'>
        <div className='flex flex-col justify-center text-center text-gray-500 '>
          <p className='font-bold text-lg'>Cambiar imagen de perfil</p>
          <p className='font-light text-md'>Haga click en el botón para agregar una imagen</p>
        </div>
        <div> 
          <svg 
            className="w-6 h-6 text-gray-500 hover:text-gray-400" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>
    )
  }
  
  export default CambiarFoto;