import React, { FC, useState, ChangeEvent } from 'react';

interface LogisticaProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Logistica: FC<LogisticaProps> = ({ posiciones, setPosiciones }) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const position = event.target.value;
        const updatedCheckedItems = { ...checkedItems, [position]: !checkedItems[position] };
        setCheckedItems(updatedCheckedItems);

        const updatedPosiciones = Object.keys(updatedCheckedItems).filter(key => updatedCheckedItems[key]);
        setPosiciones(updatedPosiciones);
    };

    return (
        <div className='flex flex-col text-left bg-white px-8 py-6 rounded-lg mb-1'>
            <p className='mb-3 text-center mx-12  font-bold'>Seleccione una posición</p>

            <label>
                <input className='mr-5'
                    type='checkbox'
                    value='Posicion - Instalación de vidrios y/o ventanas'
                    checked={posiciones.includes('Posicion - Instalación de vidrios y/o ventanas')}
                    onChange={handleChange}
                />
                Instalación de vidrios y/o ventanas
            </label>

            <label>
                <input className='mr-5'
                    type='checkbox'
                    value='Posicion - Transportista de vidrios y/o ventanas fuera de fábrica'
                    checked={posiciones.includes('Posicion - Transportista de vidrios y/o ventanas fuera de fábrica')}
                    onChange={handleChange}
                />
                Transportista de vidrios y/o ventanas fuera de fábrica
            </label>

            <label>
                <input className='mr-5'
                    type='checkbox'
                    value='Posicion - Profesionales de almacén o manipulación interna de vidrios y/o otros bienes'
                    checked={posiciones.includes('Posicion - Profesionales de almacén o manipulación interna de vidrios y/o otros bienes')}
                    onChange={handleChange}
                />
                Profesionales de almacén o manipulación interna de vidrios y/o otros bienes
            </label>

            <label>
                <input className='mr-5'
                    type='checkbox'
                    value='Posicion - Gestión de stock'
                    checked={posiciones.includes('Posicion - Gestión de stock')}
                    onChange={handleChange}
                />
                Gestión de stock
            </label>
        </div>
    );
};

export default Logistica;
