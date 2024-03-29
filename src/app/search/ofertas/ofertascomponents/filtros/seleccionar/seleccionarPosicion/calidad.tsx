import React, { FC, useState } from 'react';

interface CalidadProps {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Calidad: FC<CalidadProps> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Técnico en control de calidad'>Técnico en control de calidad</option>
                <option value='Análisis de stock y/o aprovisionamientos, muestreo'>Análisis de stock y/o aprovisionamientos, muestreo</option>
                <option value='Creación de informes'>Creación de informes de calidad, documentación</option>
            </select>
        </div>
    );
};

export default Calidad;
