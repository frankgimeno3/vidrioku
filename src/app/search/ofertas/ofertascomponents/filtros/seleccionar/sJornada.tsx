import { FC, useState, useEffect } from 'react';
import Image from 'next/image';

interface SJornadaProps {
    setArrayFiltros: any;
    arrayFiltros: any;
}

const SJornada: FC<SJornadaProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);

    const handleSeleccionJornada = (jornada: string) => {
        if (!arrayRecibido.includes(jornada)) {
            setArrayRecibido(prevArray => [...prevArray, jornada]);
        }
        setArrayFiltros(arrayRecibido)
    };

    return (
        <div className='flex flex-col my-3 '>
            <p className='mb-3'>Filtrar según el el tipo de jornada</p>
            <div className='flex flex-row'>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Jornada completa sin fines de semana o festivos')}
                >Jornada completa sin fines de semana o festivos</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Media jornada sin fines de semana o festivos')}
                >Media jornada sin fines de semana o festivos</button>
                                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Jornada completa con fines de semana o festivos')}
                >Jornada completa sin fines de semana o festivos</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Media jornada con fines de semana o festivos')}
                >Media jornada sin fines de semana o festivos</button>
                                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Jornada completa flexible')}
                >Jornada completa sin fines de semana o festivos</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Media jornada flexible')}
                >Media jornada sin fines de semana o festivos</button>
            </div>
        </div>
    );
};

export default SJornada;
