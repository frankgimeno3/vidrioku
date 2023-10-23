import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react' 
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

const Contactenos: React.FC = ({  }) => {

 
  return (
    <>
    <div className="flex flex-col p-10 bg-white p-2vh w-full">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-5xl mt-2 mb-3 text-center">Sobre Nosotros</h1>
        <div className="flex grid grid-cols-3 gap-10 p-5">
          <div
            className="flex flex-col items-center justify-center shadow-md bg-cyan-950 rounded-lg"
            style={{ height: "40vh" }}
          >
            <p className="text-white text-base text-center p-8">
              Facilitamos la conexión entre aquellos que buscan talento y
              aquellos que poseen un conocimiento especializado. Encuentre
              trabajadores técnicos altamente especializados en todo el mundo
              hispanohablante, o comparta su valiosa experiencia como
              profesional con perfil técnico.
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center shadow-md bg-cyan-950 rounded-lg"
            style={{ height: "40vh" }}
          >
            <p className="text-white text-base text-center p-8">
              Contamos con una comunidad en constante crecimiento, compuesta
              por expertos calificados dispuestos a ofrecer sus habilidades y
              conocimientos a través de nuestra plataforma intuitiva y
              eficiente.
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center shadow-md bg-cyan-950 rounded-lg"
            style={{ height: "40vh" }}
          >
            <p className="text-white text-base text-center p-8">
              Tanto si usted representa a una empresa en búsqueda de
              profesionales técnicos como si es un trabajador especializado
              deseoso de ampliar sus horizontes laborales, le invitamos a
              unirse a nuestra comunidad y aprovechar las ventajas de nuestro
              amplio mercado laboral en el mundo hispanohablante.
            </p>
          </div>
        </div>
        <div className="flex justify-center mx-auto text-base mt-10 ">
          <Link href="/quienessomos">
          <button className="bg-stone-100  text-gray-800 py-2 px-4  rounded-md border-b-2  hover:bg-gray-600 hover:border-b-white hover:text-white">
            Descubra hoy mismo cómo podemos ayudarle a alcanzar el éxito en el
            ámbito técnico especializado.
          </button>
          </Link>
        </div>
      </div>
    </div>
    <div className="mt-10 pb-10 flex-column justify-center ">
      <h2 className="text-5xl text-white mb-5">Quiere saber más?</h2>
      <div className="flex justify-center mx-auto text-base max-w-sm">
        <Link href="/contacto" passHref>
          <button className="bg-white  text-gray-800 rounded-md py-2 px-4 hover:bg-gray-600 hover:border-b-white hover:text-white">
            Contáctenos
          </button>
        </Link>
      </div>
    </div>
  </>
  )
}
export default Contactenos