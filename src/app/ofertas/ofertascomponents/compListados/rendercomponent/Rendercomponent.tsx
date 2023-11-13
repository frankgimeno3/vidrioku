import { FC } from 'react';
import Image from 'next/image';
interface RendercomponentProps {
    selectedComponent: any
}

const Rendercomponent: FC <RendercomponentProps> = ({selectedComponent}) => {
    return (
        <div className='flex flex-col bg-gray-50 shadow-lg h-full text-center items-center w-full text-gray-500 py-8 px-24 overflow-scroll'>
            <Image src={"/inventedlogos/1.png"} alt="pepo" height={100} width={100} />
            <h2 className='mt-5 text-xl'>Título de la oferta</h2>
            <div className='flex flex-col text-sm text-gray-500'>
                <p>Empresa</p>
                <p>Lugar</p>
            </div>
            <p className='text-sm mt-5'>
                Descripción de la oferta
            </p>
            <p className='text-sm mt-1'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p className='text-sm mt-5'>
                Requerimientos
            </p>
            <p className='text-sm mt-1'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p className='text-sm mt-5'>
                Perfil ideal
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
            <button className='p-2 border shadow-lg rounded-lg text-xs mt-5'> Solicitar Empleo</button>

        </div>

    );
};

export default Rendercomponent;