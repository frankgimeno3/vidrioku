import { FC, useState } from "react";
import Dtporposicion from './dtporposicion'

interface DtecnicoProps {
    setIsTrabajadoresSelected: (component: boolean) => void;
}

const Dtecnico: FC<DtecnicoProps> = ({ setIsTrabajadoresSelected }) => {
    const [segun, setSegun] = useState("")

    const setArquitectos = () => {
        setSegun("Arquitectos")
    }
    const setEdificacion = () => {
        setSegun("Edificacion")
    }
    const setCiviles = () => {
        setSegun("Tecnicos")
    }
    const setMecanicos = () => {
        setSegun("Mecanicos")
    }
    const setElectronicos = () => {
        setSegun("Electronicos")
    }
    const setIndustriales = () => {
        setSegun("Industriales")
    }

    const setPosicion = () => {
        setSegun('Posicion')
    }

    const mostrarListado = () => {
        return setIsTrabajadoresSelected(true)
    }

    return (<>
        <h2 className="pt-12">Qué perfiles le interesan más?</h2>
        <div className="px-2 flex flex-col w-full">
            <div className="flex flex-row flex-1 p-2 text-xs">
                <div className="flex flex-col flex-1 p-2">
                    <button className={`${segun == 'Arquitectos' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setArquitectos}>Arquitectos, arquitectos técnicos</button>
                    <button className={`${segun == 'Edificacion' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setEdificacion}>Ingenieros de edificación</button>
                    <button className={`${segun == 'Civiles' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setCiviles}>Ingenieros civiles o de minas</button>
                </div>
                <div className="flex flex-col flex-1 p-2">
                    <button className={`${segun == 'Mecanicos' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setMecanicos}>Ingenieros técnicos mecánicos</button>
                    <button className={`${segun == 'Electronicos' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setElectronicos}>Ingenieros técnicos electrónicos</button>
                    <button className={`${segun == 'Industriales' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setIndustriales}>Ingenieros industriales</button>
                </div>
            </div>
            {segun   && segun != "Posicion" &&<button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10 text-xs "
                        onClick={mostrarListado}
                    > Obtener listado de perfiles</button>}
            <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10 text-xs" 
                onClick={setPosicion}>Filtrar por posición deseada</button>
            {segun == "Posicion" && <Dtporposicion setIsTrabajadoresSelected={setIsTrabajadoresSelected} />}
         </div>

    </>
    );
};

export default Dtecnico;