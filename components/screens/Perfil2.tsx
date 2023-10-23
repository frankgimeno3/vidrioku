import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

 
const Perfil: FC = ({ }) => {
  const router = useRouter();



  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Perfil de usuario</h2>
      <div className='flex flex-col '>
        <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100  rounded-lg my-6 mt-4">
          <h2 className='mt-2 text-md text-center px-8 pt-5 '>Frank Gimeno Ruiz</h2>
          <div className='flex flex-row mt-5'>
            <Image
              src="/profilepictures/3.jpg"
              alt="ing2"
              width={140}
              height={20}
              className=" rounded-lg mx-auto"
            />
          </div>
          <div className='flex flex-row justify-center mt-3'>
            <p className=" text-gray-500 text-sm pr-1">
              Barcelona, España
            </p>
            <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" className='w-5'
              enable-background="new 0 0 64 64" xmlSpace="preserve" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill="#adadad" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
              </g>
            </svg>
          </div>
          <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-4">
            <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Ocupación actual</h2>
            <h2 className='mt-1 text-sm mb-2 mx-5'>  Desarrollador de webs y aplicaciones móviles en Software Experts  </h2>
          </div>

          <div className="mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-4">
            <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Estudios</h2>
            <div className="mx-5 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-2 text-xs p-1">
              <h3 className='font-bold text-sm m-1'>Ironhack Bootcamp Barcelona</h3>
              <h3 className='m-1 '>Desarrollo de páginas web</h3>
            </div>
            <div className="mx-5 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-2 text-xs p-1">
              <h3 className='font-bold text-sm m-1'>Udemy.com</h3>
              <h3 className='m-1 '>Formación online para desarrollo de aplicaciones móviles</h3>
            </div>
            <div className="mx-5 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-2 text-xs p-1">
              <h3 className='font-bold text-sm m-1'>Universidad de Barcelona</h3>
              <h3 className='m-1 '>Grado en Administración y Dirección de Empresas</h3>
            </div>
          </div>
          <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-4">
            <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Experiencia</h2>
            <div className="mx-5 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-2 text-xs p-1">
              <h3 className='text-right m-1 text-xs font-light'>(Marzo 2023 - Actualidad)</h3>
              <h3 className='font-bold text-sm m-1'>SoftwareExperts </h3>
              <h3 className='m-1 '>Full Stack Developer</h3>
            </div>
            <div className="mx-5 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-2 text-xs p-1">
              <h3 className='text-right m-1 text-xs font-light'>(2022 - 2023)</h3>
              <h3 className='font-bold text-sm m-1'>It Brings Art </h3>
              <h3 className='m-1 '>Operations manager</h3>
            </div>
            <div className="mx-5 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-2 text-xs p-1">
              <h3 className='text-right m-1 text-xs font-light'>(2015 - 2022)</h3>
              <h3 className='font-bold text-sm m-1'>VIDRIOPERFIL.COM - Proporcion 3, S.A. </h3>
              <h3 className='m-1 '>Comercial - Jefe de ventas</h3>
            </div>
          </div>
          <div className="  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-4">
            <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>Idiomas</h2>
            <h2 className='mt-1 text-sm mb-2 mx-5'> Inglés - <span className='font-bold'>Avanzado</span> </h2>
            <h2 className='mt-1 text-sm mb-2 mx-5'> Catalán - <span className='font-bold'>Nativo</span> </h2>
            <h2 className='mt-1 text-sm mb-2 mx-5'> Español - <span className='font-bold'>Nativo</span> </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil; 