import { FC, useEffect, useState } from 'react';

interface SPaisProps {
    arrayFiltros: any[];
    setArrayFiltros: React.Dispatch<React.SetStateAction<any[]>>;
}

const SPais: FC<SPaisProps> = ({ arrayFiltros, setArrayFiltros }) => {
    
    const paisesLatam = [
        'Argentina',
        'Bolivia',
        'Brasil',
        'Chile',
        'Colombia',
        'Costa Rica',
        'Cuba',
        'Ecuador',
        'Florida',
        'El Salvador',
        'Guatemala',
        'Honduras',
        'México',
        'Nicaragua',
        'Panamá',
        'Paraguay',
        'Perú',
        'Puerto Rico',
        'República Dominicana',
        'Uruguay',
        'Venezuela'
    ];
    
    const paisesEuropa = [
        'Andorra',
        'España',
        'Portugal',
    ];

    const handleSeleccionPais = (pais: string) => {
        if (!arrayFiltros.includes(pais) && pais !== '') {
            const newArray = [...arrayFiltros, `Pais - ${pais}`];
             setArrayFiltros(newArray);
        }
    };

    return (
        <div className='flex flex-col'>
            <p className='mb-3'>Filtrar según el país en que se encuentra actualmente el candidato</p>
            <p className='font-bold'>Europa</p>
            <div className='flex flex-wrap mb-4'>
                {paisesEuropa.map((pais, index) => (
                    <button key={index} className='text-sm bg-white px-5 mx-1 rounded shadow py-2 w-36 my-2'
                        onClick={() => handleSeleccionPais(pais)}
                    >{pais}</button>
                ))}
            </div>
            <p className='mb-3 font-bold'>América Latina</p>
            <div className='flex flex-wrap mb-4'>
                {paisesLatam.map((pais, index) => (
                    <button key={index} className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2 w-36 my-2'
                        onClick={() => handleSeleccionPais(pais)}
                    >{pais}</button>
                ))}
            </div>
        </div>
    );
};

export default SPais;
