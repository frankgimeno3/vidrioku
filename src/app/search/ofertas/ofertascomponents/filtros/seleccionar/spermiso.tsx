
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface SpermisoProps {
    setArrayFiltros: any;
    arrayFiltros:any
}


const Spermiso: FC<SpermisoProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);


    const [isChecked, setChecked] = useState(false);
    const [permiso, setPermiso] = useState(false)

    useEffect(() => {
        setChecked(permiso || false);
    }, [permiso]);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setChecked(newChecked);
        setPermiso(newChecked);
    };


    const handleIsPermisoRequerido = () => {
        if (!arrayRecibido.includes("No requiere carnet de conducir")) {
            setArrayRecibido(prevArray => [...prevArray, "No requiere carnet de conducir"]);
        }
        setArrayFiltros(arrayRecibido)
    };
    
    useEffect(() => {
        if (permiso==true) {handleIsPermisoRequerido()}
    }, [permiso]);

    return (
        <div className='flex flex-row justify-left items-center '>
            <p>Mostrar únicamente ofertas que NO requieran permiso de conducción</p>
            <label htmlFor="togglePermiso" className="flex justify-left  text-left text-sm items-center cursor-pointer ml-12 my-3">
                <span className="ml-2">Mostrar todas las ofertas</span>
                <input
                    type="checkbox"
                    id="togglePermiso"
                    className="hidden  border border-"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <div className={`mx-4 relative w-10 h-5 rounded-full transition-all duration-300 border border- ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <div className={`absolute left-0 w-5 h-5 bg-white rounded-full transform border border- ${isChecked ? 'translate-x-full' : 'translate-x-0'} transition-all duration-300`}></div>
                </div>
                <span className="ml-2">Mostrar ofertas que no requieran permiso de conducción</span>
            </label>
        </div>
    );
};

export default Spermiso;