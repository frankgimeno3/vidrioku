import React, { FC, useState } from 'react';

interface ComercialProps {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Comercial: FC<ComercialProps> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Ventas Internacionales y/o exportación'>Ventas Internacionales y/o exportación</option>
                <option value='Comercial técnico'>Comercial técnico</option>
                <option value='Coordinador de proyectos'>Coordinador de proyectos</option>
                <option value='Gestor de proyectos'>Gestor de proyectos</option>
            </select>
        </div>
    );
};

export default Comercial;
