import { User } from '@/app/components/interfaces/interfaces';
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';


interface perfilesEmpresasProps {
  id: any
}

const perfilesEmpresas: FC<perfilesEmpresasProps> = ({ id }) => {
  const [selectedUserObject, setSelectedUserObject] = useState<any>()

  useEffect(() => {
    const fetchDoc = async () => {
      if (id) {
        const docRef = doc(db, "users", id);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setSelectedUserObject(myUserData);
        }
      }
    };
    fetchDoc();
  }, [id]);


  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 h-full">
      <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Perfil de {selectedUserObject?.nombre}</h2>
      <div className="flex flex-col bg-gray-50 shadow-lg h-full text-left items-left w-full text-gray-500 py-8 px-24 overflow-scroll">
        <div className="flex flex-col items-center ">
          <Image src={"/inventedlogos/1.png"} alt="companyProfilePicture" height={100} width={100} />
          <p className="  text-base">{selectedUserObject?.nombre}</p>
          <div className='flex flex-row     text-md'>
            <button className="p-2 border shadow-lg rounded-lg  mt-5">
              Contactar empresa
            </button>
            <button className="ml-5 p-2 border shadow-lg rounded-lg   mt-5">
              Seguir
            </button>
          </div>
        </div>
        <h2 className="my-5 mx-5 text-xl">{selectedUserObject?.titulo}</h2>
        <div className="flex flex-col text-sm text-gray-500  bg-white  my-2 rounded shadow p-5">
          <div className='flex flex-row w-full mx-1'>
            <div className="flex-1 flex flex-col bg-white w-full p-3 my-1 mr-1 rounded-lg shadow-xl">
              <p className='text-gray-400 text-xs'>Nombre de la empresa </p>
              <div className='flex flex-row '>
                <span className="mr-1">{selectedUserObject?.nombre}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-white w-full p-3 my-1   rounded-lg shadow-xl">
              <p className='text-gray-400 text-xs'>Año de creación: </p>
              {selectedUserObject?.anoCreacion != undefined &&
                < span className='mr-1 '>{selectedUserObject?.anoCreacion} </span>
              }
              {selectedUserObject?.anoCreacion == undefined &&
                < span className='mr-1 '>Datos no introducidos</span>
              }
            </div>
          </div>
          <div className='flex flex-row w-full mx-1'>
            <div className="flex flex-col bg-white w-full p-3 my-1 mr-1  rounded-lg shadow-xl">
              <p className=' text-gray-400 text-xs'>Teléfono: </p>
              {selectedUserObject?.tel != undefined &&
                < span className='mr-1 '>{selectedUserObject?.tel} </span>
              }
              {selectedUserObject?.tel == undefined &&
                < span className='mr-1 '>Datos no introducidos</span>
              }
            </div>
            <div className="flex flex-col bg-white w-full p-3 my-1  rounded-lg shadow-xl">
              <p className=' text-gray-400 text-xs'>Actividad: </p>
              {selectedUserObject?.actividad != undefined &&
                < span className='mr-1 '>{selectedUserObject?.actividad} </span>
              }
              {selectedUserObject?.actividad == undefined &&
                < span className='mr-1 '>Datos no introducidos</span>
              }
            </div>
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Descripción </p>
            {selectedUserObject?.descripcion != undefined &&
              < span className='mr-1 '>{selectedUserObject?.descripcion} </span>
            }
            {selectedUserObject?.descripcion == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Ubicación </p>
            {selectedUserObject?.ubi != undefined &&
              < span className='mr-1 '>{selectedUserObject?.ubi} </span>
            }
            {selectedUserObject?.ubi == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Año de creación </p>
            {selectedUserObject?.creacion != undefined &&
              < span className='mr-1 '>{selectedUserObject?.creacion} </span>
            }
            {selectedUserObject?.creacion == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Número de empleados </p>
            {selectedUserObject?.empleados != undefined &&
              < span className='mr-1 '>{selectedUserObject?.empleados} </span>
            }
            {selectedUserObject?.empleados == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>
          <div className="flex flex-col bg-white w-full p-3 m-1 rounded-lg shadow-xl">
            <p className='mr-5 text-gray-400 text-xs'>Web </p>
            {selectedUserObject?.web != undefined &&
              < span className='mr-1 '>{selectedUserObject?.web} </span>
            }
            {selectedUserObject?.web == undefined &&
              < span className='mr-1 '>Datos no introducidos</span>
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default perfilesEmpresas;