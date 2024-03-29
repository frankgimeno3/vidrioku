import { FC, useState, useEffect } from 'react';
import Image from 'next/image';

interface SActividadEmpresaProps {
    setArrayFiltros: any;
    arrayFiltros: any;
}

const SActividadEmpresa: FC<SActividadEmpresaProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);

    const handleSeleccionActividad = (actividadEmpresa: string) => {
        if (!arrayRecibido.includes(actividadEmpresa)) {
            setArrayRecibido(prevArray => [...prevArray, actividadEmpresa]);
        }
        setArrayFiltros(arrayRecibido)
    };

    return (
        <div className='flex flex-col my-3 '>
            <p className='mb-3'>Filtrar según la actividad de la empresa</p>
            <div className='flex flex-row'>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Cristalerías')}
                >Cristalerías</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Departamentos de compras o aprovisionamiento')}
                >Almacenistas de vidrio</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Transformación y tratamiento de vidrio')}
                >Departamento técnico o de ingeniería</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Fabricante de maquinaria para el sector del vidrio y acristalamientos')}
                >Operario en fabricación o instalación en el sector del vidrio</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Fabricante de suministros para manufactura de vidrio y acristalamientos')}
                >Fabricante de suministros para manufactura de vidrio y acristalamientos</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Otras actividades empresariales')}
                >Otras actividades empresariales</button>
                 
            </div>
        </div>
    );
};

export default SActividadEmpresa;
