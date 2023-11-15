import { FC } from 'react';
import Image from 'next/image';
import Descripcion from '@/app/crearoferta/componentes/Descripcion';
import { useRouter } from 'next/navigation';
interface RendercomponentProps {
    titulo: string,
    cargo: string,
    jornada: string,
    tipoubi: string,
    ubicacion: string,
    descripcion: string,
    experiencia: string,
    adicional: string,
    empresa: string,
    estado: string,
}

const Rendercomponent: FC<RendercomponentProps> = ({ titulo, cargo, jornada, tipoubi, ubicacion, descripcion, experiencia,
    adicional, empresa, estado }) => {
    const router = useRouter();

    const handleSolicitarEmpleo = () => {
        const queryParams = `?titulo=${titulo}&cargo=${cargo}&jornada=${jornada}&ubicacion=${ubicacion}&descripcion=${descripcion}&experiencia=${experiencia}&adicional=${adicional}&empresa=${empresa}&estado=${estado}`;
        router.push(`/solicitar${queryParams}`);
    };

    return (
        <div className='flex flex-col bg-gray-50 shadow-lg h-full text-center items-center w-full text-gray-500 py-8 px-24 overflow-scroll'>
            <Image src={"/inventedlogos/1.png"} alt="pepo" height={100} width={100} />
            <h2 className='mt-5 text-xl'>{titulo}</h2>
            <div className='flex flex-col text-sm text-gray-500'>
                <p>{cargo}</p>
                <p>{empresa}</p>
                <p>{ubicacion}</p>
            </div>
            <p className='text-sm mt-5'>
                Descripción de la oferta
            </p>
            <p className='text-sm mt-1'>
                {descripcion}            </p>
            <p className='text-sm mt-5'>
                Requerimientos
            </p>
            <p className='text-sm mt-1'>
                {experiencia}            </p>
            <p className='text-sm mt-5'>
                Tipo de jornada
            </p>
            <p className='text-sm mt-1'>
                {jornada}            </p>
            <p className='text-sm mt-5'>
                Detalles adicionales
            </p>
            <p className='text-sm mt-1'>
                {adicional}            </p>
            <button className='p-2 border shadow-lg rounded-lg text-xs mt-5' 
            onClick={handleSolicitarEmpleo}>
                Solicitar Empleo</button>

        </div>

    );
};

export default Rendercomponent;