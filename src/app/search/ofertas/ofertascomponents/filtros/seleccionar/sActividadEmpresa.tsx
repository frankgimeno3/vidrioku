import React, { FC, useState, useEffect } from 'react';

interface SActividadEmpresaProps {
    arrayFiltros:any;
    setArrayFiltros: React.Dispatch<React.SetStateAction<any[]>>;
}

const SActividadEmpresa: FC<SActividadEmpresaProps> = ({arrayFiltros, setArrayFiltros}) => { 
 
    const handleSeleccionActividad = (actividadEmpresa: string) => {
        if (!arrayFiltros.includes(actividadEmpresa)) {
            const newArray = [...arrayFiltros, actividadEmpresa];
             setArrayFiltros(newArray);
        }
    };
     

    return (
        <div className='flex flex-col my-3 '>
            <p className='mb-3'>Filtrar según la actividad de la empresa</p>
            <div className='flex flex-row'>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Cristalerías')}
                >Cristalerías</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Almacenistas de vidrio')}
                >Almacenistas de vidrio</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Transformación y tratamiento de vidrio')}
                >Transformación y tratamiento de vidrio</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionActividad('Actividad - Fabricante de maquinaria para el sector del vidrio y acristalamientos')}
                >Fabricante de maquinaria para el sector del vidrio y acristalamientos</button>
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
