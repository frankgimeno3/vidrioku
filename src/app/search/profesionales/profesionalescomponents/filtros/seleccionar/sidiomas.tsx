
import { FC, useState } from 'react';
import Image from 'next/image';

interface SidiomaProps {
    setArrayFiltros: any;
    arrayFiltros:any
}


const Sidioma: FC<SidiomaProps> = ({ setArrayFiltros }) => {
  
 
    return (
        <div className='flex flex-col  '>
            <p>Filtrar según los idiomas que el profesional habla</p>
        </div>
    );
};

export default Sidioma;