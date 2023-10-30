import { FC } from 'react';
import Image from 'next/image';


const profesional: FC = () => {
  return (
    <div className="flex flex-row justify-left items-center p-5 bg-gray-50 hover:bg-gray-100 shadow-lg mb-1 text-gray-600">
      <Image src={"/profilepictures/2.jpg"} alt="pepo" height={75} width={75}  />
      <div className='justify-left pl-5 w-full'>
        <h2>Nombre y apellidos del profesional</h2>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col text-sm text-gray-500'>
            <p>Oficio</p>
            <p>Lugar de residencia</p>
          </div>
          <div className='flex flex-row'>
            <button> Nombre de la posición deseada</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default profesional;