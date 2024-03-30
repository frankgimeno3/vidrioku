import React, { FC, useState } from 'react';

interface CalidadProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Calidad: FC<CalidadProps> = ({ posiciones, setPosiciones }) => {
    const [posicionSeleccionada, setPosicionSeleccionada] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (posiciones.includes(value)) {
            const updatedPosiciones = posiciones.filter(pos => pos !== value);
            setPosiciones(updatedPosiciones);
        } else {
            setPosiciones([...posiciones, value]);
        }
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Técnico en control de calidad'
                    checked={posiciones.includes('Posicion - Técnico en control de calidad')}
                    onChange={handleChange}
                />
                Técnico en control de calidad
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Análisis de stock y/o aprovisionamientos, muestreo'
                    checked={posiciones.includes('Posicion - Análisis de stock y/o aprovisionamientos, muestreo')}
                    onChange={handleChange}
                />
                Análisis de stock y/o aprovisionamientos, muestreo
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Creación de informes'
                    checked={posiciones.includes('Posicion - Creación de informes')}
                    onChange={handleChange}
                />
                Creación de informes de calidad, documentación
            </label>
        </div>
    );
};

export default Calidad;
