
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface FiltrosAplicadosProps {
arrayFiltros: any
}

const FiltrosAplicados: FC <FiltrosAplicadosProps> = ({arrayFiltros}) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState([])
    useEffect(()=>{
        setFiltrosRecibidos(arrayFiltros)
    },[arrayFiltros])

    return (
        <div className="flex flex-row">
        {filtrosRecibidos.map((filtro, index) => (
            <div key={index} className="flex flex-row items-center">
                <p>{filtro}</p>
                <svg className="w-4 h-4 text-gray-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.707 5.293a1 1 0 011.414 0L10 8.586l3.879-3.88a1 1 0 111.414 1.414L11.414 10l3.88 3.879a1 1 0 11-1.414 1.414L10 11.414l-3.879 3.88a1 1 0 01-1.414-1.414L8.586 10 4.707 6.121a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        ))}
    </div>
    );
};

export default FiltrosAplicados;