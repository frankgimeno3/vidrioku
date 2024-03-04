import React, { FC, useState } from 'react';

interface LogisticaProps {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Logistica: FC<LogisticaProps> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Instalación de vidrios y/o ventanas'>Instalación de vidrios y/o ventanas</option>
                <option value='Transportista de vidrios y/o ventanas fuera de fábrica'>Transportista de vidrios y/o ventanas fuera de fábrica</option>
                <option value='Profesionales de almacén o manipulación interna de vidrios y/o otros bienes'>Profesionales de almacén o manipulación interna de vidrios y/o otros bienes</option>
                <option value='Mejora contínua'>Gestión de stock, logística y expediciones</option>
            </select>
        </div>
    );
};

export default Logistica;
