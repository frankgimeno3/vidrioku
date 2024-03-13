
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Sdepartamento from './seleccionar/sdepartamento';
import Sposicion from './seleccionar/sposicion';
import Subicacion from './seleccionar/spais';
import Sidioma from './seleccionar/sidiomas';
import Spermiso from './seleccionar/spermiso';

interface SelectContenidoFiltroProps {
    isDepartamentosSelected: any;
    isPosicionesSelected: any;
    isPaisSelected: any;
    // isIdiomasSelected: any;
    isPermisoSelected: any;
    arrayFiltros:any;
    setArrayFiltros: any;
}


const SelectContenidoFiltro: FC<SelectContenidoFiltroProps> = ({ isDepartamentosSelected, isPosicionesSelected, isPaisSelected,
    //  isIdiomasSelected, 
     isPermisoSelected, arrayFiltros, setArrayFiltros }) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState<any[]>([]);

    useEffect(() => {
        setFiltrosRecibidos(arrayFiltros);
     }, [arrayFiltros]);

    return (
        <>
            {isDepartamentosSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sdepartamento arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {isPosicionesSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sposicion arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {isPaisSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Subicacion arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {/* {isIdiomasSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sidioma arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros}/>
                </div>
            } */}
            {isPermisoSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Spermiso arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
        </>
    );
};

export default SelectContenidoFiltro;