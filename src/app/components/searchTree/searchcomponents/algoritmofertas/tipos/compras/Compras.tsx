import { FC, useState } from "react";

interface ComprasProps {
    setIsOfertasSelected: (component: boolean) => void;
}

const Compras: FC<ComprasProps> = ({ setIsOfertasSelected }) => {

    const mostrarListado = () => {
        return setIsOfertasSelected(true)
    }
    return (
        <div className="flex flex-col px-2 text-xs mt-6  ">
            <div className="flex flex-col px-2 py-5 bg-white bg-opacity-5 rounded-lg">
                <h2 className="text-lg pb-3 text-white text-center">Resumen selección</h2>
                <h3 className="px-5 py-2 text-sm">Perfil seleccionado:  Compras </h3>
                <h3 className="px-5 font-bold py-2 text-sm">Perfiles recomendados:</h3>
                <ul className="px-5   pt-2">
                    <li  >Administración y Dirección de empresas</li>
                    <li className="py-1 ">Empresariales</li>
                    <li className="py-1 ">Formación específica en exportación, importación, aduanas y transporte</li>
                    <li className="py-1 ">Comercio</li>
                    <li className="py-1 ">Relaciones internacionales</li>
                </ul>
                 <div className="flex flex-col px-4 text-xs">
                    <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10  "
                        onClick={mostrarListado}
                    > Obtener listado de perfiles</button>

                </div>
            </div>
        </div>
    );
};

export default Compras