"use client"
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next'
import Navbar from '../../../components/Navbar'

type Params = {
  params: {
    titulo: any
  }
}
const Solicitud = async ({params: {titulo}}: Params) => {
  const router = useRouter();
   return (
<>
      <Navbar   />
      <div className="flex flex-col  max-h-screen bg-zinc-800 ">

<div className='flex flex-col   mx-12 bg-white '>
  <div className='bg-white flex flex-row w-full h-screen'>
    <h1 className='text-black text-5xl'>{titulo}</h1>
  </div>
  </div>
  </div>
</>
   )
   ;
}
export default Solicitud;    