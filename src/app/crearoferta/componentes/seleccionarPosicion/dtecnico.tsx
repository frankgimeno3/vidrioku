import React, { FC, useState } from 'react';

interface DtecnicoProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Dtecnico: FC<DtecnicoProps> = ({ posiciones, setPosiciones }) => {
    const [posicionSeleccionada, setPosicionSeleccionada] = useState<string>('');

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (posiciones.includes(value)) {
            setPosiciones(posiciones.filter(pos => pos !== value));
        } else {
            setPosiciones([...posiciones, value]);
        }
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <label className="inline-flex items-center mt-2">
                <input
                    type="checkbox"
                    value='Posicion - Consultoría o dirección técnica'
                    checked={posiciones.includes('Posicion - Consultoría o dirección técnica')}
                    onChange={handleCheckboxChange}
                />
                <span className="ml-2">Consultoría o dirección técnica</span>
            </label>

            <label className="inline-flex items-center mt-2">
                <input
                    type="checkbox"
                    value='Posicion - Arquitectura técnica'
                    checked={posiciones.includes('Posicion - Arquitectura técnica')}
                    onChange={handleCheckboxChange}
                />
                <span className="ml-2">Arquitectura técnica</span>
            </label>

            <label className="inline-flex items-center mt-2">
                <input
                    type="checkbox"
                    value='Posicion - Análisis o creación de documentación de proyectos técnicos'
                    checked={posiciones.includes('Posicion - Análisis o creación de documentación de proyectos técnicos')}
                    onChange={handleCheckboxChange}
                />
                <span className="ml-2">Análisis o creación de documentación de proyectos técnicos</span>
            </label>

            <label className="inline-flex items-center mt-2">
                <input
                    type="checkbox"
                    value='Posicion - Mejora contínua'
                    checked={posiciones.includes('Posicion - Mejora contínua')}
                    onChange={handleCheckboxChange}
                />
                <span className="ml-2">Mejora contínua</span>
            </label>

            <label className="inline-flex items-center mt-2">
                <input
                    type="checkbox"
                    value='Posicion - Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras'
                    checked={posiciones.includes('Posicion - Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras')}
                    onChange={handleCheckboxChange}
                />
                <span className="ml-2">Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras</span>
            </label>
        </div>
    );
};

export default Dtecnico;
