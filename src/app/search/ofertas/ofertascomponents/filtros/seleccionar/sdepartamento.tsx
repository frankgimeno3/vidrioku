import { FC, useState, useEffect } from 'react';
import Image from 'next/image';

interface SdepartamentoProps {
    setArrayFiltros: any;
    arrayFiltros: any;
}

const Sdepartamento: FC<SdepartamentoProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);

    const handleSeleccionDepartamento = (departamento: string) => {
        if (!arrayRecibido.includes(departamento)) {
            setArrayRecibido(prevArray => [...prevArray, departamento]);
        }
        setArrayFiltros(arrayRecibido)
    };

    return (
        <div className='flex flex-col my-3 '>
            <p className='mb-3'>Filtrar según el departamento de la vacante</p>
            <div className='flex flex-row'>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamento comercial')}
                >Departamento comercial</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos de compras o aprovisionamiento')}
                >Departamentos de compras o aprovisionamiento</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamento técnico o de ingeniería')}
                >Departamento técnico o de ingeniería</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Operario en fabricación o instalación en el sector del vidrio')}
                >Operario en fabricación o instalación en el sector del vidrio</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Técnico de mantenimiento y/o prevención')}
                >Técnico de mantenimiento y/o prevención</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Técnico de calidad')}
                >Técnico de calidad</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Profesional de la logística')}
                >Profesional de la logística</button>
            </div>
        </div>
    );
};

export default Sdepartamento;
