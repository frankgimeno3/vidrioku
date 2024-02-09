import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface profesionalCardProps {
  user: any;
  userData: any;
}

const profesionalCard: FC<profesionalCardProps> = ({ user, userData }) => {

  return (
    <div className="  flex flex-col flex-1  justify-between bg-gradient-to-b from-slate-900 to-slate-600">
      <div className="flex flex-col p-4  flex justify-between text-center justify-center px-auto bg-white mx-10 my-5
          rounded text-gray-500 ">
        <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Nombre y apellidos: </p>
          <span className="mr-1">{user?.nombre}</span>
          <span className="capitalize">{user?.apellidos}</span>
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Año de nacimiento: </p>
          <span className='mr-1'>{user?.edad} </span>
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Género: </p>
          <span className="capitalize">{user?.genero}</span>
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Residencia actual: </p>
          <span>{user?.ubi}</span>
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>DNI o NIE: </p>
          <span>{user?.DNI}</span>
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Teléfono </p>
          <span>{user?.tel}</span>
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Linkedin </p>
          <span>{user?.linkedin}</span>
        </div>

        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Permiso de conducción? </p>
          {user?.permiso == true &&
            <span>Sí</span>
          }
          {user?.permiso == false &&
            <span>No</span>
          }
        </div>
        <div className="flex flex-row mx-auto">
          <p className='mr-5'>Vehículo propio? </p>
          {user?.vehiculo == true &&
            <span>Sí</span>
          }
          {user?.vehiculo == false &&
            <span>No</span>
          }
        </div>
      </div>
      {user?.carta &&
        <div className="flex flex-col mx-auto bg-white rounded text-gray-500 mx-10 p-4 text-center">
          <p className='mr-5'>Carta de presentación </p>
          <span>{user?.carta}</span>
        </div>
      }
      <div className='mx-auto py-5'>
        <Link href={`/perfil/${userData}/editar`}>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
          >Editar información de mi perfil de profesional</button>
        </Link>
      </div>
    </div>)
}

export default profesionalCard