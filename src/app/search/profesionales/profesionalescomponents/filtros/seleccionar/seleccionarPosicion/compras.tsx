import React, { FC, useState } from 'react';

interface ComprasProps {
    posicionSeleccionada: string;
    setPosicionSeleccionada: (posicion: string) => void;
}

const Compras: FC<ComprasProps> = ({ posicionSeleccionada, setPosicionSeleccionada }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosicionSeleccionada(e.target.value);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <select className=' border border-gray-300'
                style={{ height: 'auto' }}
                value={posicionSeleccionada} onChange={handleChange}>
                <option value='Compra de maquinaria industrial'>Compra de maquinaria industrial</option>
                <option value='Compra de suministros para fabricación y/o manipulado de vidrio'>Compra de suministros para fabricación y/o manipulado de vidrio</option>
                <option value='Otras experiencias en compras'>Otras experiencias en compras</option>
            </select>
        </div>
    );
};

export default Compras;
