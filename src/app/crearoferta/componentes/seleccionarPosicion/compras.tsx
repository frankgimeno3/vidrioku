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
        <div className='flex flex-col text-left bg-white px-8 py-6 rounded-lg mb-1'>
            <p className='mb-3 text-center mx-12 font-bold'>Seleccione una posición específica, dentro del departamento de compras/aprovisionamiento</p>

            <label>
                <input className='mr-5'
                    type='checkbox'
                    value='Posicion - Compra de maquinaria industrial'
                    checked={seleccionados.includes('Posicion - Compra de maquinaria industrial')}
                    onChange={handleChange}
                />
                Compra de maquinaria industrial
            </label>

            <label>
                <input className='mr-5'
                    type='checkbox'
                    value='Posicion - Compra de suministros para fabricación y/o manipulado de vidrio'
                    checked={seleccionados.includes('Posicion - Compra de suministros para fabricación y/o manipulado de vidrio')}
                    onChange={handleChange}
                />
                Compra de suministros para fabricación y/o manipulado de vidrio
            </label>

            <label>
                <input className='mr-5'
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