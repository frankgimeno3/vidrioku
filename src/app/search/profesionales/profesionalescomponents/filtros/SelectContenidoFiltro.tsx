
import { FC, useState } from 'react';
import Image from 'next/image';
import Sdepartamento from './seleccionar/sdepartamento';
import Sposicion from './seleccionar/sposicion';
import Subicacion from './seleccionar/subicacion';
import Sidioma from './seleccionar/sidiomas';
import Spermiso from './seleccionar/spermiso';

interface SelectContenidoFiltroProps {
    isDepartamentosSelected: any;
    isPosicionesSelected: any;
    isUbicacionSelected: any;
    isIdiomasSelected: any;
    isPermisoSelected: any;
    arrayFiltros:any;
    setArrayFiltros: any;
}


const SelectContenidoFiltro: FC<SelectContenidoFiltroProps> = ({ isDepartamentosSelected, isPosicionesSelected, isUbicacionSelected, isIdiomasSelected, isPermisoSelected, arrayFiltros, setArrayFiltros }) => {


    return (
        <>
            {isDepartamentosSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sdepartamento arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {isPosicionesSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sposicion arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {isUbicacionSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Subicacion arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {isIdiomasSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sidioma arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {isPermisoSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Spermiso arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
        </>
    );
};

export default SelectContenidoFiltro;