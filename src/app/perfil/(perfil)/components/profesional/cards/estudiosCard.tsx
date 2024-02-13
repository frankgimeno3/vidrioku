import React, { FC } from 'react'
import Image from 'next/image'

interface estudiosCardProps {
    Concepto: any;
    Descripcion: any;
    Desde: any;
    Hasta: any;
    Entidad: any;
    userData:string;

}


const estudiosCard: FC<estudiosCardProps> = ({ Concepto, Descripcion, Desde, Hasta, Entidad, userData}) => {
    const handleEditar = ()=>{

    }

    const handleEliminar = ()=>{

    }

    return (
        <div className='flex flex-col bg-white rounded-lg shadow     my-2 text-gray-400 text-sm'>
        <div className='flex  flex-row justify-between content-end	 mx-5 mt-5'>
            <p className='font-bold  '>{Concepto} <span className='font-light'> en </span> {Entidad} </p>
            <div>
                <button className='bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mx-3'
                onClick={()=>{handleEditar()}}>Editar </button>
                <button className='bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8'
                onClick={()=>{handleEliminar()}}>Eliminar </button>
            </div>
        </div>
        <div className='flex flex-col  mx-3 mb-3 '>
                <div className='flex flex-row'>
                     <p className='pl-5 italic'>{Descripcion}</p>
                </div>
                <div className='flex flex-row'>
                    <p className='pl-5'>Desde:  </p>
                    <p className='pl-5'>{Desde}</p>
                    <p className='px-4 pl-5'>-</p>
                    <p className='pl-5'>Hasta:  </p>
                    <p className='pl-5'>{Hasta}</p>
                </div>
 
            </div>
        </div>

    )
}

export default estudiosCard