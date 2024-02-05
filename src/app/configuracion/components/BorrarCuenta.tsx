import React from 'react'

function BorrarCuenta() {
  return (
    <div>
      <h1 className='font-bold  text-xl'>Borrar cuenta</h1>
      <p className='text-sm mt-2'>Quiere borrar su cuenta?</p>
      <button className='font-bold text-white bg-red-500 hover:bg-red-600 p-2 px-5 my-5 rounded-lg shadow-xl'>Comenzar proceso de borrado</button>
    </div>
  )
}

export default BorrarCuenta