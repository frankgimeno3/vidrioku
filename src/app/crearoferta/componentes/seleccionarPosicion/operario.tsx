import React, { FC } from 'react';

interface Operariorops {
    posiciones: string[];
    setPosiciones: React.Dispatch<React.SetStateAction<string[]>>;
}

const Operario: FC<Operariorops> = ({ posiciones, setPosiciones }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.checked) {
            setPosiciones(prevPosiciones => [...prevPosiciones, value]);
        } else {
            setPosiciones(prevPosiciones => prevPosiciones.filter(posicion => posicion !== value));
        }
    };

    return (
        <div className='flex flex-col text-left bg-white px-8 py-6 rounded-lg mb-1'>
            <p className='mb-3 text-center mx-12 font-bold'>Seleccione una posición específica como operario en fabricación o instalación en el sector del vidrio</p>

            <label className='block mb-2'>
                <input className='mr-5'
 type='checkbox' value='Posicion - Carpintería de aluminio y/o chapa' 
                    checked={posiciones.includes('Posicion - Carpintería de aluminio y/o chapa')}
                    onChange={handleChange} />
                Carpintería de aluminio y/o chapa
            </label>

            <label className='block mb-2'>
                <input className='mr-5'
 type='checkbox' value='Posicion - Serigrafia' 
                    checked={posiciones.includes('Posicion - Serigrafia')}
                    onChange={handleChange} />
                Serigrafia
            </label>

            <label className='block mb-2'>
                <input className='mr-5'
 type='checkbox' value='Posicion - Corte, biselado, fresado y/o tratamiento químico de vidrio plano' 
                    checked={posiciones.includes('Posicion - Corte, biselado, fresado y/o tratamiento químico de vidrio plano')}
                    onChange={handleChange} />
                Corte, biselado, fresado y/o tratamiento químico de vidrio plano
            </label>

            <label className='block mb-2'>
                <input className='mr-5'
 type='checkbox' value='Posicion - Mecanizado' 
                    checked={posiciones.includes('Posicion - Mecanizado')}
                    onChange={handleChange} />
                Mecanizado
            </label>

            <label className='block mb-2'>
                <input className='mr-5'
 type='checkbox' value='Posicion - Manipulación industrial de vidrio plano y/o curvo' 
                    checked={posiciones.includes('Posicion - Manipulación industrial de vidrio plano y/o curvo')}
                    onChange={handleChange} />
                Manipulación industrial de vidrio plano y/o curvo
            </label>

            <label className='block mb-2'>
                <input className='mr-5'
 type='checkbox' value='Posicion - Otras tareas como operario de fábrica' 
                    checked={posiciones.includes('Posicion - Otras tareas como operario de fábrica')}
                    onChange={handleChange} />
                Otras tareas como operario de fábrica
            </label>
        </div>
    );
};

export default Operario;
