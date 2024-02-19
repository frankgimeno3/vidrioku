import React, { FC } from 'react'
import Image from 'next/image';
import Link from 'next/link';


interface empresaCardProps {
  userData: any;
  user: any
}

const empresaCard: FC<empresaCardProps> = ({ userData, user }) => {

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-cyan-950 to-zinc-700  px-auto  text-gray-500 py-12   ">
      <div className="flex flex-col  flex  justify-center  mx-10  ">
        <h2 className='text-white py-2'>Datos generales</h2>
        <Image src="/icons/empresas.png" alt="" width={200} height={200} className="mx-auto my-5" />
        <div className='flex flex-row w-full mx-1'>
          <div className="flex-1 flex flex-col bg-white w-full p-3 my-1 mr-1 rounded-lg shadow-xl">
            <p className='text-gray-400 text-xs'>Nombre de la empresa </p>
            <div className='flex flex-row '>
              <span className="mr-1">{user?.nombre}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-white w-full p-3 my-1   rounded-lg shadow-xl">
            <p className='text-gray-400 text-xs'>Año de creación: </p>
            {user?.anoCreacion != undefined &&
              < span className='mr-1 '>{user?.anoCreacion} </span>
            }
            {user?.anoCreacion == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
        </div>
        <div className='flex flex-row w-full mx-1'>
          <div className="flex flex-col bg-white w-full p-3 my-1 mr-1  rounded-lg shadow-xl">
            <p className=' text-gray-400 text-xs'>Teléfono: </p>
            {user?.tel != undefined &&
              < span className='mr-1 '>{user?.tel} </span>
            }
            {user?.tel == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
          <div className="flex flex-col bg-white w-full p-3 my-1  rounded-lg shadow-xl">
            <p className=' text-gray-400 text-xs'>Actividad: </p>
            {user?.actividad != undefined &&
              < span className='mr-1 '>{user?.actividad} </span>
            }
            {user?.actividad == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
        </div>
        <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
          <p className='mr-5 text-gray-400 text-xs'>Descripción </p>
          {user?.descripcion != undefined &&
            < span className='mr-1 '>{user?.descripcion} </span>
          }
          {user?.descripcion == undefined &&
            < span className='mr-1 '>Datos no introducidos</span>
          }
        </div>
        <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
          <p className='mr-5 text-gray-400 text-xs'>Ubicación </p>
          {user?.ubi != undefined &&
            < span className='mr-1 '>{user?.ubi} </span>
          }
          {user?.ubi == undefined &&
            < span className='mr-1 '>Datos no introducidos</span>
          }
        </div>
        <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
          <p className='mr-5 text-gray-400 text-xs'>Año de creación </p>
          {user?.creacion != undefined &&
            < span className='mr-1 '>{user?.creacion} </span>
          }
          {user?.creacion == undefined &&
            < span className='mr-1 '>Datos no introducidos</span>
          }
        </div>
        <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
          <p className='mr-5 text-gray-400 text-xs'>Número de empleados </p>
          {user?.empleados != undefined &&
            < span className='mr-1 '>{user?.empleados} </span>
          }
          {user?.empleados == undefined &&
            < span className='mr-1 '>Datos no introducidos</span>
          }
        </div>
        <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
          <p className='mr-5 text-gray-400 text-xs'>Web </p>
          {user?.web != undefined &&
            < span className='mr-1 '>{user?.web} </span>
          }
          {user?.web == undefined &&
            < span className='mr-1 '>Datos no introducidos</span>
          }
        </div>
        <div className='mx-auto py-5'>
        <Link href={`/perfil/editar/${userData}`}>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs  "
          >Editar información de mi perfil de profesional</button>
        </Link>
      </div>
      </div>
    </div >
  )
}

export default empresaCard