import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RendercomponentProps {
    renderProfesional: any;
}

const Rendercomponent: FC<RendercomponentProps> = ({ renderProfesional }) => {
    return (
        <div className="flex flex-col bg-gray-50 shadow-lg h-full text-left items-left w-full text-gray-500 py-8 px-24 overflow-scroll">
            <div className="flex flex-col items-center">
                <Image src="/icons/empty-user-profile.png" alt="pepo" height={150} width={150} className="rounded-full shadow-xl" />
                <h2 className="mt-5 text-xl">{renderProfesional?.nombre} {renderProfesional?.apellidos}</h2>
            </div>
            <div className="flex flex-col text-sm text-gray-500 bg-white my-2 rounded shadow p-5">
 
                <div className="flex flex-col mt-5">
                    <p className="font-bold text-gray-400">Lugar de residencia actual:</p>
                    <p>{renderProfesional?.ubi}</p>
                </div>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm font-bold text-gray-400">
                    Descripción general
                </p>
                <p className="text-sm mt-1">
                    {renderProfesional?.carta}
                </p>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm font-bold text-gray-400">
                    Experiencia laboral
                </p>
                <div className="mt-1 flex flex-col">
                        {renderProfesional?.recorridoLaboral?.map((exp:any, index:any) => (
                          <div key={index} className="py-1 ml-2">
                           <p>·   {exp.cargo} en {exp.empresa} (desde {exp.desde} hasta {exp.hasta}):</p>
                            <p className='pl-3'>{exp.descripcion}</p>
                          </div>
                        ))}
                      </div>
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm font-bold text-gray-400">
                    Educación, títulos, certificados y licencias
                </p>
                {renderProfesional?.estudios?.map((exp:any, index:any) => (
                          <div key={index} className="py-1 ml-2">
                           <p>·   {exp.concepto} en {exp.entidademisora} ({exp.hasta}):</p>
                            <p className='pl-3'>{exp.descripcion}</p>
                          </div>
                        ))}
            </div>
            <div className="bg-white p-5 my-2 rounded shadow">
                <p className="text-sm font-bold text-gray-400">
                    Idiomas
                </p>
                {renderProfesional?.idiomas?.map((idioma:any, index:any) => (
                          <div key={index} className="py-1 ml-2">
                           <p>·   {idioma.idioma}, nivel: {idioma.nivel} </p>
                           </div>
                        ))}
            </div>
            <Link href={`/conectar/${renderProfesional?.id}`}>
                <button className="p-2 border shadow-lg rounded-lg text-xs mt-5">
                    Contactar profesional
                </button>
            </Link>
        </div>
    );
};

export default Rendercomponent;
