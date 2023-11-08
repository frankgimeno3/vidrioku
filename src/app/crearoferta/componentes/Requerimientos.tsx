import React from 'react';

interface TituloProps {
  habilidadRequerida: string;
  handleHabilidadRequeridaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Requerimientos: React.FC<TituloProps> = ({ habilidadRequerida, handleHabilidadRequeridaChange }) => {
  return (
    <>
      <label htmlFor="habilidadRequerida">Experiencia y habilidades requeridas</label>
      <input
        type="text"
        id="habilidadRequerida"
        name="habilidadRequerida"
        placeholder="Insertar habilidad requerida"
        value={habilidadRequerida}
        onChange={handleHabilidadRequeridaChange}
        className="text-gray-500 text-sm mb-2 rounded-md"
      />
    </>
  );
};

export default Requerimientos;