import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comercial from './seleccionarPosicion/comercial';
import Compras from './seleccionarPosicion/compras';
import Dtecnico from './seleccionarPosicion/dtecnico';
import Calidad from './seleccionarPosicion/calidad';
import Mantenimiento from './seleccionarPosicion/mantenimiento';
import Operario from './seleccionarPosicion/operario';
import Logistica from './seleccionarPosicion/logistica';

interface SposicionProps {
    arrayFiltros: any;
    setArrayFiltros: React.Dispatch<React.SetStateAction<any[]>>;
}

const Sposicion: FC<SposicionProps> = ({ arrayFiltros, setArrayFiltros }) => {
     const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
    const [posicionSeleccionada, setPosicionSeleccionada] = useState('');
  

    const selectDepartamento = (departamento: string) => {
        setDepartamentoSeleccionado(departamento);
    };

    useEffect(() => {
        handleAddPosicion(posicionSeleccionada);
    }, [posicionSeleccionada]);

    const handleAddPosicion = (posicion: string) => {
        if (!arrayFiltros.includes(posicion) && posicion != '') {
            const newArray = [...arrayFiltros, `Posicion - ${posicion}`];
            setArrayFiltros(newArray);
        }
    };


    return (
        <div className='flex flex-col'>
            <p className='my-3'>Filtrar según el departamento para el que profesional ha trabajado o estudiado</p>
            <div className='flex flex-row text-left my-1'>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('comercial')}>
                    Departamento Comercial
                </button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('compras')}>
                    Departamentos de compras o aprovisionamiento
                </button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('dtecnico')}>
                    Departamento técnico o de ingeniería
                </button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('operario')}>
                    Operario en fabricación o instalación en el sector del vidrio
                </button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('mantenimiento')}>
                    Técnico de mantenimiento y/o prevención
                </button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('calidad')}>
                    Técnico de calidad
                </button>
                <button className='text-sm bg-white flex-1 px-5 mx-1 rounded shadow py-2'
                    onClick={() => selectDepartamento('logistica')}>
                    Profesional de la logística
                </button>
            </div>
            <div className='my-3'>
                {departamentoSeleccionado === 'comercial' && <Comercial posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
                {departamentoSeleccionado === 'compras' && <Compras posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
                {departamentoSeleccionado === 'dtecnico' && <Dtecnico posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
                {departamentoSeleccionado === 'operario' && <Operario posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
                {departamentoSeleccionado === 'mantenimiento' && <Mantenimiento posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
                {departamentoSeleccionado === 'calidad' && <Calidad posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
                {departamentoSeleccionado === 'logistica' && <Logistica posicionSeleccionada={posicionSeleccionada} setPosicionSeleccionada={setPosicionSeleccionada} />}
            </div>
        </div>
    );
};

export default Sposicion;
