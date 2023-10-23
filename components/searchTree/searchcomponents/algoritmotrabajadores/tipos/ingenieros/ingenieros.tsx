import { FC, useState } from "react";
import Iporeducacion from './iporeducacion'

interface IngenierosProps {
    setIsTrabajadoresSelected: (component: boolean) => void;
}
const Ingenieros: FC <IngenierosProps>= ({setIsTrabajadoresSelected}) => {
    const [segun, setSegun] = useState("")
   
   
    const mostrarListado = () => {
        return setIsTrabajadoresSelected(true)
    }


    const setPrevencion = () => {
        setSegun('Prevencion')
    }
    const setPlanProd = () => {
        setSegun('PlanProd')
    }
    const setCalidad = () => {
        setSegun('Calidad')
    }
    const setAnalisisProy = () => {
        setSegun('AnalisisProy')
    }
    const setIngTec = () => {
        setSegun('IngTec')
    }
    const setDirOp = () => {
        setSegun('DirOp')
    }
    const setDirLog = () => {
        setSegun('DirLog')
    }
    const setEducacion = () => {
        setSegun('Educacion')
    }


    return (<>
        <h2 className="pt-12 text-center">Para qué departamento está buscando ingenieros?</h2>
        <div className="px-2 flex flex-row w-full text-xs">
            <div className="flex flex-col flex-1 p-2">
                <button className={`${segun == 'Prevencion' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setPrevencion}> Prevención y medio ambiente</button>
                <button className={`${segun == 'Calidad' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setCalidad}> Planificación de la producción</button>
                <button className={`${segun == 'PlanProd' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setPlanProd}> Control de calidad</button>
                <button className={`${segun == 'AnalisisProy' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setAnalisisProy}> Proyectos, documentación y análisis</button>
            </div>
            <div className="flex flex-col flex-1 p-2">
                <button className={`${segun == 'IngTec' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setIngTec}> Ingenieros técnicos</button>
                <button className={`${segun == 'DirOp' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setDirOp}> Dirección de operaciones</button>
                <button className={`${segun == 'DirLog' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setDirLog}> Dirección Logística</button>
                <button className={`${segun == 'Educacion' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setEducacion}> Filtrar por formación específica</button>
            </div>
        </div>
        {segun == "Educacion" && <Iporeducacion setIsTrabajadoresSelected={setIsTrabajadoresSelected} />}
        {segun != "Educacion" && segun != ""  && <div className="flex flex-col px-4 text-xs">
                    <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10  "
                        onClick={mostrarListado}
                    > Obtener listado de perfiles</button>

                </div>}
    </>
    );
};

export default Ingenieros;