import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface FooterProps {
}

const Prefooter: React.FC<FooterProps> = ({ }) => {
  const router = useRouter();

  const goUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
    });}

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
        <div className='flex flex-col pt-2 items-center '>
                  <svg className="h-14 w-14 z-50 hover:h-16 hover:16" clipRule="evenodd" 
      onClick={goUp}
      fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.998 21.995c5.517 0 9.997-4.48 9.997-9.997 0-5.518-4.48-9.998-9.997-9.998-5.518 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.997 9.998 9.997zm0-1.5c-4.69 0-8.498-3.807-8.498-8.497s3.808-8.498 8.498-8.498 8.497 3.808 8.497 8.498-3.807 8.497-8.497 8.497zm4.845-6.711c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291zm-7.564-.289h5.446l-2.718-3.522" fill="gray" />
      </svg>
      </div>

      </div>
    </div>
  );
};

export default Prefooter;