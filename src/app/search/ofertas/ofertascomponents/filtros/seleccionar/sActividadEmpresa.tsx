import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Asegúrate de importar el tipo RootState desde tu archivo store
import { addFiltro } from '@/redux/features/arrayFiltros'; // Importa la acción para agregar un filtro

interface SActividadEmpresaProps {
    // No necesitas setArrayFiltros y arrayFiltros aquí
}

const SActividadEmpresa: FC<SActividadEmpresaProps> = () => {
    const dispatch = useDispatch();
    const arrayFiltros = useSelector((state: RootState) => state.arrayFiltros.filtros);

    const handleSeleccionActividad = (actividadEmpresa: string) => {
        if (!arrayFiltros.includes(actividadEmpresa)) {
            dispatch(addFiltro(actividadEmpresa)); // Utiliza la acción addFiltro para agregar un filtro
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
