import React, { FC } from 'react'
import Image from 'next/image'

interface idiomaCardProps {
    Idioma: any;
    Nivel: any
}


const idiomaCard: FC<idiomaCardProps> = ({ Idioma, Nivel }) => {


    return (
        <div className='flex flex-row justify-between bg-white rounded-lg shadow py-auto items-center content-center px-5 py-2 my-2 text-gray-400 text-sm'>
            <p className='font-bold'>{Idioma} <span className='font-light'>({Nivel})</span></p>
            <div className='flex  flex-row justify-between '>
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8 mx-3'>Editar </button>
                <button className='bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs h-8  '>Eliminar </button>
            </div> 
        </div> 
    )
}

export default idiomaCard