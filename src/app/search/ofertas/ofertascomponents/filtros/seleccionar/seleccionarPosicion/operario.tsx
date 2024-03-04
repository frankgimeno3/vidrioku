import React, { FC, useState } from 'react';

interface Operariorops {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Operario: FC<Operariorops> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Carpintería de aluminio y/o chapa'>Carpintería de aluminio y/o chapa</option>
                <option value='Serigrafia'>Serigrafia</option>
                <option value='Corte, biselado, fresado y/o tratamiento químico de vidrio plano'>Corte, biselado, fresado y/o tratamiento químico de vidrio plano</option>
                <option value='Mecanizado'>Mecanizado</option>
                <option value='Manipulación industrial de vidrio plano y/o curvo'>Manipulación industrial de vidrio plano y/o curvo</option>
                <option value='Otras tareas como operario de fábrica'>Otras tareas como operario de fábrica</option>

            </select>
        </div>
    );
};

export default Operario;
