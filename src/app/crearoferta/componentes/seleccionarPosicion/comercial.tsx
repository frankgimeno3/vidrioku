import React, { FC, useState } from 'react';

interface ComercialProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Comercial: FC<ComercialProps> = ({ posiciones, setPosiciones }) => {
    const [posicionesSeleccionadas, setPosicionesSeleccionadas] = useState<string[]>([]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (posicionesSeleccionadas.includes(value)) {
            setPosicionesSeleccionadas(posicionesSeleccionadas.filter(posicion => posicion !== value));
            setPosiciones(posiciones.filter(posicion => posicion !== value));
        } else {
            setPosicionesSeleccionadas([...posicionesSeleccionadas, value]);
            setPosiciones([...posiciones, value]);
        }
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición específica, dentro del departamento comercial</p>
            <label>
                <input
                    type='checkbox'
                    value='Posicion - Ventas Internacionales y/o exportación'
                    checked={posicionesSeleccionadas.includes('Posicion - Ventas Internacionales y/o exportación')}
                    onChange={handleCheckboxChange}
                />
                Ventas Internacionales y/o exportación
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Comercial técnico'
                    checked={posicionesSeleccionadas.includes('Posicion - Comercial técnico')}
                    onChange={handleCheckboxChange}
                />
                Comercial técnico
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Coordinador de proyectos'
                    checked={posicionesSeleccionadas.includes('Posicion - Coordinador de proyectos')}
                    onChange={handleCheckboxChange}
                />
                Coordinador de proyectos
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Gestor de proyectos'
                    checked={posicionesSeleccionadas.includes('Posicion - Gestor de proyectos')}
                    onChange={handleCheckboxChange}
                />
                Gestor de proyectos
            </label>
        </div>
    );
};

export default Comercial;
