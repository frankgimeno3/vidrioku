import { FC } from 'react';
import Image from 'next/image';

const Pasarela: FC = () => {
  return (
    <div className='  py-3'>
    <h3 className='text-gray-500 text-xs pl-5 text-center'>Empresas destacadas</h3>
      <div className="flex flex-row justify-center items-center  px-2 ">
        <Image
          src="/inventedLogos/1.png"
          alt="ing1"
          width={85}
          height={20}
          className="rounded-lg shadow-lg border border-gray-300 p-1 hover:w-24"
        />
        <Image
          src="/inventedLogos/2.png"
          alt="ing2"
          width={85}
          height={20}
          className="rounded-lg shadow-lg border border-gray-300 p-1 hover:w-24"
        />
        <Image
          src="/inventedLogos/3.png"
          alt="ing3"
          width={85}
          height={20}
          className="rounded-lg shadow-lg border border-gray-300 p-1 hover:w-24"
        />
        <Image
          src="/inventedLogos/7.png"
          alt="ing7"
          width={85}
          height={20}
          className="rounded-lg shadow-lg border border-gray-300 p-1 hover:w-24"
        />
      </div>
    </div>
  );
};

export default Pasarela;