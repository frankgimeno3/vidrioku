"use client"
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Descripcion from "@/app/crearoferta/componentes/Descripcion";
import { useRouter } from "next/router"; // Se corrigió el import de useRouter
import Link from "next/link";

interface RendercomponentProps {
    renderoferta:any;
}


// id={renderoferta.id}
// titulo={renderoferta.titulo}
// cargo={renderoferta.cargo}
// jornada={renderoferta.jornada}
// tipoubi={renderoferta.tipoubi}
// ubicacion={renderoferta.ubicacion}
// descripcion={renderoferta.descripcion}
// experiencia={renderoferta.experiencia}
// adicional={renderoferta.adicional}
// empresa={renderoferta.empresa}
// estado={renderoferta.estado}


const Rendercomponent: FC<RendercomponentProps> = ({ renderoferta
    // id,
    // titulo,
    // cargo,
    // jornada,
    // tipoubi,
    // ubicacion,
    // descripcion,
    // experiencia,
    // adicional,
    // empresa,
    // estado,
}) => {

    const [receivedOffer, setReceivedOffer] = useState<any>()


    useEffect(() => {
        setReceivedOffer(renderoferta)
        
      }, [renderoferta]);

    return (
        <div className="flex flex-col bg-gray-50 shadow-lg h-full text-left items-left w-full text-gray-500 py-8 px-24 overflow-scroll">
            <Image src={"/inventedlogos/1.png"} alt="pepo" height={100} width={100} />
            <h2 className="mt-5 text-xl">{receivedOffer?.titulo}</h2>
            <div className="flex flex-row text-sm text-gray-500 mt-5 bg-white  my-2 rounded shadow">
                <div className="flex flex-col flex-1 p-5">
                    <p className="font-bold text-gray-400 mr-2 text-md">Cargo: </p>
                    <p>{receivedOffer?.cargo}</p>
                </div>
                <div className="flex flex-col flex-1 p-5">
                    <p className="font-bold text-gray-400">Ubicación del empleo: </p>
                    <p>{receivedOffer?.ubicacion}</p>
                </div>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm   font-bold text-gray-400">
                    Descripción de la oferta
                </p>
                <p className="text-sm mt-1">
                    {receivedOffer?.descripcion}
                </p>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm   font-bold text-gray-400">
                    Requerimientos
                </p>
                <p className="text-sm mt-1">
                    {receivedOffer?.experiencia}
                </p>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm  font-bold text-gray-400">
                    Tipo de jornada
                </p>
                <p className="text-sm mt-1">
                    {receivedOffer?.jornada}
                </p>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm   font-bold text-gray-400">
                    Detalles adicionales
                </p>
                <p className="text-sm mt-1">
                    {receivedOffer?.adicional}
                </p>
            </div>
            <Link href={`/solicitar/${receivedOffer?.id}`}>  
                <button className="p-2 border shadow-lg rounded-lg text-xs mt-5">
                    Solicitar Empleo
                </button>
            </Link>
        </div>
    );
};

export default Rendercomponent;