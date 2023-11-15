"use client"
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next'

type Params = {
  params: {
    titulo: any
  }
}
const Solicitud = async ({params: {titulo}}: Params) => {
  const router = useRouter();
  if (!titulo) return <div><p className='py-24 bg-white text-black text-xl'>Por lo menos, llega</p></div>
  return <h1>Este es {titulo}</h1>;
}
export default Solicitud;    