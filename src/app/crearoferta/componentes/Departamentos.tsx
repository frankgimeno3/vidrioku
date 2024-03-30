import React, { useEffect, useState } from 'react';
import Posicion from './Posicion';

interface DepartamentosProps {
  departamentos: string[];
  setDepartamentos: React.Dispatch<React.SetStateAction<string[]>>;
  posiciones: any;
  setPosiciones: any;
  otraPosicion: any;
  setOtraPosicion: any;
}

const Departamentos: React.FC<DepartamentosProps> = ({ departamentos, setDepartamentos, posiciones, setPosiciones, otraPosicion, setOtraPosicion }) => {

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (departamentos.includes(value)) {
      setDepartamentos(departamentos.filter((dep) => dep !== value));
     } else {
      setDepartamentos([...departamentos, value]);
    }
  };
  const isCheckboxChecked = (value: string) => {
    return departamentos.includes(value);
  };

  return (
    <>
      <div className='my-5 bg-white py-2 rounded-lg pt-8 px-5'>
        <label htmlFor="departamentos" className='text-gray-600'>En qué departamento trabajará el empleado? </label>
        <div id="departamentos" className="text-sm mb-2 rounded-md flex flex-row text-left text-gray-600">
          <div className='flex flex-col py-5'>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="comercial" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("comercial")} />
              <p className='ml-2'>Departamento comercial</p>
            </label>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="compras" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("compras")} />
              <p className='ml-2'>Departamentos de compras o aprovisionamiento</p>
            </label>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="dtecnico" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("dtecnico")} />
              <p className='ml-2'>Departamento técnico o de ingeniería</p>
            </label>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="operario" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("operario")} />
              <p className='ml-2'>Operario en fabricación o instalación en el sector del vidrio</p>
            </label>
          </div>
          <div className='flex flex-col py-5'>
            <label className='flex flex-row mx-5 my-1 '>
              <input type="checkbox" name="departamento" value="mantenimiento" className='mt-1' onChange={handleChange} checked={isCheckboxChecked("mantenimiento")} />
              <p className='ml-2'>Técnico de mantenimiento y/o prevención</p>
            </label>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="calidad" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("calidad")} />
              <p className='ml-2'>Técnico de calidad</p>
            </label>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="logistica" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("logistica")} />
              <p className='ml-2'>Profesional de la logística</p>
            </label>
            <label className='flex flex-row mx-5 my-1 items-start'>
              <input type="checkbox" name="departamento" value="Otros" className='my-auto' onChange={handleChange} checked={isCheckboxChecked("Otros")} />
              <p className='ml-2'>Otros</p>
            </label>
          </div>
        </div>
      {departamentos.includes("Otros") && (
        <div className='w-full px-5'>
          <label htmlFor="otraPosicion" className='text-gray-600'>Especifique una posición y/o departamento específicos en que el empleado trabajará</label>
          <textarea
            id="otraPosicion"
            name="otraPosicion"
            value={otraPosicion}
            onChange={(e) => setOtraPosicion(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-2 w-full"
            />
        </div>
      )}
    {departamentos.length > 0 && <Posicion departamentos={departamentos} posiciones={posiciones} setPosiciones={setPosiciones} />}
    </div>
 </>
  );
};

export default Departamentos;