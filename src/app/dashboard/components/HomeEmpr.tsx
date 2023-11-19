import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';


interface HomeEmprProps {
  userData: any
}

interface User {
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
}

const HomeEmpr: FC<HomeEmprProps> = ({ userData }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
 
  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData );
         }
      }
    };

    fetchDoc();
  }, [userData]);
  
const chathandler = ()=>{
  router.push("/chat")
}
  const perfilhandler = ()=>{
    router.push("/perfil")
  }
  const crearofertahandler = ()=>{
    router.push("/crearoferta")
  }

  const misofertashandler = ()=>{
    router.push("/misofertas")
  }

  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
      
          <div className=" w-full flex justify-between bg-gradient-to-b from-slate-900 to-slate-600">
            <div className="flex flex-col p-4 w-full flex justify-between text-center justify-center px--auto">
              <Image src="/icons/empresas.png" alt="" width={200} height={200} className="mx-auto my-5" />
              <div className="flex flex-row mx-auto">
                <span className="mr-1">{user?.nombre}</span>
                <span className="capitalize">{user?.apellidos}</span>
              </div>
              <div className="flex flex-row mx-auto">
                <span className='mr-1'>{user?.edad} </span>
                <span className="capitalize">({user?.genero})</span>
              </div>
              <span>{user?.ubi}</span>
              <span>{userData}</span>
              <div >
                <button
                    onClick={perfilhandler}
                  className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
                >Perfil de empresa completo</button>
              </div>
 
            </div>
          </div>
 
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Qué te has perdido?</h2>
      <div className='flex flex-row bg-gradient-to-b from-slate-900 to-slate-600 h-full'>
        <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Mensajes nuevos</p>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
            onClick={chathandler}
          >Ver mensajes nuevos</button>
        </div>
        <div className='flex h-full flex-1 flex-col text-center my-3'>
        <p className='font-bold'>Mis ofertas de empleo</p>
        <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1 mx-32"
            onClick={crearofertahandler}
          >Crear oferta de empleo</button>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1 mx-32"
            onClick={misofertashandler}
          >Mis Ofertas</button>
 
        </div>
        
         <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Solicitudes  </p>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1 mx-32"
            onClick={misofertashandler}
          >Ver Solicitudes Recibidas</button>
 
         </div>
        <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Seguimientos</p>
          <p>Cambios en profesionales seguidos</p>
          <p>Cambios en empresas seguidas</p>
        </div>
      </div>
    </div>
  );
};

export default HomeEmpr;