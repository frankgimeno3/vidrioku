import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Asegúrate de importar el tipo RootState desde tu archivo store
import { addFiltro, removeFiltro } from '@/redux/features/arrayFiltros'; // Importa las acciones para agregar y quitar un filtro

interface SpermisoProps {
    // No necesitas setArrayFiltros y arrayFiltros aquí
}

const Spermiso: FC<SpermisoProps> = () => {
    const dispatch = useDispatch();
    const arrayFiltros = useSelector((state: RootState) => state.arrayFiltros.filtros);

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
        const permisoElement = "Carnet de conducir - Requerido";
        if (!arrayRecibido.includes(permisoElement)) {
            const newArray = [...arrayRecibido, permisoElement];
            setArrayRecibido(newArray);
            dispatch(addFiltro(permisoElement)); // Utiliza la acción addFiltro para agregar un filtro
        }
    };
    
    const handleQuitarPermisoRequerido = () => {
        const permisoElement = "Carnet de conducir - Requerido";
        if (arrayRecibido.includes(permisoElement)) {
            const newArray = arrayRecibido.filter(item => item !== permisoElement);
            setArrayRecibido(newArray);
            dispatch(removeFiltro(permisoElement)); // Utiliza la acción removeFiltro para quitar un filtro
        }
    };
    useEffect(() => {
        if (permiso == true) { handleIsPermisoRequerido() }
        if (permiso == false) { handleQuitarPermisoRequerido() }
    }, [permiso]);

    return (
        <div className='flex flex-row justify-left items-center '>
            <p>Mostrar únicamente profesionales con permiso de conducción?</p>
            <label htmlFor="togglePermiso" className="flex justify-left  text-left text-sm items-center cursor-pointer ml-12 my-3">
                <span className="ml-2">No</span>
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
                <span className="ml-2">Sí</span>
            </label>
        </div>
    );
};

export default Spermiso;
