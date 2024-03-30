import React, { FC, useState } from 'react';

interface MantenimientoProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Mantenimiento: FC<MantenimientoProps> = ({ posiciones, setPosiciones }) => {
    const [posicionSeleccionada, setPosicionSeleccionada] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (posiciones.includes(value)) {
            setPosiciones(posiciones.filter(posicion => posicion !== value));
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
                    value='Posicion - Electromecánica, técnico eléctrico y/o mecánico'
                    checked={posiciones.includes('Posicion - Electromecánica, técnico eléctrico y/o mecánico')}
                    onChange={handleChange}
                />
                Electromecánica, técnico eléctrico y/o mecánico
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Revisión y mantenimiento preventivo de equipos'
                    checked={posiciones.includes('Posicion - Revisión y mantenimiento preventivo de equipos')}
                    onChange={handleChange}
                />
                Revisión y mantenimiento preventivo de equipos
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Experiencia con soldadura y/o electricidad'
                    checked={posiciones.includes('Posicion - Experiencia con soldadura y/o electricidad')}
                    onChange={handleChange}
                />
                Experiencia con soldadura y/o electricidad
            </label>
        </div>
    );
};

export default Mantenimiento;
