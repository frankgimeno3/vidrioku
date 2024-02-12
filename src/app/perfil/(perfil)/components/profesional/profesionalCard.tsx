import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface profesionalCardProps {
  user: any;
  userData: any;
}

const profesionalCard: FC<profesionalCardProps> = ({ user, userData }) => {

  return (
    <div className="flex flex-col flex-1 px-auto  text-gray-500 py-12   ">

      <div className="flex flex-col  flex  justify-center  mx-10  ">
            <h2 className='text-white py-2'>Datos generales</h2>
        <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
        <div className='flex flex-row'>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Nombre y apellidos: </p>
            <div className='flex flex-row '>
              <span className="mr-1">{user?.nombre}</span>
              <span className="capitalize">{user?.apellidos}</span>
            </div>
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Año de nacimiento: </p>
            <span className='mr-1 '>{user?.edad} </span>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Género: </p>
            <span className="capitalize ">{user?.genero}</span>
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Residencia actual: </p>
            <span className=' '>{user?.ubi}</span>
          </div>
        </div>
        {user?.DNI && user?.DNI != '' &&
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>DNI o NIE: </p>
            <span>{user?.DNI}</span>
          </div>
        }
        {user?.tel && user?.tel != '' &&
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Teléfono </p>
            <span>{user?.tel}</span>
          </div>
        }
        {user?.linkedin && user?.linkedin != '' &&
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Linkedin </p>
            <span>{user?.linkedin}</span>
          </div>
        }
        {user?.permiso == true &&
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Permiso de conducción? </p>
            <span>Sí</span>
          </div>
        }
        {user?.vehiculo == true &&
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Vehículo propio? </p>
            <span>Sí</span>
          </div>}
      </div>
      {user?.carta &&
        <div className="flex flex-col  flex  justify-center  mx-10  ">
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">

            <p className='mr-5 text-gray-400 text-xs'>Carta de presentación </p>
            <span>{user?.carta}</span>
          </div>
        </div>
      }
      <div className='mx-auto py-5'>
        <Link href={`/perfil/${userData}/editar`}>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs  "
          >Editar información de mi perfil de profesional</button>
        </Link>
      </div>
    </div>
  )
}

export default profesionalCard