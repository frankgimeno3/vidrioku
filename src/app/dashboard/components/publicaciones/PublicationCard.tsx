import React, { FC, useEffect, useState } from 'react';

interface PublicationCardProps {
    publicacion:any
}

const PublicationCard: FC<PublicationCardProps> = ({ publicacion}) => {
    const [isPublicationLiked, setIsPublicationLiked] = useState(false)

    useEffect(() => {
    //aqui escuchar publicacion
    //tomar con su id de la bbdd el objeto
    //luego pasar a estados los campos a renderizar en el return
    }, [publicacion]);


    return (
        <div className='text-left rounded-lg shadow-lg p-1 text-gray-600'>
            <div className='flex flex-row justify-between'>
                <p className='flex-1'>Título de la publicación</p>
                <p className='flex-1 font-bold'>Fecha de publicación</p>
            </div>
            <p className='font-bold text-sm text-gray-300'>Autor</p>
            <p className='p-5'>Contenido</p>

            <div className='px-auto pt-6'>
                {isPublicationLiked == false && <p>Icono unliked</p>
                }    
                {isPublicationLiked == true && <p>Icono liked</p>
                }
            </div>
        </div>
    );
};

export default PublicationCard;