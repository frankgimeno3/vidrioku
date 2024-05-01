import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import { addFiltro } from '@/redux/features/arrayFiltros'; 

interface SJornadaProps {
}

const SJornada: FC<SJornadaProps> = () => {
    const dispatch = useDispatch();
    const arrayFiltros = useSelector((state: RootState) => state.arrayFiltros.filtros);

    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);

    const handleSeleccionJornada = (jornada: string) => {
        const jornadaElement = `Jornada - ${jornada}`;
        if (!arrayRecibido.includes(jornadaElement)) {
            const newArray = [...arrayRecibido, jornadaElement];
            setArrayRecibido(newArray);
            dispatch(addFiltro(jornadaElement)); 
        }
    };

    return (
        <div className='flex flex-col my-3 '>
            <p className='mb-3'>Filtrar según el tipo de jornada laboral de la vacante</p>
            <div className='flex flex-row'>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Jornada completa sin fines de semana o festivos')}
                >Jornada completa sin fines de semana o festivos</button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Media jornada sin fines de semana o festivos')}
                >Media jornada sin fines de semana o festivos</button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Jornada completa con fines de semana o festivos')}
                >Jornada completa con fines de semana o festivos</button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Media jornada con fines de semana o festivos')}
                >Media jornada con fines de semana o festivos</button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Jornada completa flexible')}
                >Jornada completa flexible</button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionJornada('Media jornada flexible')}
                >Media jornada flexible</button>
            </div>
        </div>
    );
};

export default SJornada;
