import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

interface SJornadaProps {
    arrayFiltros:any;
    setArrayFiltros: React.Dispatch<React.SetStateAction<any[]>>;
}

const SJornada: FC<SJornadaProps> = ({arrayFiltros, setArrayFiltros}) => { 
   const handleSeleccionJornada = (jornada: string) => {
        const jornadaElement = `Jornada - ${jornada}`;
        if (!arrayFiltros.includes(jornada)) {
            const newArray = [...arrayFiltros, jornada];
             setArrayFiltros(newArray);
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
