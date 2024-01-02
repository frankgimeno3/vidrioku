import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface FooterProps {
}

const Prefooter: React.FC<FooterProps> = ({ }) => {
  const router = useRouter();


  return (
    <div className="bg-gray-50 shadow-lg py-12 flex justify-center p-4 ">
      <div className="mx-5 lg:mx-24 text-gray-600 relative z-10 ">
        <div className="flex flex-col  justify-between  ">
             <h3 className="text-md text font-semibold">Sobre Nosotros</h3>
            <p className="text-sm mt-2">
              Bolsa de empleo técnico especializada en el sector del vidrio.
            </p>
            <p className="text-sm">
              Actualmente, formamos parte del grupo PROPORCION3,S.A. medios de comunicación .</p>
 
            <h3 className="text-md font-semibold mt-5">Contáctanos</h3>
            <address className="flex flex-col text-sm mt-1">
              <p className='pt-1'>Dirección: Bruc 48, Barcelona</p>
              <p className='pt-1'>Teléfono: (+34) *** *** ***</p>
              <p className='pt-1'>Email: info@vidrioku.es</p>
            </address>
        </div>
        <div className="mt-8 text-center text-zinc-800 text-sm">
          &copy; 2023 PROPORCION3,S.A. | Todos los derechos reservados
          <Image src="/logos/3.png" alt="Logo3" width={50} height={50} className='mx-auto pt-5' />

        </div>
      </div>
    </div>
  );
};

export default Prefooter;