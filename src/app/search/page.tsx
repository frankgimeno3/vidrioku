"use client"
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import TipoOferta from '../components/searchTree/searchcomponents/algoritmofertas/TipoOferta'
import TipoTrabajador from '../components/searchTree/searchcomponents/algoritmotrabajadores/TipoTrabajador'
import ListadoTrabajadores from '../components/searchTree/bolsaTrabajadores/listadoTrabajadores';
import ListadoOfertas from '../components/searchTree/bolsaOfertas/listadoOfertas'
import Perfil from '../components/screens/Perfil2';
import Navbar from '../components/Navbar';

const Search: FC = () => {
  const router = useRouter();
  const [tipoConsulta, setTipoConsulta] = useState('');

  // const [isOfertasSelected, setIsOfertasSelected] = useState(false);
  // const [isTrabajadoresSelected, setIsTrabajadoresSelected] = useState(false);
 
  const setOfertas = () => {
    // setTipoConsulta('Ofertas');
    router.push('/ofertas')
  };

  const setTrabajadores = () => {
    // setTipoConsulta('Trabajadores');
    router.push('/profesionales')
  };

  return (
    <>
          <Navbar   />

      <div className="flex flex-col    bg-gradient-to-b from-zinc-900 to-zinc-600 ">
        <h2 className="bg-zinc-800  bg-opacity-50 font-bold text-lg  py-3 text-center ">Búsqueda</h2>
{/* 
        {!isOfertasSelected && !isTrabajadoresSelected && */}
          <div className="  mx-6  bg-white bg-opacity-5  text-zinc-100 min-h-screen ">
            <div className="flex flex-col p-5 ">
              <h2 className='text-center'>Qué desea consultar?</h2>
              <div className="flex flex-row pt-1 text-xs">
                <button
                  className={`${tipoConsulta == 'Ofertas' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full mr-1 rounded-lg h-20 mx-3`}
                  onClick={setOfertas}
                >
                  Ofertas de empleo
                </button>
                <button
                  className={`${tipoConsulta == 'Trabajadores' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full ml-1 rounded-lg h-20 mx-3`}
                  onClick={setTrabajadores}
                >
                  Perfiles de profesionales
                </button>
              </div>

            </div>

{/* 
        {tipoConsulta == "Ofertas" && !isOfertasSelected && <TipoOferta setIsOfertasSelected={setIsOfertasSelected} />}
        {tipoConsulta == "Trabajadores" && !isTrabajadoresSelected && <TipoTrabajador setIsTrabajadoresSelected={setIsTrabajadoresSelected} />}
        {!tipoConsulta && <div className="h-full mx-6  bg-white bg-opacity-5  text-zinc-100"></div>
        } */}

      </div>
      {/* } */}
      {/* {isOfertasSelected && <ListadoOfertas />}
      {isTrabajadoresSelected && <ListadoTrabajadores />} */}
      </div>
      {/* {<Perfil/>} gestionar el click i el perfil */}

    </>

  );
};

export default Search;