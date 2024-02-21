import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import TogglePermiso from './TogglePermiso';
import ToggleVehiculo from './ToggleVehiculo';

interface fase1Props {
    handleModificarPerfil: any;
    setNombreActualizado: any;
    setApellidosActualizado: any;
    setGeneroActualizado: any;
    setEdadActualizado: any;
    setUbiActualizado: any;
    setDNIActualizado:any;
    setNIEActualizado:any;
    setPermisoActualizado:any;
    setVehiculoActualizado:any;
    permisoActualizado:any;
    vehiculoActualizado:any;
    user: any;
    setFase: any;
}
const fase1: FC<fase1Props> = ({ handleModificarPerfil, setNombreActualizado, setApellidosActualizado, setGeneroActualizado, setEdadActualizado, setUbiActualizado, 
    setDNIActualizado, setNIEActualizado, user, setFase, setPermisoActualizado, setVehiculoActualizado, permisoActualizado, vehiculoActualizado }) => {

    const [receivedUser, setReceivedUser] = useState<any>()
    const [isDNI, setIsDNI] = useState(true);

    const handleNextFase = () => {
        setFase(2)
    }

    useEffect(() => {
        setReceivedUser(user)
    }, [user]);

    const niehandler = (event: any) => {
        event.preventDefault();
        setIsDNI(false)
      }
      const DNIhandler = (event: any) => {
        event.preventDefault();
        setIsDNI(true)
      }

    return (
        <div className='flex flex-col'>
            <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
            <p className='text-gray-500 text-lg'>Datos generales <span className='font-bold text-gray-e00 text-lg'>(Parte 1/4)</span></p>
            <Image src={receivedUser?.profilepicture || "/icons/empty-user-profile.png"} alt="" width={200} height={200} className="mx-auto mt-5 " />
            <button className='my-5 mx-auto p-2 py-3 text-sm border text-gray-500 rounded-lg shadow-lg hover:bg-gray-50 border-gray-100 '
                onClick={() => { handleModificarPerfil }}>
                Modificar Imagen de perfil
            </button>
            <div className="flex flex-row mx-60">
                <div className="flex flex-col m-2  w-full">
                    <label htmlFor="nombre" >Nombre completo </label>
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
                    <label htmlFor="apellidos" >Apellidos</label>
                    <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        placeholder={receivedUser?.apellidos}
                        onChange={(e) => setApellidosActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                    />
                </div>
                <div className="flex flex-col m-2 w-full  ">
                    <label htmlFor="edad" >Genero: </label>
                    <input
                        type="text"
                        id="genero"
                        name="genero"
                        placeholder={receivedUser?.edad}
                        onChange={(e) => setGeneroActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                    />
                </div>
            </div>
            <div className="flex flex-row mx-60">

                <div className="flex flex-col m-2 w-full ">
                    <label htmlFor="ubi" >Ubicación actual: </label>
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
                    <label htmlFor="edad" >Año de nacimiento: </label>
                    <input
                        type="text"
                        id="edad"
                        name="edad"
                        placeholder={receivedUser?.edad}
                        onChange={(e) => setEdadActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                    />
                </div>
                {isDNI && <div className="flex flex-col my-2 ">
              <label htmlFor="DNI" >DNI: </label>
              <input type="text"
                id="DNI"
                name="DNI"
                placeholder={user?.DNI  || "Inserte aquí la URL de su número de DNI"}
                onChange={(e) => setDNIActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
              <button onClick={niehandler}
              className='bg-gray-50 shadow rounded my-5 border px-3 py-1 mx-24'>
                Haga click aquí si tiene NIE en vez de DNI</button>
            </div>}
            {!isDNI && <div className="flex flex-col  my-2 ">
              <label htmlFor="NIE" >NIE: </label>
              <input
                type="text"
                id="NIE"
                name="NIE"
                placeholder={user?.NIE || "Inserte aquí su número de NIE"}
                onChange={(e) => setNIEActualizado(e.target.value)}
                className='w-full text-center bg-gray-50 shadow rounded'
              />
              <button onClick={DNIhandler} className='bg-gray-50 shadow rounded my-5 border px-3 py-1 mx-24'>
              Haga click aquí si tiene DNI en vez de NIE</button>
            </div>}
            <div className="flex flex-col my-2">
              <label htmlFor="permiso" >Permiso de conducción? </label>
              <TogglePermiso setPermiso={setPermisoActualizado} permisoActualizado={permisoActualizado} />

            </div>
            {permisoActualizado  && <div className="flex flex-col my-2">
              <label htmlFor="vehiculo" >Vehículo propio? </label>
              <ToggleVehiculo setVehiculo={setVehiculoActualizado} vehiculoActualizado={vehiculoActualizado}/>
         
            </div>}
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