import React from 'react';
interface TituloProps {
    tipoJornada: string;
    setTipoJornada: (value: string) => void;
  }
  
  const Jornada: React.FC<TituloProps> = ({ tipoJornada, setTipoJornada }) => {
  return (
    <>
             <label htmlFor="tipoJornada">Tipo de jornada</label>
          <select
            id="tipoJornada"
            name="tipoJornada"
            value={tipoJornada}
            onChange={(e) => setTipoJornada(e.target.value)}  
            className="text-gray-500 text-sm mb-2 rounded-md"
          >
            <option>Jornada Completa</option>
            <option>Jornada Parcial</option>
          </select>
    </>
  );
};

export default Jornada;