
import { FC, useState } from 'react';
import Image from 'next/image';
import FiltrosAplicados from './FiltrosAplicados';
import SeleccionFiltros from './SeleccionFiltros';


const FiltrosComponent: FC = ({ }) => {

    const [arrayFiltros, setArrayFiltros] = useState(['a', 'b', 'c'])

    return (
        <div className="    ml-2 mr-7 my-3  p-2">
            <p>Añadir filtro</p>

            <SeleccionFiltros setArrayFiltros={setArrayFiltros}/>

            <FiltrosAplicados arrayFiltros={arrayFiltros} />

        </div>
    );
};

export default FiltrosComponent;