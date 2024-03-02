
import { FC, useState } from 'react';
import Image from 'next/image';

interface SeleccionFiltrosProps {
    setArrayFiltros: any
    }

    
const SeleccionFiltros: FC <SeleccionFiltrosProps> = ({ setArrayFiltros }) => {


    return (

        <div className="flex flex-row bg-white my-1 rounded p-2">
            <div className='flex flex-row'>
                <p>Departamentos</p>
            </div>
            <div className='flex flex-row'>
                <p>Posiciones</p>
            </div>
            <div className='flex flex-row'>
                <p>Ubicación actual</p>
            </div>
            <div className='flex flex-row'>
                <p>Idiomas</p>
            </div>
            <div className='flex flex-row'>
                <p>Permiso de conducción</p>
            </div>
        </div>
    );
};

export default SeleccionFiltros;