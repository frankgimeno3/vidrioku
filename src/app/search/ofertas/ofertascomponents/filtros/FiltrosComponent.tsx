
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import FiltrosAplicados from './FiltrosAplicados';
import SeleccionFiltros from './SeleccionFiltros';


interface FiltrosComponentFiltrosProps {
    setArrayFiltros: any;
    arrayFiltros: any
}


const FiltrosComponent: FC<FiltrosComponentFiltrosProps> = ({ setArrayFiltros, arrayFiltros }) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState([])
    useEffect(() => {
        setFiltrosRecibidos(arrayFiltros)
    }, [arrayFiltros])


    return (
        <div className="    ml-2 mr-7 my-3  p-2">
            <p>Añadir filtros</p>

            <SeleccionFiltros setArrayFiltros={setArrayFiltros} arrayFiltros={arrayFiltros} />

            <p className='mt-3'>Filtros Aplicados</p>
            <FiltrosAplicados arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros} />

        </div>
    );
};

export default FiltrosComponent;