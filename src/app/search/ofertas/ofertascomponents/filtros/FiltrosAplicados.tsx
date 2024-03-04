import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface FiltrosAplicadosProps {
    arrayFiltros: any
    setArrayFiltros: any;
}

const FiltrosAplicados: FC<FiltrosAplicadosProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState([])

    useEffect(() => {
        setFiltrosRecibidos(arrayFiltros)
    }, [arrayFiltros])

    const eliminarFiltro = (filtro: never) => {
        setArrayFiltros((prevArray: any[]) => prevArray.filter(item => item !== filtro));
    }

    return (
        <div className="flex flex-wrap">
            {filtrosRecibidos.map((filtro, index) => (
                <div key={index} className="flex flex-row bg-white mr-2 px-2 py-1 rounded shadow mt-1  items-center">
                    <p>{filtro}</p>
                    <svg className="w-4 h-4 text-gray-500 ml-2" viewBox="0 0 20 20" fill="currentColor" onClick={() => eliminarFiltro(filtro)}>
                        <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.707 5.293a1 1 0 011.414 0L10 8.586l3.879-3.88a1 1 0 111.414 1.414L11.414 10l3.88 3.879a1 1 0 11-1.414 1.414L10 11.414l-3.879 3.88a1 1 0 01-1.414-1.414L8.586 10 4.707 6.121a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            ))}
            {filtrosRecibidos.length == 0 &&                
             <div  className="flex flex-wrap bg-white mr-2 px-2 rounded shadow mt-1  items-center">
                <p className='p-2'>No se ha aplicado ningún filtro</p>
            </div>}

        </div>
    );
};

export default FiltrosAplicados;
