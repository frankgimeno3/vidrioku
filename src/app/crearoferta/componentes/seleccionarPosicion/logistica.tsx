import React, { FC, useState } from 'react';

interface LogisticaProps {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Logistica: FC<LogisticaProps> = ({ posiciones, setPosiciones }) => {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const handleChange = (position: string) => {
        const updatedCheckedItems = { ...checkedItems, [position]: !checkedItems[position] };
        setCheckedItems(updatedCheckedItems);

        const updatedPosiciones = Object.keys(updatedCheckedItems).filter(key => updatedCheckedItems[key]);
        setPosiciones(updatedPosiciones);
    };

    return (
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            {['Posicion - Instalación de vidrios y/o ventanas', 'Posicion - Transportista de vidrios y/o ventanas fuera de fábrica', 'Posicion - Profesionales de almacén o manipulación interna de vidrios y/o otros bienes', 'Posicion - Gestión de stock'].map((position, index) => (
                <div key={index} className="mb-1">
                    <input
                        type="checkbox"
                        id={position}
                        checked={checkedItems[position] || false}
                        onChange={() => handleChange(position)}
                    />
                    <label htmlFor={position}>{position}</label>
                </div>
            ))}
        </div>
    );
};

export default Logistica;
