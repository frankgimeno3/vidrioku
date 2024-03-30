import React from 'react';
interface PaisProps {
    tipoJornada: string;
    setTipoJornada: (value: string) => void;
  }
  
  const Pais: React.FC<PaisProps> = ({ tipoJornada, setTipoJornada }) => {
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
            <option>Jornada completa sin fines de semana o festivos</option>
            <option>Media jornada sin fines de semana o festivos</option>
            <option>Jornada completa con fines de semana o festivos</option>
            <option>Media jornada con fines de semana o festivos</option>
            <option>Jornada completa flexible</option>
            <option>Media jornada flexible</option>
          </select>
    </>
  );
};

export default Pais;