"use client"
import { FC, useEffect, useState } from "react";
import Image from "next/image"; 
import Link from "next/link"; 

interface RendercomponentProps {
    renderoferta: any;
    empresa: any;
}



const Rendercomponent: FC<RendercomponentProps> = ({ renderoferta, empresa }) => {

    const [receivedOffer, setReceivedOffer] = useState<any>()
    const [empresaProfilePicture, setEmpresProfilePicture] = useState<any>("/inventedlogos/1.png")


    useEffect(() => {
        setReceivedOffer(renderoferta)
    }, [renderoferta]);



    useEffect(() => {
        if (empresa?.profilepicture) {
            if (empresa?.profilepicture != "") {
                setEmpresProfilePicture("/inventedlogos/1.png")
            } else { setEmpresProfilePicture(empresa.profilepicture) }
        }
        else {
            setEmpresProfilePicture("/inventedlogos/1.png")
        }
    }, [empresa]);



    return (

        <div className="flex flex-col bg-gray-50 shadow-lg h-full text-left items-left w-full text-gray-500 py-8 px-24 overflow-scroll">
            <div className="flex flex-col items-center ">
                <Image src={empresaProfilePicture} alt="companyProfilePicture" height={100} width={100} />
                <p className="  text-base">{empresa?.nombre}</p>
            </div>
            <h2 className="my-5 mx-5 text-xl">{receivedOffer?.titulo}</h2>
            <div className="flex flex-col text-sm text-gray-500  bg-white  my-2 rounded shadow p-5">
                <p className="font-bold text-gray-400 mr-2  text-sm  ">Cargo:</p>
                <p >{receivedOffer?.cargo}</p>
                <div className="flex flex-col mt-5">
                    <p className="font-bold text-gray-400 mr-2 text-md">Ubicación del empleo: </p>
                    <div className="flex flex-wrap flex-1 ">
                        <p>{receivedOffer?.tipoubi}</p>
                        {receivedOffer?.tipoubi !== 'Trabajo Remoto' &&
                            <>
                                <p className="">, {receivedOffer?.ubicacion},</p>
                                <p className="ml-2">{receivedOffer?.pais?.split(' - ')[1]}</p>
                            </>}
                    </div>
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
                    Experiencia deseada
                </p>
                <div className="flex flex-col mt-1">
                    {receivedOffer?.experiencia.map((experiencia: any, index: any) => (
                        <span key={index}>{experiencia}</span>
                    ))}
                </div>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm  font-bold text-gray-400">
                    Tipo de jornada
                </p>
                <p className="text-sm mt-1">
                    {receivedOffer?.jornada}
                </p>
            </div>

            {receivedOffer?.adicional && <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm   font-bold text-gray-400">
                    Detalles adicionales
                </p>
                <p className="text-sm mt-1">
                    {receivedOffer?.adicional}
                </p>
            </div>}
            <div className="flex flex-row">
            <Link href={`/solicitar/${receivedOffer?.id}`}>
                <button className="p-2 border shadow-lg rounded-lg text-xs mt-5">
                    Solicitar Empleo
                </button>
            </Link>
            <Link href={`/perfiles/${renderoferta?.empresa}`}>
                <button className="ml-5 p-2 border shadow-lg rounded-lg text-xs mt-5">
                    Ver Perfil completo
                </button>
            </Link>
            </div>
        </div>

    );
};

export default Rendercomponent;