import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface SinSeguimientosProps {

}

const SinSeguimientos: FC<SinSeguimientosProps> = ({ }) => {
  const router = useRouter()
  const handleEncontrarEmpresas = () => {
    router.push('/search/ofertas')
  }
  const handleEncontrarProfesionales = () => {
    router.push('/search/profesionales')
  }
  return (
    <div>
      <p>En estos momentos no sigues a ningún otro usuario, o no se han encontrado publicaciones de los usuarios que sigues</p>
      <p> Encuentra empresas o usuarios a los que seguir</p>
      <button onClick={handleEncontrarEmpresas}
        className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
      >Encontrar empresas</button>
      <button onClick={handleEncontrarProfesionales}
        className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
      >Encontrar profesionales</button>
    </div>
  );
};

export default SinSeguimientos;