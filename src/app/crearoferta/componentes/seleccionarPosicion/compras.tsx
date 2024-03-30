import React, { FC, useState } from 'react';

interface ComprasProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Compras: FC<ComprasProps> = ({ posiciones, setPosiciones }) => {
    const [seleccionados, setSeleccionados] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSeleccionados([...seleccionados, value]);
            setPosiciones([...posiciones, value]);
        } else {
            setSeleccionados(seleccionados.filter(item => item !== value));
            setPosiciones(posiciones.filter(item => item !== value));
        }
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Compra de maquinaria industrial'
                    checked={seleccionados.includes('Posicion - Compra de maquinaria industrial')}
                    onChange={handleChange}
                />
                Compra de maquinaria industrial
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Compra de suministros para fabricación y/o manipulado de vidrio'
                    checked={seleccionados.includes('Posicion - Compra de suministros para fabricación y/o manipulado de vidrio')}
                    onChange={handleChange}
                />
                Compra de suministros para fabricación y/o manipulado de vidrio
            </label>

            <label>
                <input
                    type='checkbox'
                    value='Posicion - Otras experiencias en compras'
                    checked={seleccionados.includes('Posicion - Otras experiencias en compras')}
                    onChange={handleChange}
                />
                Otras experiencias en compras
            </label>
        </div>
    );
};

export default Compras;