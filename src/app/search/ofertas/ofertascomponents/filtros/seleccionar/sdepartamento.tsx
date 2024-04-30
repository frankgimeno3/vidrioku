import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Asegúrate de importar el tipo RootState desde tu archivo store
import { addFiltro } from '@/redux/features/arrayFiltros'; // Importa la acción para agregar un filtro

interface SdepartamentoProps {
    // No necesitas setArrayFiltros y arrayFiltros aquí
}

const Sdepartamento: FC<SdepartamentoProps> = () => {
    const dispatch = useDispatch();
    const arrayFiltros = useSelector((state: RootState) => state.arrayFiltros.filtros);

    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);

    const handleSeleccionDepartamento = (departamento: string) => {
        if (!arrayRecibido.includes(departamento)) {
            const newArray = [...arrayRecibido, departamento];
            setArrayRecibido(newArray);
            dispatch(addFiltro(departamento)); // Utiliza la acción addFiltro para agregar un filtro
        }
    };

    return (
        <div className='flex flex-col my-3 '>
            <p className='mb-3'>Filtrar según el departamento para el que profesional ha trabajado o estudiado</p>
            <div className='flex flex-row'>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Departamento comercial')}
                >Departamento comercial</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Departamentos de compras o aprovisionamiento')}
                >Departamentos de compras o aprovisionamiento</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Departamento técnico o de ingeniería')}
                >Departamento técnico o de ingeniería</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Operario en fabricación o instalación en el sector del vidrio')}
                >Operario en fabricación o instalación en el sector del vidrio</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Técnico de mantenimiento y/o prevención')}
                >Técnico de mantenimiento y/o prevención</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Técnico de calidad')}
                >Técnico de calidad</button>
                <button className='text-sm  bg-white flex-1 px-5  mx-1 rounded shadow py-2'
                    onClick={() => handleSeleccionDepartamento('Departamentos - Profesional de la logística')}
                >Profesional de la logística</button>
            </div>
        </div>
    );
};

export default Sdepartamento;
