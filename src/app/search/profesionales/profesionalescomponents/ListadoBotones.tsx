import React, { FC, useEffect, useState } from 'react';

interface ListadoBotonesProps { 
  subArraySeleccionado: number;
  arrayDe7ElementosPorPagina: any[]; 
  setSubArrayseleccionado: React.Dispatch<React.SetStateAction<number>>;
}

const ListadoBotones: FC<ListadoBotonesProps> = ({ subArraySeleccionado, arrayDe7ElementosPorPagina,  setSubArrayseleccionado }) => {
  const [arrayRecibido, setArrayRecibido] = useState<any[]>([]);

  useEffect(() => {
    setArrayRecibido(arrayDe7ElementosPorPagina);
  }, [arrayDe7ElementosPorPagina]);

  return (
    <div className="flex flex-row justify-end items-center px-2">
      {arrayRecibido.map((elemento, index) => (
        <div key={index}>
          {index === subArraySeleccionado ? (
            <button
              className='px-3 py-1 rounded-lg shadow-2xl text-gray-600 mx-2 bg-gray-100'
              onClick={() => setSubArrayseleccionado(index)}
            >
              {index + 1}
            </button>
          ) : (
            <button
              className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100 hover:shadow-2xl'
              onClick={() => setSubArrayseleccionado(index)}
            >
              {index + 1}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListadoBotones;