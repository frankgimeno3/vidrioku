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
        <div className='flex flex-col text-left mr-2'>
            <p className='mb-2'>Seleccione una posición</p>

            <label className='block mb-2'>
                <input type='checkbox' value='Posicion - Carpintería de aluminio y/o chapa' 
                    checked={posiciones.includes('Posicion - Carpintería de aluminio y/o chapa')}
                    onChange={handleChange} />
                Carpintería de aluminio y/o chapa
            </label>

            <label className='block mb-2'>
                <input type='checkbox' value='Posicion - Serigrafia' 
                    checked={posiciones.includes('Posicion - Serigrafia')}
                    onChange={handleChange} />
                Serigrafia
            </label>

            <label className='block mb-2'>
                <input type='checkbox' value='Posicion - Corte, biselado, fresado y/o tratamiento químico de vidrio plano' 
                    checked={posiciones.includes('Posicion - Corte, biselado, fresado y/o tratamiento químico de vidrio plano')}
                    onChange={handleChange} />
                Corte, biselado, fresado y/o tratamiento químico de vidrio plano
            </label>

            <label className='block mb-2'>
                <input type='checkbox' value='Posicion - Mecanizado' 
                    checked={posiciones.includes('Posicion - Mecanizado')}
                    onChange={handleChange} />
                Mecanizado
            </label>

            <label className='block mb-2'>
                <input type='checkbox' value='Posicion - Manipulación industrial de vidrio plano y/o curvo' 
                    checked={posiciones.includes('Posicion - Manipulación industrial de vidrio plano y/o curvo')}
                    onChange={handleChange} />
                Manipulación industrial de vidrio plano y/o curvo
            </label>

            <label className='block mb-2'>
                <input type='checkbox' value='Posicion - Otras tareas como operario de fábrica' 
                    checked={posiciones.includes('Posicion - Otras tareas como operario de fábrica')}
                    onChange={handleChange} />
                Otras tareas como operario de fábrica
            </label>
        </div>
    );
};

export default Operario;
