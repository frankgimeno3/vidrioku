import React, { FC, useEffect, useState } from 'react'
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

    const [receivedUser, setReceivedUser] = useState<any>()
 
    const handleNextFase = () => {
        setFase(2)
    }

    useEffect(() => {
        setReceivedUser(user)
       }, [user]);

    return (
        <div className='flex flex-col'>
            <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
            <p className='text-gray-500 text-lg'>Datos generales <span className='font-bold text-gray-e00 text-lg'>1/3</span></p>
            <Image src={receivedUser?.profilepicture || "/icons/empty-user-profile.png"} alt="" width={200} height={200} className="mx-auto mt-5 " />
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
                        placeholder={receivedUser?.nombre}
                        onChange={(e) => setNombreActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                    />
                </div>
                <div className="flex flex-col m-2 w-full ">
                    <label htmlFor="anoCreacion" >Año de Creación: </label>
                    <input
                        type="text"
                        id="anoCreacion"
                        name="anoCreacion"
                        placeholder={receivedUser?.anoCreacion}
                        onChange={(e) => setAnoCreacionActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'

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
                        placeholder={receivedUser?.ubi}
                        onChange={(e) => setUbiActualizado((e.target.value))}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'

                    />
                </div>
                <div className="flex flex-col m-2 w-full  ">
                    <label htmlFor="empleados" >Número de empleados: </label>
                    <input
                        type="text"
                        id="empleados"
                        name="empleados"
                        placeholder={receivedUser?.empleados}
                        onChange={(e) => setEmpleadosActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                    />
                </div>
            </div>
            <div>
            <button 
                className='py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl placeholder-gray-400'
                onClick={() => { handleNextFase() }} > Siguiente fase</button>
            </div>
            
        </div>
    )
}

export default fase1