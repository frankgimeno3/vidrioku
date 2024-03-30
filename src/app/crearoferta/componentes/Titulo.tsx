import React from 'react';
interface TituloProps {
    titulo: string;
    setTitulo: (value: string) => void;
  }
  
  const Titulo: React.FC<TituloProps> = ({ titulo, setTitulo }) => {
  return (
    <div className='flex flex-col w-'>
      <label className='my-1' htmlFor="titulo">Título de la oferta</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        placeholder="Introduzca el título que se mostrará para su oferta"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="text-gray-500 text-sm mb-2 rounded-md"
      />
    </div>
  );
};

export default Titulo;