import React, { FC, useState } from 'react';
import Compras from './tipos/compras/Compras'
import Comercial from './tipos/comercial/Comercial'
import Dtecnico from './tipos/dtecnico/dtecnico'
import Ingenieros from './tipos/ingenieros/ingenieros'
import Operarios from './tipos/operarios/departamentos/Operarios'
import Otros from './tipos/Otros'


interface TipoTrabajadorProps {
    setIsTrabajadoresSelected: (component: boolean) => void;
}

const TipoTrabajador: FC<TipoTrabajadorProps> = ({ setIsTrabajadoresSelected }) => {
    const [tipoTrabajador, setTipoTrabajador] = useState('');

    const setCompras = () => {
        setTipoTrabajador('Compras');
    }
    const setComercial = () => {
        setTipoTrabajador('Comercial')
    }
    const setDtecnico = () => {
        setTipoTrabajador('Dtecnico')
    }
    const setIngenieros = () => {
        setTipoTrabajador('Ingenieros')
    }
    const setOperarios = () => {
        setTipoTrabajador('Operarios')
    }
    const setOtros = () => {
        setTipoTrabajador('Otros')
    }

    return (
        <div className="     h-full text-zinc-100 px-5 pb-5">

            <h2 className="text-center pt-5">Qué tipo de perfil necesita?</h2>
            <div className="px-2 flex flex-row w-full text-xs">
                <div className="flex flex-col flex-1 px-1 ">
                    <button className={`${tipoTrabajador == 'Compras' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setCompras}>Departamento de compras</button>
                    <button className={`${tipoTrabajador == 'Comercial' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setComercial}>Departamento comercial</button>
                    <button className={`${tipoTrabajador == 'Dtecnico' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setDtecnico}>Departamento técnico</button>
                </div>
                <div className="flex flex-col flex-1 px-1">
                    <button className={`${tipoTrabajador == 'Ingenieros' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setIngenieros}>Ingenieros</button>
                    <button className={`${tipoTrabajador == 'Operarios' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setOperarios}>Operarios</button>
                    <button className={`${tipoTrabajador == 'Otros' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setOtros}>Otros</button>
                </div>
            </div>
            {tipoTrabajador == "Compras" && <Compras setIsTrabajadoresSelected={setIsTrabajadoresSelected} />}
            {tipoTrabajador == "Comercial" && <Comercial setIsTrabajadoresSelected={setIsTrabajadoresSelected}  />}
            {tipoTrabajador == "Dtecnico" && <Dtecnico setIsTrabajadoresSelected={setIsTrabajadoresSelected} />}
            {tipoTrabajador == "Ingenieros" && <Ingenieros setIsTrabajadoresSelected={setIsTrabajadoresSelected}/>}
            {tipoTrabajador == "Operarios" && <Operarios />}
            {tipoTrabajador == "Otros" && <Otros setIsTrabajadoresSelected={setIsTrabajadoresSelected} />}
        </div>
    );
};

export default TipoTrabajador;