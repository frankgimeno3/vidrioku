import React from 'react'


function notificacioncomponent() {
  return (
         <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-6">
              <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>{tipo}</h2>
              <h2 className='mt-1 text-sm mb-2 mx-5'>{content}</h2>
            </div>
   )
}

export default notificacioncomponent