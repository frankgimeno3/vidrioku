import React from 'react';
interface TituloProps {
    descripcion: string;
    setDescripcion: (value: string) => void;
  }
  
  const Descripcion: React.FC<TituloProps> = ({ descripcion, setDescripcion }) => {
  return (
    <>
          <label htmlFor="descripcion">Descripción general del empleo</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Introduzca descripción del empleo"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
          />
    </>
  );
};

export default Descripcion;