import { FC, useState } from "react";

interface ComercialProps {
    setIsOfertasSelected: (component: boolean) => void;
}
const Comercial: FC<ComercialProps> = ({ setIsOfertasSelected }) => {
    const [segun, setSegun] = useState("")
    const [mostrarOpciones, setMostrarOpciones] = useState(false)

    const mostrarListado = () => {
        return setIsOfertasSelected(true)
    }

    const opcionesComerciales = () => {
        switch (mostrarOpciones) {
          case true:
            setMostrarOpciones(false);
            break;
          case false:
            setMostrarOpciones(true);
            break;
        }
      }

    const setAreaManager = () => {
        return setSegun("AreaManager")
    }
    const setTecnico = () => {
        return setSegun("Tecnico")
    }
    const setProyectos = () => {
        return setSegun("Proyectos")
    }
    const setCuentas = () => {
        return setSegun("Cuentas")
    }


    return (
        <div className="flex flex-col px-2 text-xs mt-6  ">
            <div className="flex flex-col px-2 py-5 bg-white bg-opacity-5 rounded-lg">
                <h2 className="text-lg pb-3 text-white text-center">Resumen selección</h2>
                <h3 className="px-5 py-2 text-sm">Perfil seleccionado:  Comercial </h3>
                <div className="flex flex-col px-4 text-xs mx">
                    <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-12  "
                        onClick={mostrarListado}
                    > Obtener listado de perfiles comerciales</button>
                    <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10  "
                        onClick={opcionesComerciales}> Filtrar por perfil específico</button>
                </div>
                    {mostrarOpciones && <>
                        <div className="flex flex-row mx-auto">
                            <div className="flex flex-col flex-1 p-2">
                                <button className={`${segun == 'AreaManager' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                                    } p-2 w-full my-1 rounded-lg h-20`}
                                    onClick={setAreaManager}> Ventas internacionales y exportación</button>
                                <button className={`${segun == 'Tecnico' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                                    } p-2 w-full my-1 rounded-lg h-20`}
                                    onClick={setTecnico}> Comercial técnico </button>

                            </div>
                            <div className="flex flex-col flex-1 p-2">
                                <button className={`${segun == 'Proyectos' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                                    } p-2 w-full my-1 rounded-lg h-20`}
                                    onClick={setProyectos}> Coordinador de proyectos</button>
                                <button className={`${segun == 'Cuentas' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                                    } p-2 w-full my-1 rounded-lg h-20`}
                                    onClick={setCuentas}> Gestor de cuentas</button>
                            </div>
                        </div>
                        {segun && <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10  "
                        onClick={mostrarListado}
                    > Obtener listado Filtrado</button>}
                    </>
                    }
            </div>
        </div>
    );
};

export default Comercial;