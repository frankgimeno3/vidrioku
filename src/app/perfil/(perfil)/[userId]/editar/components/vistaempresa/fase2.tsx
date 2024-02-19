import React, { FC } from 'react'

interface fase2Props {
  user: any;
  setActividadActualizado: any;
  setDescripcionActualizado: any;
  setFase:any
}
const fase2: FC<fase2Props> = ({ user, setActividadActualizado, setDescripcionActualizado, setFase }) => {

  const handleNextFase = ()=>{
    setFase(3)
}

  return (
<div className='flex flex-col'>
            <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
            <p className='text-gray-500 text-lg'>Descripión de la empresa <span className='font-bold text-gray-e00 text-lg'>2/3</span></p>      <div className="flex flex-col  my-2">
        <label htmlFor="actividad" >Actividad: </label>
        <input
          type="text"
          id="actividad"
          name="actividad"
          placeholder={user?.actividad}
          onChange={(e) => setActividadActualizado(e.target.value)}
          className='w-full text-center bg-gray-50 shadow rounded'
        />
      </div>
      <div className="flex flex-col p-4 justify-between text-center justify-center px-auto bg-white mx-10 my-5 rounded text-gray-500 ">
        <label htmlFor="descripcion" >Descripción </label>
        <textarea placeholder="Añada aquí una descripción completa de su empresa, y los servicios que ofrece"
          className='m-5 rounded shadow mx-96 bg-gray-50'
          onChange={(e) => setDescripcionActualizado(e.target.value)}
        ></textarea>
            <button className='bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'
                onClick={()=>{handleNextFase()}} > Siguiente fase</button>
      </div>
    </div>
  )
}

export default fase2