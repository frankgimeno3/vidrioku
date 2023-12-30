import { FC, useEffect, useState } from 'react';

interface PageListButtonsProps {
  arrayDe7ElementosPorPágina: any;
  subArraySeleccionado:any;
  setSubArrayseleccionado:any;
}
// hay que pasarle ya en un array las ofertas en grupos de 7 o - elementos. 

const PageListButtons: FC<PageListButtonsProps> = ({ arrayDe7ElementosPorPágina, subArraySeleccionado,  setSubArrayseleccionado }) => {
  const [arrayRecibido, setArrayRecibido] = useState<any[]>([]);

  useEffect(() => {
    setArrayRecibido(arrayDe7ElementosPorPágina);
  }, [arrayDe7ElementosPorPágina]);


  return (
    <div className="flex flex-row justify-end items-center px-2">
      {arrayRecibido.map((elemento, index) => (
        // Envuelve cada par de botones en un fragmento con una key única
        <div key={index}>
          {index == subArraySeleccionado && (
            <button
              className='px-3 py-1 rounded-lg shadow-2xl text-gray-600 mx-2 bg-gray-100'
              onClick={()=>setSubArrayseleccionado(index)}
            >
              {index + 1}
            </button>
          )}
          {index != subArraySeleccionado && (
            <button
              className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100 hover:shadow-2xl'
              onClick={()=>setSubArrayseleccionado(index)}
            >
              {index + 1}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PageListButtons;