import { FC, useState } from "react";

interface OtrosProps {
    setIsOfertasSelected: (component: boolean) => void;
}
const Otros: FC<OtrosProps> = ({ setIsOfertasSelected }) => {
    const [segun, setSegun] = useState("")

    const setAdministracion = () => {
        return setSegun("Administracion")
    }
    const setMarketing = () => {
        return setSegun("Marketing")
    }
    const setFinanzas = () => {
        return setSegun("Finanzas")
    }
    const setOtros = () => {
        return setSegun("Otros")
    }

    const mostrarListado = () => {
        return setIsOfertasSelected(true)
    }

    return (<>
        <h2 className="pt-12 text-center px-5 text-sm">Encuentre otros perfiles con experiencia en el sector del vidrio</h2>
        <div className="flex flex-row mx-auto text-xs  ">
            <div className="flex flex-col flex-1 p-2">
                <button className={`${segun == 'Administracion' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setAdministracion}> Administración</button>
                <button className={`${segun == 'Marketing' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setMarketing}> Márketing</button>

            </div>
            <div className="flex flex-col flex-1 p-2">
                <button className={`${segun == 'Finanzas' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setFinanzas}> Finanzas</button>
                <button className={`${segun == 'Otros' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                    } p-2 w-full my-1 rounded-lg h-20`}
                    onClick={setOtros}> Otros</button>
            </div>
        </div>
        {segun &&
            <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-12 text-xs  "
                onClick={mostrarListado}
            > Obtener listado de perfiles </button>
        }
    </>
    );
};

export default Otros;