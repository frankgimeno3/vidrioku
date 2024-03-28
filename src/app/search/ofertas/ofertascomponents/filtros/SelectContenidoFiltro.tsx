
import { FC, useState } from 'react';
import Image from 'next/image';
import Sdepartamento from './seleccionar/sdepartamento';
import Sposicion from './seleccionar/sposicion';
import Subicacion from './seleccionar/spais';
import Sidioma from './seleccionar/sidiomas';
import Spermiso from './seleccionar/spermiso';
import SJornada from './seleccionar/sJornada';
import SActividadEmpresa from './seleccionar/sActividadEmpresa';

interface SelectContenidoFiltroProps {
    isDepartamentosSelected: any;
    isPosicionesSelected: any;
    isPaisSelected: any;
    // isIdiomasSelected: any;
    isPermisoSelected: any;
    arrayFiltros:any;
    setArrayFiltros: any;
    isActividadEmpresaSelected:any
isJornadaSelected:any
}


const SelectContenidoFiltro: FC<SelectContenidoFiltroProps> = ({ isDepartamentosSelected, isPosicionesSelected, isPaisSelected, 
    // isIdiomasSelected, 
    isPermisoSelected, arrayFiltros, setArrayFiltros, isActividadEmpresaSelected, isJornadaSelected }) => {


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
            {isPaisSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Subicacion arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
            {/* {isIdiomasSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Sidioma arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            } */}
            {isPermisoSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <Spermiso arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
             {isActividadEmpresaSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <SActividadEmpresa arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
             {isJornadaSelected == true &&
                <div className='flex flex-col bg-white rounded p-2 px-5'>
                    <SJornada arrayFiltros={arrayFiltros} setArrayFiltros={setArrayFiltros}/>
                </div>
            }
        </>
    );
};

export default SelectContenidoFiltro;