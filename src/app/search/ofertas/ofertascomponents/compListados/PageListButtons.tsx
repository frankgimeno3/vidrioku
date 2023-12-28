import { FC, useEffect, useState } from 'react';

interface PageListButtonsProps {
  arrayDe7ElementosPorPágina: any;
}
// hay que pasarle ya en un array las ofertas en grupos de 7 o - elementos. 

const PageListButtons: FC<PageListButtonsProps> = ({ arrayDe7ElementosPorPágina }) => {
  const [arrayRecibido, setArrayRecibido] = useState<any[]>([]);

  useEffect(() => {
    setArrayRecibido(arrayDe7ElementosPorPágina);
    console.log("arrayDe7ElementosPorPágina", arrayDe7ElementosPorPágina)
  }, [arrayDe7ElementosPorPágina]);

  return (
    <div className="flex flex-row justify-end items-center px-2">
      {arrayRecibido.map((elemento, index) => (
        //hay que hacer que el button redirija a la página /search/ofertas/nº página... a ver cómo lo logramos
        <button
          key={index}
          className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100 hover:shadow-2xl'
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PageListButtons;