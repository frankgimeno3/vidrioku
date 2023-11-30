import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface rendercomponentProps {
    renderProfesional: any;
}
const Rendercomponent: FC<rendercomponentProps> = ({ renderProfesional }) => {
    return (
        <div className='flex flex-col bg-gray-50 shadow-lg h-full text-center items-center w-full text-gray-500 py-8 px-24 overflow-scroll'>
            <Image src={"/icons/empty-user-profile.png"} alt="pepo" height={150} width={150} className='rounded-full shadow-xl' />
            <h2 className='mt-5 text-xl'>{renderProfesional?.nombre}{renderProfesional?.apellidos}</h2>
            <div className='flex flex-col text-sm text-gray-500'>
                <div className='flex flex-row mx-auto'>
                    <p>Oficio principal</p>
                </div>
                <div className='flex flex-row mx-auto'>
                    <p className='font-medium mr-2'>Lugar de residencia actual:</p> <p>{renderProfesional?.ubi}</p>
                </div>
            </div>
            <p className='text-sm mt-5'>
                Descripción general
            </p>
            <p className='text-sm mt-1'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p className='text-sm mt-5'>
                Experiencia laboral
            </p>
            <p className='text-sm mt-1'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p className='text-sm mt-5'>
                Educación, títulos, certificados y licencias
            </p>
            <p className='text-sm mt-1'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p className='text-sm mt-5'>
                Detalles adicionales
            </p>
            <p className='text-sm mt-1'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <Link href={`/conectar/${renderProfesional?.id}`}>
                <button className='p-2 border shadow-lg rounded-lg text-xs mt-5'> Contactar profesional</button>
            </Link>
        </div>

    );
};

export default Rendercomponent;