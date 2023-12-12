import React, { FC } from 'react'

interface CambiarFotoProps {
    setIsCambiarFotoOpen:any
}
const CambiarFoto: FC<CambiarFotoProps> = ({setIsCambiarFotoOpen}) => {

     return (
      <div className='absolute border border-gray-100  inset-0  flex justify-between top-5 inset-x-0 right-0 
       flex-row bg-white rounded-lg shadow-xl p-12 z-0 m-36 mx-72'>
        <div className='flex flex-col justify-center text-center text-gray-500 ml-56 '>
          <p className='font-bold text-lg ml-12'>Cambiar imagen de perfil</p>
          <p className='font-light text-md ml-12'>Haga click en el botón para agregar una imagen</p>
          <form>
            <input type='file' onChange={(e)=>{ }} className='bg-white hover:bg-gray-50 text-gray-500 p-2  mt-5 rounded-lg shadow-xl border border-gray-50'/>
          </form>
         </div>
        <div onClick={()=>{setIsCambiarFotoOpen(false)}} className='flex flex-row  justify-end'> 
          <svg 
            className="w-8 h-8 text-gray-500 hover:text-gray-400" 
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