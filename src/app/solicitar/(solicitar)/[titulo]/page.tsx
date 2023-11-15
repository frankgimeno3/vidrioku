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
   return <h1>Este es {titulo}</h1>;
}
export default Solicitud;    