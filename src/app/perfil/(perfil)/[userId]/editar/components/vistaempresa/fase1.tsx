import React, { FC } from 'react'
import Image from 'next/image';

interface fase1Props {
    handleModificarPerfil: any;
    setNombreActualizado: any;
    setAnoCreacionActualizado: any;
    setUbiActualizado: any;
    user: any;
    setEmpleadosActualizado: any
    setFase: any;
}
const fase1: FC<fase1Props> = ({ handleModificarPerfil, setNombreActualizado, setAnoCreacionActualizado, setUbiActualizado, user, setEmpleadosActualizado, setFase }) => {

    const handleNextFase = () => {
        setFase(2)
    }

    return (
        <div className='flex flex-col'>
            <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
            <p className='text-gray-500 text-lg'>Datos generales <span className='font-bold text-gray-e00 text-lg'>1/3</span></p>
            <Image src={user?.profilepicture || "/icons/empty-user-profile.png"} alt="" width={200} height={200} className="mx-auto mt-5 " />
            <button className='my-5 mx-auto p-2 py-3 text-sm border text-gray-500 rounded-lg shadow-lg hover:bg-gray-50 border-gray-100 '
                onClick={() => { handleModificarPerfil }}>
                Modificar Imagen de perfil
            </button>
            <div className="flex flex-row mx-60">
                <div className="flex flex-col m-2  w-full">
                    <label htmlFor="nombre" >Nombre de la empresa: </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder={user?.nombre}
                        onChange={(e) => setNombreActualizado(e.target.value)}
                        className='w-full text-center bg-gray-50 shadow rounded'
                    />
                </div>
                <div className="flex flex-col m-2 w-full ">
                    <label htmlFor="anoCreacion" >Año de Creación: </label>
                    <input
                        type="text"
                        id="anoCreacion"
                        name="anoCreacion"
                        placeholder={user?.anoCreacion}
                        onChange={(e) => setAnoCreacionActualizado(e.target.value)}
                        className='w-full text-center bg-gray-50 shadow rounded'

                    />
                </div>
            </div>
            <div className="flex flex-row mx-60">

            <div className="flex flex-col m-2 w-full ">
                    <label htmlFor="ubi" >Ubicacion: </label>
                    <input
                        type="text"
                        id="ubi"
                        name="ubi"
                        placeholder={user?.ubi?.toString() ?? ''}
                        onChange={(e) => setUbiActualizado((e.target.value))}
                        className='w-full text-center bg-gray-50 shadow rounded'

                    />
                </div>
                <div className="flex flex-col m-2 w-full  ">
                    <label htmlFor="empleados" >Número de empleados: </label>
                    <input
                        type="text"
                        id="empleados"
                        name="empleados"
                        placeholder={user?.empleados || ''}
                        onChange={(e) => setEmpleadosActualizado(e.target.value)}
                        className='w-full text-center bg-gray-50 shadow rounded'
                    />
                </div>
            </div>
            <button className='bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'
                onClick={() => { handleNextFase() }} > Siguiente fase</button>
        </div>
    )
}

export default fase1