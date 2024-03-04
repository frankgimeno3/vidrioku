
import { FC, useState } from 'react';
import Image from 'next/image';
import SelectContenidoFiltro from './SelectContenidoFiltro';

interface SeleccionFiltrosProps {
    arrayFiltros:any;
    setArrayFiltros: any;
}


const SeleccionFiltros: FC<SeleccionFiltrosProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [isDepartamentosSelected, setIsDepartamentosSelected] = useState(false)
    const [isPosicionesSelected, setIsPosicionesSelected] = useState(false)
    const [isUbicacionSelected, setIsUbicacionSelected] = useState(false)
    const [isIdiomasSelected, setIsIdiomasSelected] = useState(false)
    const [isPermisoSelected, setIsPermisoSelected] = useState(false)

    const toggleAnadirFiltro = (estado: any, setter: any) => {
        if (estado == false) {
            setIsDepartamentosSelected(false)
            setIsPosicionesSelected(false)
            setIsUbicacionSelected(false)
            setIsIdiomasSelected(false)
            setIsPermisoSelected(false)
            setter(true)
        }
        if (estado == true) { setter(false) }
    }

    return (
        <div className='flex flex-col'>
            <div className="flex flex-row my-1">
                {isDepartamentosSelected == false &&
                    <div className='flex flex-row  bg-white rounded  px-2 mr-2 items-center text-sm py-1' onClick={() => { toggleAnadirFiltro(isDepartamentosSelected, setIsDepartamentosSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                        </svg>
                        <p>Departamentos</p>
                    </div>}
                {isDepartamentosSelected == true &&
                    <div className='flex flex-row  bg-gray-100 rounded  px-2 mr-2 items-center text-sm py-1 text-gray-600 border border-gray-300 shadow' onClick={() => { toggleAnadirFiltro(isDepartamentosSelected, setIsDepartamentosSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' >
                            <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                        </svg>
                        <p>Departamentos</p>
                    </div>}

                {isPosicionesSelected == false &&
                    <div className='flex flex-row  bg-white rounded  px-2 mr-2 items-center text-sm py-1' onClick={() => { toggleAnadirFiltro(isPosicionesSelected, setIsPosicionesSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                        </svg>
                        <p>Posiciones</p>
                    </div>}
                {isPosicionesSelected == true &&
                    <div className='flex flex-row  bg-gray-100 rounded  px-2 mr-2 items-center text-sm py-1 text-gray-600 border border-gray-300 shadow' onClick={() => { toggleAnadirFiltro(isPosicionesSelected, setIsPosicionesSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' >
                            <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                        </svg>
                        <p>Posiciones</p>
                    </div>}

                {isUbicacionSelected == false &&
                    <div className='flex flex-row  bg-white rounded  px-2 mr-2 items-center text-sm py-1' onClick={() => { toggleAnadirFiltro(isUbicacionSelected, setIsUbicacionSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                        </svg>
                        <p>Ubicación actual</p>
                    </div>}
                {isUbicacionSelected == true &&
                    <div className='flex flex-row  bg-gray-100 rounded  px-2 mr-2 items-center text-sm py-1 text-gray-600 border border-gray-300 shadow' onClick={() => { toggleAnadirFiltro(isUbicacionSelected, setIsUbicacionSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' >
                            <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                        </svg>
                        <p>Ubicación actual</p>
                    </div>}

                {isIdiomasSelected == false &&
                    <div className='flex flex-row  bg-white rounded  px-2 mr-2 items-center text-sm py-1' onClick={() => { toggleAnadirFiltro(isIdiomasSelected, setIsIdiomasSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                        </svg>
                        <p>Idiomas</p>
                    </div>}
                {isIdiomasSelected == true &&
                    <div className='flex flex-row  bg-gray-100 rounded  px-2 mr-2 items-center text-sm py-1 text-gray-600 border border-gray-300 shadow' onClick={() => { toggleAnadirFiltro(isIdiomasSelected, setIsIdiomasSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' >
                            <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                        </svg>
                        <p>Idiomas</p>
                    </div>}

                {isPermisoSelected == false &&
                    <div className='flex flex-row  bg-white rounded  px-2 mr-2 items-center text-sm py-1' onClick={() => { toggleAnadirFiltro(isPermisoSelected, setIsPermisoSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                        </svg>
                        <p>Permiso de conducción</p>
                    </div>}
                {isPermisoSelected == true &&
                    <div className='flex flex-row  bg-gray-100 rounded  px-2 mr-2 items-center text-sm py-1 text-gray-600 border border-gray-300 shadow' onClick={() => { toggleAnadirFiltro(isPermisoSelected, setIsPermisoSelected) }}>
                        <svg className='w-4 h-4  mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' >
                            <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                        </svg>
                        <p>Permiso de conducción</p>
                    </div>}
            </div>
            <SelectContenidoFiltro 
                isDepartamentosSelected={isDepartamentosSelected}
                isPosicionesSelected={isPosicionesSelected} isUbicacionSelected={isUbicacionSelected}
                isIdiomasSelected={isIdiomasSelected} isPermisoSelected={isPermisoSelected} 
                arrayFiltros={arrayFiltros}
                setArrayFiltros={setArrayFiltros}/>
        </div>
    );
};

export default SeleccionFiltros;