import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

const Ofertas: React.FC = ({ }) => {
  //  const router = useRouter()
  const [oferta1Height, setOferta1Height] = useState<any>({ height: 145 })
  const [t1Height, sett1Height] = useState<any>({ paddingTop: '30px' });
  const [oferta2Height, setOferta2Height] = useState<any>({ height: 145 })
  const [t2Height, sett2Height] = useState<any>({ paddingTop: '35px' });
  const [oferta3Height, setOferta3Height] = useState<any>({ height: 145 })
  const [t3Height, sett3Height] = useState<any>({ paddingTop: '35px' });
  const [oferta4Height, setOferta4Height] = useState<any>({ height: 145 })
  const [t4Height, sett4Height] = useState<any>({ paddingTop: '10px' });

  const [is1, setIs1] = useState(false)
  const [is2, setIs2] = useState(false)
  const [is3, setIs3] = useState(false)
  const [is4, setIs4] = useState(false)
  const handleDepTecnico = () => {
    // router.push("/bolsaofertas/deptecnico")
    if (`${is1}` == `true`) { setIs1(false); setOferta1Height({ height: 145 }); sett1Height({ paddingTop: '25px' }) }
    if (`${is1}` == `false`) { setIs1(true); setOferta1Height({ height: 220 }); sett1Height({ paddingTop: '1px' }) }
    setIs2(false); setIs3(false); setIs4(false)
    setOferta2Height({ height: 145 }); setOferta3Height({ height: 145 }); setOferta4Height({ height: 145 })
    sett2Height({ paddingTop: '40px' }); sett3Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '30px' })
  }
  const handleIngenieros
    = () => {
      // router.push("/bolsaofertas/ingenieros")
      if (`${is2}` == `true`) { setIs2(false); setOferta2Height({ height: 145 }); sett2Height({ paddingTop: '40px' }) }
      if (`${is2}` == `false`) { setIs2(true); setOferta2Height({ height: 220 }); sett2Height({ paddingTop: '5px', marginBottom: '15px' }) }
      setIs1(false); setIs3(false); setIs4(false)
      setOferta1Height({ height: 145 }); setOferta3Height({ height: 145 }); setOferta4Height({ height: 145 })
      sett1Height({ paddingTop: '25px' }); sett3Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '30px' })
    }
  const handleOperarios
    = () => {
      // router.push("/bolsaofertas/operarios")
      if (`${is3}` == `true`) { setIs3(false); setOferta3Height({ height: 145 }); sett3Height({ paddingTop: '40px' }) }
      if (`${is3}` == `false`) { setIs3(true); setOferta3Height({ height: 220 }); sett3Height({ paddingTop: '5px', marginBottom: '5px' }) }
      setIs1(false); setIs2(false); setIs4(false)
      setOferta1Height({ height: 145 }); setOferta2Height({ height: 145 }); setOferta4Height({ height: 145 })
      sett1Height({ paddingTop: '25px' }); sett2Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '30px' })
    }
  const handleComercialCompras = () => {
    // router.push("/bolsaofertas/comercialcompras")
    if (`${is4}` == `true`) { setIs4(false); setOferta4Height({ height: 145 }); sett4Height({ paddingTop: '10px' }) }
    if (`${is4}` == `false`) { setIs4(true); setOferta4Height({ height: 220 }); sett4Height({ paddingTop: '0px' }) }
    setIs1(false); setIs2(false); setIs3(false)
    setOferta1Height({ height: 145 }); setOferta2Height({ height: 145 }); setOferta3Height({ height: 145 })
    sett1Height({ paddingTop: '25px' }); sett2Height({ paddingTop: '35px' }); sett3Height({ paddingTop: '45px' })
  }

  return (
 

      <div className='flex flex-col md:flex-row text-center justify-center font-base text-gray-700 '>
        <div className='flex flex-col md:flex-row pb-5 '>
          <div className="w-72 bg-white  hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleDepTecnico}
            style={oferta1Height}>

            <h3 className="text-xl" style={t1Height}>
              Ofertas para departamento técnico
            </h3>
            {is1 && <p className="my-2 text-light">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
            </p>}
 
          </div>
          <div className="w-72 bg-white hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleIngenieros}
            style={oferta2Height}>
            <h3 className="text-xl " style={t2Height}>
              Ofertas para ingenieros
            </h3>
            {is2 && <p className=" text-light">
            En nuestra bolsa específica de ingenieros encontrará personal licenciado en ingeniería, filtrado según su educación o experiencia previa
            </p>}
 
          </div>
        </div>
        <div className='flex flex-col md:flex-row '>

          <div className="w-72 bg-white hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleOperarios}
            style={oferta3Height}>
            <h3 className="text-xl" style={t3Height}>
              Ofertas para operarios
            </h3>
            {is3 && <p className="mt-5 text-light">
            Encuentre operarios de todo tipo, desde peones de fábrica, operarios de transporte, mantenimiento, y otros, todos ellos especializados en el sector del vidrio.
            </p>}
 
          </div>
          <div className="w-72 bg-white hover:text-black hover:bg-gray-100 rounded-xl hover:shadow-xl hover:shadow-blue-900 p-2 md:p-5 px-10 my-2 md:mx-5 mx-auto" onClick={handleComercialCompras}
            style={oferta4Height}>
            <h3 className="text-xl " style={t4Height}>
              Ofertas para el departamento comercial y compras
            </h3>
            {is4 && <p className="mb-2 mt-2 text-light">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
            </p>}
 
          </div>
        </div>
      </div>
 
  )
}
export default Ofertas