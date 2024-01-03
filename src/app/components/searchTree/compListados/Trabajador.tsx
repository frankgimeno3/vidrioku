import { FC } from 'react';
import Image from 'next/image';

const Trabajador: FC = () => {
  const n1 = Math.floor(Math.random() * 6) + 1;
   return (
    <div className="flex flex-row w-full pt-1 bg-gray-50 ">
      <div className="flex flex-col bg-gradient-to-r from-gray-100 to-white   text-black w-full px-3 py-2   ">
        <h2 className="text-xs pt-1 text-right  ">Juan Antonio Recio Dominguez</h2>
        <div className="flex flex-col   ml-5 ">
          <h2 className='text-gray-600 bg-white shadow text-xs my-1 px-2 ml-6 mr-2 rounded text-right justify-right'>
            Ingeniero Técnico Mecánico  </h2>
          <h2 className='text-gray-600 bg-white shadow text-xs  1 px-2 ml-6 mr-2 mb-1 rounded text-right justify-right'>
            Ingeniero Técnico Industrial </h2>
          <div className='flex flex-row justify-end pr-2'>
            <p className=" text-gray-500 text-xs pr-1">
              Cuenca, España
            </p>
            <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" 
            className='w-3'
              enable-background="new 0 0 64 64" xmlSpace="preserve" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill="#231F20" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className='flex flex-col bg-white p-3 '>
        <Image
          src={`/profilepictures/${n1}.jpg`}
          alt="ing1"
          width={120}
          height={20}
          className=" shadow-lg rounded-full "
        /></div>
    </div>
  );
};

export default Trabajador;