"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Titulo from "../componentes/Titulo";
import Cargo from "../componentes/Cargo";
import Descripcion from "../componentes/Descripcion";



interface Fase1Props {
    setFaseActual: any;
    titulo: any;
    setTitulo: any;
    cargo: any;
    setCargo: any;
    descripcion: any;
    setDescripcion: any;
    nombreEmpresa: any;
setNombreEmpresa: any;
}

const Fase1: FC<Fase1Props> = ({ setFaseActual, titulo, setTitulo, cargo, setCargo, descripcion, setDescripcion, nombreEmpresa,
    setNombreEmpresa }) => {

    const handleNextFase = () => {
        setFaseActual(2)
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-lg mb-5">Configuración principal de la oferta</h1>
            <Titulo titulo={titulo} setTitulo={setTitulo} nombreEmpresa={nombreEmpresa} setNombreEmpresa={setNombreEmpresa}/>
            <Cargo cargo={cargo} setCargo={setCargo} />
            <Descripcion descripcion={descripcion} setDescripcion={setDescripcion} />

            <button onClick={() => { handleNextFase() }} className='bg-white px-3 py-1 rounded-lg w-36 mx-auto text-sm m-2 text-gray-500 text-sm mb-2'>
                Guardar y seguir
            </button>
        </div>
    );
};

export default Fase1;



