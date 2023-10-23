import { FC } from "react";


const Ingenieros: FC = () => {


    return (<>
         <h2 className="pt-12">Para qué departamento está buscando operarios?</h2>
        <div className="px-2 flex flex-row w-full">
            <div className="flex flex-col flex-1 p-2">
                <h2>Por cargo</h2>
                <button className="bg-zinc-100 text-zinc-700 shadow-lg p-2 text-xs h-16 my-2">Transporte, almacén, logística interna, instalación y expediciones</button>
                <button className="bg-zinc-100 text-zinc-700 shadow-lg p-2 text-xs h-16 my-2">Operarios de producción</button>
                <button className="bg-zinc-100 text-zinc-700 shadow-lg p-2 text-xs h-16 my-2">Técnicos en Control de calidad</button>
                <button className="bg-zinc-100 text-zinc-700 shadow-lg p-2 text-xs h-16 my-2">Mantenimiento, prevención, reparación</button>
                <button className="bg-zinc-100 text-zinc-700 shadow-lg p-2 text-xs h-16 my-2">Otros</button>
                <button className="bg-zinc-100 text-zinc-700 shadow-lg p-2 text-xs h-16 my-2">Qualquiera</button>
            </div>
            
        </div>
    </>
    );
};

export default Ingenieros;