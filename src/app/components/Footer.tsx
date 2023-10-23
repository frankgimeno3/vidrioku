import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface FooterProps {
  onPageChange: (pageName: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const router = useRouter();

  const redirection = (pageName: string) => {
    onPageChange(pageName)
    router.push("/");
  };


  return (
    <div className="bg-gray-50 shadow-lg p-4 pt-12 flex justify-center  border-gray-300">
      <div className="mx-5 lg:mx-24 text-gray-600 relative z-10">
        <div className="flex flex-col   items-top justify-between align-top ">
          <div className="flex-1">
            <h3 className="text-sm text font-semibold">Sobre Nosotros</h3>
            <p className="text-xs mt-2">
              Somos una agencia de desarrolladores web con sede en Barcelona, comprometidos en ofrecer soluciones de desarrollo de software de alta calidad. Nuestro equipo está formado por expertos en diferentes tecnologías y estamos dedicados a ayudar a nuestros clientes a alcanzar sus objetivos tecnológicos.
            </p>
            <p className="text-xs">
              Actualmente, formamos parte del grupo PROPORCION3,S.A. medios de comunicación .</p>
          </div>
          <div className='flex flex-row py-5 mx-auto'>
            <div className="flex-1 text-left sm:py-1" >
              <h3 className="text-sm font-semibold">Enlaces Rápidos</h3>
              <div className="flex flex-col  text-xs">
                <button className="mt-2 text-left md:text-center" onClick={() => redirection('Home')} >Inicio</button>
                <button className="mt-3 text-left md:text-center" onClick={() => redirection('QuienesSomos')} >Nosotros</button>
                <button className="mt-3 text-left md:text-center" onClick={() => redirection('Servicios')} >Servicios</button>
                <button className="mt-3 text-left md:text-center" onClick={() => redirection('Contacto')} >Contacto</button>
              </div>
            </div>
            <div className=" flex-1">
              <h3 className="text-sm font-semibold">Contáctanos</h3>
              <address className="flex flex-col text-xs mt-2">
                <p className='pt-1'>Dirección: Bruc 48, Barcelona</p>
                 <p className='pt-1'>Teléfono: (+34) *** *** ***</p>
                 <p className='pt-1'>Email: info@vidrioku.es</p>
              </address>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-zinc-800 text-sm">
          &copy; 2023 PROPORCION3,S.A. | Todos los derechos reservados
          <Image src="/logos/3.png" alt="Logo3" width={50} height={50} className='mx-auto pt-5'/>

        </div>
      </div>
    </div>
  );
};

export default Footer;