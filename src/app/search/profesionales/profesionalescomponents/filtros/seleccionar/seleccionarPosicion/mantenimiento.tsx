import React, { FC, useState } from 'react';

interface MantenimientoProps {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Mantenimiento: FC<MantenimientoProps> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Electromecánica, técnico eléctrico y/o mecánico'>Electromecánica, técnico eléctrico y/o mecánico</option>
                <option value='Revisión y mantenimiento preventivo de equipos'>Revisión y mantenimiento preventivo de equipos</option>
                <option value='Experiencia con soldadura y/o electricidad'>Experiencia con soldadura y/o electricidad</option>
            </select>
        </div>
    );
};

export default Mantenimiento;
