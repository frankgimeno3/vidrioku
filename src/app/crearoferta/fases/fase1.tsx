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
}

const Fase1: FC<Fase1Props> = ({ setFaseActual, titulo, setTitulo, cargo, setCargo, descripcion, setDescripcion }) => {

    const handleNextFase = () => {
        setFaseActual(2)
    }

    return (
        <>
            <h1>Configuración principal de la oferta</h1>
            <Titulo titulo={titulo} setTitulo={setTitulo} />
            <Cargo cargo={cargo} setCargo={setCargo} />
            <Descripcion descripcion={descripcion} setDescripcion={setDescripcion} />

            <button onClick={() => { handleNextFase() }} className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
                Guardar y seguir
            </button>
        </>
    );
};

export default Fase1;



