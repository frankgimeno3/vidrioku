import React from 'react';
interface TituloProps {
  titulo: string;
  setTitulo: (value: string) => void;
  nombreEmpresa: string;
  setNombreEmpresa: (value:string) => void;
  }
  
  const Titulo: React.FC<TituloProps> = ({ titulo, setTitulo }) => {
  return (
    <div className='flex flex-col '>
      <label className='my-1' htmlFor="titulo">Título de la oferta</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        placeholder="Introduzca el título que se mostrará para su oferta"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="text-gray-500 text-sm mb-2 rounded-md"
        required  
      />
            <label className='my-1 mt-5' htmlFor="nombreEmpresa">Nombre a mostrar como empresa, marca, filial o departamento</label>
      <input
        type="text"
        id="nombreEmpresa"
        name="nombreEmpresa"
        placeholder="Introduzca el nombre a mostrar como empresa, marca o filial en la oferta"
        value={nombreEmpresa}
        onChange={(e) => setNombreEmpresa(e.target.value)}
        className="text-gray-500 text-sm mb-2 rounded-md"
        required  
      />
    </div>
  );
};

export default Titulo;