import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addFiltro } from '@/redux/features/arrayFiltros'; 

interface SpermisoProps {}

const Spermiso: FC<SpermisoProps> = () => {
    const dispatch = useDispatch();
    const arrayRecibido = useSelector((state: RootState) => state.arrayFiltros.filtros);

    const [isChecked, setChecked] = useState(false);
    const [permiso, setPermiso] = useState(false);

    useEffect(() => {
        setChecked(permiso || false);
    }, [permiso]);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setChecked(newChecked);
        setPermiso(newChecked);
    };

    const handleIsPermisoRequerido = () => {
        if (!arrayRecibido.includes("Carnet de conducir - Requerido")) {
            dispatch(addFiltro("Carnet de conducir - Requerido")); 
        }
    };
    
    const handleQuitarPermisoRequerido = () => {
        if (arrayRecibido.includes("Carnet de conducir - Requerido")) {
            const newArray = arrayRecibido.filter(item => item !== "Carnet de conducir - Requerido");
            // Aquí normalmente deberías tener una acción para eliminar el filtro, pero parece que no lo tienes implementado en tu slice
            // dispatch(removeFiltro("Carnet de conducir - Requerido")); // Usa la acción removeFiltro para eliminar el filtro
        }
    };

    useEffect(() => {
        if (permiso) {
            handleIsPermisoRequerido();
        } else {
            handleQuitarPermisoRequerido();
        }
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
