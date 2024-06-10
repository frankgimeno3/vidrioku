import React, { FC } from 'react';

interface perfilesProfesionalesProps {
  id:any
}

const perfilesProfesionales: FC<perfilesProfesionalesProps> = ({id }) => {
  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 h-full">
    <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Perfil de {id}</h2>
    <div className="mx-6 bg-white bg-opacity-50   text-zinc-900 p-5 ">
      
      perfilesProfesionales {id}
      </div>
      </div>  );
};

export default perfilesProfesionales;