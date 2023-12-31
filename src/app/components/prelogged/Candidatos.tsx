import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

const Candidatos: React.FC = ({ }) => {
  //  const router = useRouter()
  const [candidato1Height, setCandidato1Height] = useState<any>({ height: 145 })
  const [t1Height, sett1Height] = useState<any>({ paddingTop: '20px' });
  const [candidato2Height, setCandidato2Height] = useState<any>({ height: 145 })
  const [t2Height, sett2Height] = useState<any>({ paddingTop: '40px' });
  const [candidato3Height, setCandidato3Height] = useState<any>({ height: 145 })
  const [t3Height, sett3Height] = useState<any>({ paddingTop: '40px' });
  const [candidato4Height, setCandidato4Height] = useState<any>({ height: 145 })
  const [t4Height, sett4Height] = useState<any>({ paddingTop: '10px' });

  const [is1, setIs1] = useState(false)
  const [is2, setIs2] = useState(false)
  const [is3, setIs3] = useState(false)
  const [is4, setIs4] = useState(false)
  const handleDepTecnico = () => {
    // router.push("/bolsacandidatos/deptecnico")
    if (`${is1}` == `true`) { setIs1(false); setCandidato1Height({ height: 145 }); sett1Height({ paddingTop: '20px' }) }
    if (`${is1}` == `false`) { setIs1(true); setCandidato1Height({ height: 250 }); sett1Height({ paddingTop: '1px' }) }
    setIs2(false); setIs3(false); setIs4(false)
    setCandidato2Height({ height: 145 }); setCandidato3Height({ height: 145 }); setCandidato4Height({ height: 145 })
    sett2Height({ paddingTop: '40px' }); sett3Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '10px' })
  }
  const handleIngenieros
    = () => {
      // router.push("/bolsacandidatos/ingenieros")
      if (`${is2}` == `true`) { setIs2(false); setCandidato2Height({ height: 145 }); sett2Height({ paddingTop: '40px' }) }
      if (`${is2}` == `false`) { setIs2(true); setCandidato2Height({ height: 250 }); sett2Height({ paddingTop: '5px', marginBottom: '15px' }) }
      setIs1(false); setIs3(false); setIs4(false)
      setCandidato1Height({ height: 145 }); setCandidato3Height({ height: 145 }); setCandidato4Height({ height: 145 })
      sett1Height({ paddingTop: '20px' }); sett3Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '10px' })
    }
  const handleOperarios
    = () => {
      // router.push("/bolsacandidatos/operarios")
      if (`${is3}` == `true`) { setIs3(false); setCandidato3Height({ height: 145 }); sett3Height({ paddingTop: '40px' }) }
      if (`${is3}` == `false`) { setIs3(true); setCandidato3Height({ height: 250 }); sett3Height({ paddingTop: '5px', marginBottom: '5px' }) }
      setIs1(false); setIs2(false); setIs4(false)
      setCandidato1Height({ height: 145 }); setCandidato2Height({ height: 145 }); setCandidato4Height({ height: 145 })
      sett1Height({ paddingTop: '20px' }); sett2Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '10px' })
    }
  const handleComercialCompras = () => {
    // router.push("/bolsacandidatos/comercialcompras")
    if (`${is4}` == `true`) { setIs4(false); setCandidato4Height({ height: 145 }); sett4Height({ paddingTop: '10px' }) }
    if (`${is4}` == `false`) { setIs4(true); setCandidato4Height({ height: 250 }); sett4Height({ paddingTop: '0px' }) }
    setIs1(false); setIs2(false); setIs3(false)
    setCandidato1Height({ height: 145 }); setCandidato2Height({ height: 145 }); setCandidato3Height({ height: 145 })
    sett1Height({ paddingTop: '20px' }); sett2Height({ paddingTop: '40px' }); sett3Height({ paddingTop: '40px' })
  }

  return (
    <div className='flex flex-col md:flex-row text-center justify-center font-base text-gray-700 '>
      <div className='flex flex-col md:flex-row pb-5 '>
        <div className="w-72 bg-white  hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleDepTecnico}
          style={candidato1Height}>

          <h3 className="text-xl" style={t1Height}>
            Profesionales expertos en departamento técnico
          </h3>
          {is1 && <p className="my-2 text-light">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
          </p>}
          {/* <Image src="/icons/dtecnico.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
        <div className="w-72 bg-white hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleIngenieros}
          style={candidato2Height}>
          <h3 className="text-xl " style={t2Height}>
            Ingenieros
          </h3>
          {is2 && <p className=" text-light">
            En nuestra bolsa específica de ingenieros encontrará personal licenciado en ingeniería, filtrado según su educación o experiencia previa
          </p>}
          {/* <Image src="/icons/ingenieros.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
      </div>
      <div className='flex flex-col md:flex-row '>

        <div className="w-72 bg-white hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleOperarios}
          style={candidato3Height}>
          <h3 className="text-xl" style={t3Height}>
            Operarios
          </h3>
          {is3 && <p className="mt-5 text-light">
            Encuentre operarios de todo tipo, desde peones de fábrica, operarios de transporte, mantenimiento, y otros, todos ellos especializados en el sector del vidrio.
          </p>}
          {/* <Image src="/icons/operarios.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
        <div className="w-72 bg-white hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleComercialCompras}
          style={candidato4Height}>
          <h3 className="text-xl " style={t4Height}> Profesionales expertos en departamento comercial y compras
          </h3>
          {is4 && <p className="mb-2 mt-2 text-light">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
          </p>}
          {/* <Image src="/icons/comercialycompras.png" alt="Logo3" width={150} height={150}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
      </div>
    </div>
  )
}
export default Candidatos