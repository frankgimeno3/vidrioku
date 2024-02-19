import React, { FC, useEffect, useState } from 'react'

interface fase3Props {
  user: any;
  setTelActualizado: any;
  setWebActualizado: any;
  setEmailActualizado: any;
  setLinkedinActualizado: any;
}
const fase3: FC<fase3Props> = ({ user, setTelActualizado, setWebActualizado, setEmailActualizado, setLinkedinActualizado, }) => {
  const [receivedUser, setReceivedUser] = useState<any>()

  useEffect(() => {
          setReceivedUser(user)
        }, [user]);
  
  return (
    <div className='flex flex-col'>
      <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
      <p className='text-gray-500 text-lg'>Datos de contacto <span className='font-bold text-gray-e00 text-lg'>3/3</span></p>      
      <div className="flex flex-row mx-60">

      <div className="flex flex-col m-2  w-full">
        <label htmlFor="tel" >Teléfono </label>
        <input
          type="text"
          id="tel"
          name="tel"
          placeholder={receivedUser?.tel || "Inserte aquí la URL de su número de teléfono"}
          onChange={(e) => setTelActualizado(e.target.value)}
          className='w-full text-center bg-gray-50 shadow rounded'
        />
      </div>
      <div className="flex flex-col m-2  w-full">
        <label htmlFor="tel" >Página web </label>
        <input
          type="text"
          id="web"
          name="web"
          placeholder={receivedUser?.web || "Inserte aquí la URL de su página web"}
          onChange={(e) => setWebActualizado(e.target.value)}
          className='w-full text-center bg-gray-50 shadow rounded'
        />
      </div>
      </div>
      <div className="flex flex-row mx-60">

      <div className="flex flex-col m-2  w-full">
        <label htmlFor="tel" >Email de contacto </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder={receivedUser?.email || "ejemplo@gmail.com"}
          onChange={(e) => setEmailActualizado(e.target.value)}
          className='w-full text-center bg-gray-50 shadow rounded'
        />
      </div>
      <div className="flex flex-col m-2  w-full">
        <label htmlFor="linkedin"  >Linkedin </label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          placeholder={receivedUser?.linkedin || "Inserte aquí la URL de su perfil de Linkedin"}
          onChange={(e) => setLinkedinActualizado(e.target.value)}
          className='w-full text-center bg-gray-50 shadow rounded'
        />
      </div>

      </div>
      </div>
  )
}

export default fase3