import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

const Ofertas: React.FC = ({ }) => {
//  const router = useRouter()
const [oferta1Height, setOferta1Height] = useState<any>({height: 145})
const [t1Height, sett1Height] = useState<any>({ paddingTop: '30px' });
const [oferta2Height, setOferta2Height] = useState<any>({height: 145})
const [t2Height, sett2Height] = useState<any>({ paddingTop: '40x' });
const [oferta3Height, setOferta3Height] = useState<any>({height: 145})
const [t3Height, sett3Height] = useState<any>({ paddingTop: '40px' });
const [oferta4Height, setOferta4Height] = useState<any>({height: 145})
const [t4Height, sett4Height] = useState<any>({ paddingTop: '25px' });

const [is1, setIs1] = useState(false)
 const [is2, setIs2] = useState(false)
 const [is3, setIs3] = useState(false)
 const [is4, setIs4] = useState(false)
 const handleDepTecnico = ()=>{
  // router.push("/bolsaofertas/deptecnico")
  if(`${is1}` == `true`) {setIs1(false); setOferta1Height({height: 145}); sett1Height({ paddingTop: '25px' })}
  if(`${is1}` == `false`) {setIs1(true); setOferta1Height({height: 180}); sett1Height({ paddingTop: '1px' })}
  setIs2(false); setIs3(false); setIs4(false)
  setOferta2Height({height: 145}); setOferta3Height({height: 145}); setOferta4Height({height: 145})
  sett2Height({ paddingTop: '40px' }); sett3Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '30px' })
 }
 const handleIngenieros
 = ()=>{
  // router.push("/bolsaofertas/ingenieros")
  if(`${is2}` == `true`) {setIs2(false); setOferta2Height({height: 145}); sett2Height({ paddingTop: '40px' })}
  if(`${is2}` == `false`) {setIs2(true); setOferta2Height({height: 180}); sett2Height({ paddingTop: '5px', marginBottom: '15px'})}
  setIs1(false); setIs3(false); setIs4(false)
  setOferta1Height({height: 145}); setOferta3Height({height: 145}); setOferta4Height({height: 145})
  sett1Height({ paddingTop: '25px' }); sett3Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '30px' })
 }
 const  handleOperarios
  = ()=>{
  // router.push("/bolsaofertas/operarios")
  if(`${is3}` == `true`) {setIs3(false) ; setOferta3Height({height: 145}); sett3Height({ paddingTop: '40px' })}
  if(`${is3}` == `false`) {setIs3(true); setOferta3Height({height: 180}); sett3Height({ paddingTop: '5px', marginBottom: '5px'})}
  setIs1(false); setIs2(false); setIs4(false)
  setOferta1Height({height: 145}); setOferta2Height({height: 145}); setOferta4Height({height: 145})
  sett1Height({ paddingTop: '25px' }); sett2Height({ paddingTop: '40px' }); sett4Height({ paddingTop: '30px' })
 }
 const handleComercialCompras = ()=>{
  // router.push("/bolsaofertas/comercialcompras")
  if(`${is4}` == `true`) {setIs4(false) ; setOferta4Height({height: 145}); sett4Height({ paddingTop: '30px' })}
  if(`${is4}` == `false`) {setIs4(true); setOferta4Height({height: 180}); sett4Height({ paddingTop: '0px' })}
  setIs1(false); setIs2(false); setIs3(false)
  setOferta1Height({height: 145}); setOferta2Height({height: 145}); setOferta3Height({height: 145})
  sett1Height({ paddingTop: '25px' }); sett2Height({ paddingTop: '35px' }); sett3Height({ paddingTop: '35px' })
 }

  return (
    <div className='flex flex-col md:flex-row text-center'>
      <div className='flex flex-col flex-1 '>
        <div className="bg-white rounded-xl shadow-xl p-2 md:p-5 px-10 my-2 mx-5 h-72" onClick={handleDepTecnico} >

          <h3 className="text-xl mb-2 hover:text-blue-500">
            Ofertas para departamento técnico
          </h3>
          <p className="mb-2">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
          </p>
          {/* <Image src="/icons/dtecnico.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
        <div className="bg-white rounded-xl shadow-xl p-2 md:p-5 px-10 my-2 mx-5 h-72"  onClick={handleIngenieros}      >
          <h3 className="text-xl mb-2 hover:text-blue-500">
          Ofertas para ingenieros
          </h3>
          <p className="mb-2">
            En nuestra bolsa específica de ingenieros encontrará personal licenciado en ingeniería, filtrado según su educación o experiencia previa
          </p>
          {/* <Image src="/icons/ingenieros.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
      </div>
      <div className='flex flex-col flex-1'>

        <div className="bg-white rounded-xl shadow-xl p-2 md:p-5 px-10 my-2 mx-5 h-72"  onClick={handleOperarios}      >
          <h3 className="text-xl mb-2 hover:text-blue-500">
            Ofertas para operarios
          </h3>
          <p className="mb-2">
            Encuentre operarios de todo tipo, desde peones de fábrica, operarios de transporte, mantenimiento, y otros, todos ellos especializados en el sector del vidrio.
          </p>
          <Image src="/icons/operarios.png" alt="Logo3" width={200} height={200}  className='opacity-60 mx-auto hover:opacity-100'/>

        </div>
        <div className="bg-white rounded-xl shadow-xl p-2 md:p-5 px-10 my-2 mx-5 h-72"   onClick={handleComercialCompras}     >
          <h3 className="text-xl mb-2 hover:text-blue-500">
            Ofertas para el departamento comercial y compras
          </h3>
          <p className="mb-2">
            Arquitectos técnicos e ingenieros, especializados en la realización y el análisis de proyectos en que el vidrio juega un factor clave
          </p>
          {/* <Image src="/icons/comercialycompras.png" alt="Logo3" width={150} height={150}  className='opacity-60 mx-auto hover:opacity-100'/> */}

        </div>
      </div>
    </div>
  )
}
export default Ofertas