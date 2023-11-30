import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface SolicitudesProps {
  setOfertas: any;
  setTrabajadores: any;
  tipoConsulta: any;
}

const Searchnav: FC<SolicitudesProps> = ({ setOfertas, setTrabajadores, tipoConsulta }) => {
    const router = useRouter()

    
    return (
            <div className="flex flex-col p-5 ">
                <h2 className='text-center'>Qué desea consultar?</h2>
                <div className="flex flex-row pt-1 text-xs">
                     <button
                        className={`${tipoConsulta == 'Ofertas' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                            } p-2 w-full mr-1 rounded-lg h-20 mx-3`}
                        onClick={()=>{
                            setOfertas()
                            router.push('/search/ofertas')
                        }}
                    >
                        Ofertas de empleo
                    </button>
  
                    <button
                        className={`${tipoConsulta == 'Trabajadores' ? 'bg-zinc-100 text-zinc-700 shadow-lg' : 'bg-zinc-700 text-zinc-100 shadow-lg'
                            } p-2 w-full ml-1 rounded-lg h-20 mx-3`}
                        onClick={()=>{
                            setTrabajadores()
                            router.push('/search/profesionales')
                        }}
                    >
                        Perfiles de profesionales
                    </button>
                 </div>

            </div>

        

    )
}

export default Searchnav