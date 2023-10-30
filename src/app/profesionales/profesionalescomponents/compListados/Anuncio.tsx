import { FC } from 'react';
import Image from 'next/image';

const Anuncio: FC = () => {
  return (
    <div className="flex flex-row justify-center items-center py-1 px-4  ">
       <Image
                src="/anuncio2.jpg"
                alt="ing2"
                width={400}
                height={20}
                className="rounded-lg shadow-lg border border-gray-300"
              />
    </div>
  );
};

export default Anuncio;