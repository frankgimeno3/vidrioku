import { FC, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
 

const NavUnlogged: FC  = ({ }) => {
   const router = useRouter();
  const redirectHome = ()=>{
    router.push('/')
  }
 const  handleIniciarSesion = ()=>{
  router.push('/signin')
 }
  const handleRegistro = ()=>{
    router.push('/signup')
  }

  return (
    <div className="bg-white shadow-lg p-4 flex justify-between border border-gray-100 px-6 text-black">
      <div className="flex items-center" 
      onClick={redirectHome}
      >  
        <Image src="/logos/3.png" alt="Logo3" width={50} height={50}  className='hover:opacity-90  '/>
      </div>
      <div className="flex items-center">
        <div className="mr-4" 
        onClick={handleRegistro}
        >
        <button className='hover:font-bold'>Registro</button>

        </div>
        <div className="mr-4"
        onClick={handleIniciarSesion}
        >
        <button className='hover:font-bold'>Iniciar Sesión</button>
        </div>
         
      </div>
    </div>
  );
};

export default NavUnlogged;