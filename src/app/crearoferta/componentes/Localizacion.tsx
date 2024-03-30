import React from 'react';
interface TituloProps {
    tipoLocalizacion: string;
    setTipoLocalizacion: (value: string) => void;
  }
  
  const Jornada: React.FC<TituloProps> = ({ tipoLocalizacion, setTipoLocalizacion }) => {
  return (
    <>
            <label htmlFor="tipoLocalizacion">Tipo de localización</label>
          <select
            id="tipoLocalizacion"
            name="tipoLocalizacion"
            value={tipoLocalizacion}
            onChange={(e) => setTipoLocalizacion(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
            required  
          >
            <option>Trabajo Híbrido</option>
            <option>Trabajo Remoto</option>
            <option>Trabajo Presencial</option>
          </select>
    </>
  );
};

export default Jornada;