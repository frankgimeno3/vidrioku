import React, { FC, useState } from 'react';

interface DtecnicoProps {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Dtecnico: FC<DtecnicoProps> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Consultoría o dirección técnica'>Consultoría o dirección técnica</option>
                <option value='Arquitectura técnica'>Arquitectura técnica</option>
                <option value='Análisis o creación de documentación de proyectos técnicos'>Análisis o creación de documentación de proyectos técnicos</option>
                <option value='Mejora contínua'>Mejora contínua</option>
                <option value='Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras'>Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras</option>
            </select>
        </div>
    );
};

export default Dtecnico;
