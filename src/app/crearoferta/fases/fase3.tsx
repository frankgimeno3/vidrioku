"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Titulo from "../componentes/Titulo";
import Additional from "../componentes/Additional";
import Requerimientos from "../componentes/Requerimientos";



interface Fase3Props {
  addOfferInFirebase: any;
  handleEliminarHabilidad: any;
  habilidadRequerida: any;
  handleHabilidadRequeridaChange: any;
  handleInsertarHabilidad: any;
  comentarios: any;
  setComentarios: any;
  habilidades:any;
}

const Fase3: FC<Fase3Props> = ({ addOfferInFirebase, handleEliminarHabilidad, habilidadRequerida, handleHabilidadRequeridaChange, handleInsertarHabilidad,
  comentarios, setComentarios, habilidades }) => {


  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [userData, setUserData] = useState("")

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else { setUserData("Usuario") }
  }, [session?.data?.user?.email]);



  return (
    <>
      <h1>Requisitos adicionales</h1>

      <Requerimientos habilidadRequerida={habilidadRequerida} handleHabilidadRequeridaChange={handleHabilidadRequeridaChange} />

      <button onClick={handleInsertarHabilidad} className="bg-white px-3 py-1 rounded-lg mx-44 text-sm m-2 text-gray-500 text-sm mb-2">
        Insertar requisitos
      </button>

      <ul className="mx-12 mb-2">
        {habilidades.map((habilidad:any, index:any) => (
          <div className="flex flex-row w-full bg-gray-100 text-gray-700 rounded-lg my-1 shadow-lg " key={index}>
            <li className="flex-1 my-auto">{habilidad}</li>
            <div className="shadow">
              <button onClick={() => handleEliminarHabilidad(event, index)} className="m-2 px-2 bg-gray-300 rounded-lg py-0.5 shadow-lg">x</button>
            </div>
          </div>
        ))}
      </ul>
      <Additional comentarios={comentarios} setComentarios={setComentarios} />

      <button onClick={addOfferInFirebase} className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
        Publicar oferta
      </button>
    </>
  );
};

export default Fase3;



