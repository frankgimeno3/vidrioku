import React from 'react'

function InputForm() {
  return (
    <div>
        <form className="flex flex-row  mx-6  py-2 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 justify-between mb-5 ">
                <input className='text-gray-300 py-3 pl-5 px-5 text-sm bg-transparent runded w-full mx-4 placeholder-gray-300' 
                placeholder='Inserte su texto aquí'></input>
                <button className='text-gray-300  px-2 mx-2 mr-4 text-sm bg-white bg-opacity-10 rounded-lg text-xs'>Enviar</button>
            </form>
    </div>
  )
}

export default InputForm