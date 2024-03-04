
import { FC, useState } from 'react';
import Image from 'next/image';

interface SubicacionProps {
    setArrayFiltros: any;
    arrayFiltros:any
}


const Subicacion: FC<SubicacionProps> = ({ setArrayFiltros }) => {
  
 
    return (
        <div className='flex flex-col  '>
            <p>Filtrar según la ubicación actual del candidato</p>
        </div>
    );
};

export default Subicacion;