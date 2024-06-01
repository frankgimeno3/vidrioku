import React, { FC, useState } from 'react';

interface PublicationCardProps {

}

const PublicationCard: FC<PublicationCardProps> = ({ }) => {
    const [isPublicationLiked, setIsPublicationLiked] = useState(false)
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