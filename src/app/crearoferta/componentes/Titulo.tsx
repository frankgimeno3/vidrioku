import React from 'react';
interface TituloProps {
    titulo: string;
    setTitulo: (value: string) => void;
  }
  
  const Titulo: React.FC<TituloProps> = ({ titulo, setTitulo }) => {
  return (
    <div>
      <label htmlFor="titulo">Título de la oferta</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        placeholder="Introduzca título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="text-gray-500 text-sm mb-2 rounded-md"
      />
    </div>
  );
};

export default Titulo;