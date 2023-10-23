import { FC, useState } from "react";

interface DporposicionProps {
    setIsTrabajadoresSelected: (component: boolean) => void;
}


const Dporposicion: FC<DporposicionProps> = ({ setIsTrabajadoresSelected }) => {
    const [segun, setSegun] = useState("")

    const setDtecnico = () => {
        setSegun("Dtecnico")
    }
    const setAproyectos = () => {
        setSegun("Aproyectos")
    }
    const setOtecnica = () => {
        setSegun("Otecnica")
    }

    const setCtecnica = () => {
        setSegun("Ctecnica")
    }

    const setMcontinua = () => {
        setSegun('Mcontinua')
    }
    const setGral = () => {
        setSegun('Gral')
    }

    const mostrarListado = () => {
        return setIsTrabajadoresSelected(true)
    }
    return (<>
        <h2 className="pt-12">Según qué criterios desea filtrar los perfiles?</h2>
        <div className="px-2 flex flex-row w-full text-xs">
            <div className="flex flex-col flex-1 p-2">
                <button className={`${segun == 'Dtecnico' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setDtecnico}>Director técnico</button>
                <button className={`${segun == 'Aproyectos' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setAproyectos}>Analista de proyectos</button>
                <button className={`${segun == 'Otecnica' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setOtecnica}>Oficina técnica</button>
            </div>

            <div className="flex flex-col flex-1 p-2">

                <button className={`${segun == 'Ctecnica' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setCtecnica}>Consultoría técnica</button>
                <button className={`${segun == 'Mcontinua' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setMcontinua}>Mejora contínua</button>
                <button className={`${segun == 'Gral' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setGral}>Ingeniería técnica</button>
            </div>
        </div>
        {segun && segun != "Posicion" && <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10 text-xs "
            onClick={mostrarListado}
        > Obtener listado de perfiles</button>}
    </>
    );
};

export default Dporposicion;