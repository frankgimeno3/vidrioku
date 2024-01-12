import { FC } from 'react';
import Image from 'next/image';

interface profesionalProps {
  trabajador: any;
  setRenderProfesional: any;
}

const profesional: FC<profesionalProps> = ({ trabajador, setRenderProfesional }) => {
  return (
    <div className="flex flex-row justify-left items-center p-5 bg-gray-50 hover:bg-gray-200 shadow-lg mb-1 text-gray-600"
      onClick={() => { setRenderProfesional(trabajador) }}>
<div className='w-24 h-20 overflow-hidden'>
  <Image
    src={trabajador?.profilepicture || "/icons/empty-user-profile.png"}
    alt="Profesional"
    width={100}
    height={100}
    style={{ objectFit: 'cover', height: '100%', width: 'auto' }}
  />
</div>
      <div className='justify-left pl-5 w-full'>
        <h2>{trabajador?.nombre} {trabajador?.apellidos}</h2>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col text-sm text-gray-500'>
            <p>Oficio</p>
            <p>{trabajador?.ubi}</p>
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