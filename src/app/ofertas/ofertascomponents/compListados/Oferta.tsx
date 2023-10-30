import { FC } from 'react';
import Image from 'next/image';


const Oferta: FC = () => {
  return (
    <div className="flex flex-row justify-between items-center p-5 bg-gray-50 shadow-lg mb-1 text-gray-600">
      <Image src={"/inventedlogos/1.png"} alt="pepo" height={75} width={75}  />
      <div>
        
      </div>
      <h2>Tútulo de la oferta</h2>
    </div>
  );
};

export default Oferta;