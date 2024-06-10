import { User } from '@/app/components/interfaces/interfaces';
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';

interface perfilesProfesionalesProps {
  id: any
}

const perfilesProfesionales: FC<perfilesProfesionalesProps> = ({ id }) => {
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
      <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Perfil de {selectedUserObject?.nombre} {selectedUserObject?.apellidos}</h2>
      <div className="flex flex-col bg-gray-50 shadow-lg h-full text-left items-left w-full text-gray-500 py-8 px-24 overflow-scroll">
        <div className="flex flex-col items-center">
          <Image src="/icons/empty-user-profile.png" alt="pepo" height={150} width={150} className="rounded-full shadow-xl" />
          <h2 className="mt-5 text-xl">{selectedUserObject?.nombre} {selectedUserObject?.apellidos}</h2>
          <div className='flex flex-row py-5 pb-12 text-md'>
            <button className="p-2 border shadow-lg rounded-lg  mt-5">
              Contactar profesional
            </button>
            <button className="ml-5 p-2 border shadow-lg rounded-lg   mt-5">
              Seguir
            </button>
          </div>
        </div>
        <div className="flex flex-col text-sm text-gray-500 bg-white my-2 rounded shadow p-5">

          <div className="flex flex-col mt-5">
            <p className="font-bold text-gray-400">Lugar de residencia actual:</p>
            <p>{selectedUserObject?.ubi}</p>
          </div>
        </div>
        <div className="bg-white p-5 my-2 rounded shadow">
          <p className="text-sm font-bold text-gray-400">
            Descripción general
          </p>
          <p className="text-sm mt-1">
            {selectedUserObject?.carta}
          </p>
        </div>
        <div className="bg-white p-5 my-2 rounded shadow">
          <p className="text-sm font-bold text-gray-400">
            Experiencia laboral
          </p>
          <div className="mt-1 flex flex-col">
            {selectedUserObject?.recorridoLaboral?.map((exp: any, index: any) => (
              <div key={index} className="py-1 ml-2">
                <p>·   {exp.cargo} en {exp.empresa} (desde {exp.desde} hasta {exp.hasta}):</p>
                <p className='pl-3'>{exp.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 my-2 rounded shadow">
          <p className="text-sm font-bold text-gray-400">
            Educación, títulos, certificados y licencias
          </p>
          {selectedUserObject?.estudios?.map((exp: any, index: any) => (
            <div key={index} className="py-1 ml-2">
              <p>·   {exp.concepto} en {exp.entidademisora} ({exp.hasta}):</p>
              <p className='pl-3'>{exp.descripcion}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-5 my-2 rounded shadow">
          <p className="text-sm font-bold text-gray-400">
            Idiomas
          </p>
          {selectedUserObject?.idiomas?.map((idioma: any, index: any) => (
            <div key={index} className="py-1 ml-2">
              <p>·   {idioma.idioma}, nivel: {idioma.nivel} </p>
            </div>
          ))}
        </div>

      </div>
    </div>

  );
};

export default perfilesProfesionales;