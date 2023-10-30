import { FC } from 'react';
import Image from 'next/image';


const Oferta: FC = () => {
  return (
    <div className="flex flex-row justify-left items-center p-5 bg-gray-50 hover:bg-gray-100 shadow-lg mb-1 text-gray-600">
      <Image src={"/inventedlogos/1.png"} alt="pepo" height={75} width={75} />
      <div className='justify-left pl-5 w-full'>
        <h2>Título de la oferta</h2>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col text-sm text-gray-500'>
            <p>Empresa</p>
            <p>Lugar</p>
          </div>
          <div className='flex flex-row'>
            <button> Nombre de la posición</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Oferta;