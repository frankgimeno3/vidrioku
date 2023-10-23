import { FC, useState } from "react";

interface IngenierosProps {
    setIsTrabajadoresSelected: (component: boolean) => void;
}
const Iporeducacion: FC <IngenierosProps>= ({setIsTrabajadoresSelected})=> {
    const [edu, setEdu] = useState("")
     
    const mostrarListado = () => {
        return setIsTrabajadoresSelected(true)
    }


    const setMecanica = () => {
        setEdu('Mecanica')
    }
    const setElectronica = () => {
        setEdu('Electronica')
    }
    const setIndustrial = () => {
        setEdu('Industrial')
    }
    const setCivil = () => {
        setEdu('Civil')
    }
    const setEdif = () => {
        setEdu('Edif')
    }
    const setInformatica = () => {
        setEdu('Informatica')
    }
    const setTelecos = () => {
        setEdu('Telecos')
    }
    const setOtras = () => {
        setEdu('Otras')
    }

    return (<>
        <h2 className="pt-12">Qué tipo de ingeniero necesita?</h2>
        <div className="px-2 flex flex-row w-full text-xs">
            <div className="flex flex-col flex-1 p-2">
                <button className={`${edu == 'Mecanica' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setMecanica}>Ingeniería Mecánica</button>
                <button className={`${edu == 'Electronica' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setElectronica}>Ingeniería Electrónica</button>
                <button className={`${edu == 'Industrial' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setIndustrial}>Ingeniería Industrial</button>
                <button className={`${edu == 'Civil' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setCivil}>Ingeniería Civil</button>

</div>
            <div className="flex flex-col flex-1 p-2">
                <button className={`${edu == 'Edif' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setEdif}>Ingeniería Edificación</button>
                <button className={`${edu == 'Informatica' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setInformatica}>Ingeniería Informática</button>
                <button className={`${edu == 'Telecos' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setTelecos}>Ingeniería Tele-
                        comunicaciones</button>
                <button className={`${edu == 'Otras' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                        } p-2 w-full my-1 rounded-lg h-20`}
                        onClick={setOtras}>Otras ingenierías</button>
            </div>

        </div>
        {edu   && <div className="flex flex-col px-4 text-xs">
                    <button className="bg-zinc-100 text-zinc-700 shadow-lg px-2 py-1 w-full mt-2 rounded-lg h-10  "
                        onClick={mostrarListado}
                    > Obtener listado de perfiles</button>

                </div>}
    </>
    );
};

export default Iporeducacion;