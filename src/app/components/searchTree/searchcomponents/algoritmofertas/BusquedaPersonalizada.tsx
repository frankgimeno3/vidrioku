import React, { FC, useState } from 'react';
import Compras from './tipos/compras/Compras'
import Comercial from './tipos/comercial/Comercial'
import Dtecnico from './tipos/dtecnico/dtecnico'
import Ingenieros from './tipos/ingenieros/ingenieros'
import Operarios from './tipos/operarios/departamentos/Operarios'
import Otros from './tipos/Otros'


interface BusquedaPersonalizadaProps {
    setIsOfertasSelected: any
}

const BusquedaPersonalizada: FC<BusquedaPersonalizadaProps> = ({ setIsOfertasSelected }) => {
    const [BusquedaPersonalizada, setBusquedaPersonalizada] = useState('');

    const setCompras = () => {
        setBusquedaPersonalizada('Compras');
    }
    const setComercial = () => {
        setBusquedaPersonalizada('Comercial')
    }
    const setDtecnico = () => {
        setBusquedaPersonalizada('Dtecnico')
    }
    const setIngenieros = () => {
        setBusquedaPersonalizada('Ingenieros')
    }
    const setOperarios = () => {
        setBusquedaPersonalizada('Operarios')
    }
    const setOtros = () => {
        setBusquedaPersonalizada('Otros')
    }

    return (
        <div className="     h-full text-zinc-100 px-5 pb-5">

            <h2 className="text-center pt-5">Qué tipo de perfil necesita?</h2>
            <div className="px-2 flex flex-row w-full text-xs">
                <div className="flex flex-col flex-1 px-1 ">
                    <button className={`${BusquedaPersonalizada == 'Compras' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setCompras}>Departamento de compras</button>
                    <button className={`${BusquedaPersonalizada == 'Comercial' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setComercial}>Departamento comercial</button>
                    <button className={`${BusquedaPersonalizada == 'Dtecnico' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setDtecnico}>Departamento técnico</button>
                </div>
                <div className="flex flex-col flex-1 px-1">
                    <button className={`${BusquedaPersonalizada == 'Ingenieros' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setIngenieros}>Ingenieros</button>
                    <button className={`${BusquedaPersonalizada == 'Operarios' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setOperarios}>Operarios</button>
                    <button className={`${BusquedaPersonalizada == 'Otros' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setOtros}>Otros</button>
                </div>
            </div>
            {BusquedaPersonalizada == "Compras" && <Compras setIsOfertasSelected={setIsOfertasSelected} />}
            {BusquedaPersonalizada == "Comercial" && <Comercial setIsOfertasSelected={setIsOfertasSelected}  />}
            {BusquedaPersonalizada == "Dtecnico" && <Dtecnico setIsOfertasSelected={setIsOfertasSelected} />}
            {BusquedaPersonalizada == "Ingenieros" && <Ingenieros setIsOfertasSelected={setIsOfertasSelected}/>}
            {BusquedaPersonalizada == "Operarios" && <Operarios setIsOfertasSelected={setIsOfertasSelected} />}
            {BusquedaPersonalizada == "Otros" && <Otros setIsOfertasSelected={setIsOfertasSelected} />}
        </div>
    );
};

export default BusquedaPersonalizada;