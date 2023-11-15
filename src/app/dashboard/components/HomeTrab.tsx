import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';


interface HomeTrabProps {
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

const HomeTrab: FC<HomeTrabProps> = ({ userData }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  const handlemissolicitudes = ()=>{
    router.push("/missolicitudes")
  }
  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
        }
      }
    };

    fetchDoc();
  }, [userData]);

  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Saludos, {user?.nombre}</h2>
      <div className=" w-full flex justify-between bg-gradient-to-b from-slate-900 to-slate-600">
        <div className="flex flex-col p-4 w-full flex justify-between text-center justify-center px--auto">
          <Image src="/icons/empty-user-profile.png" alt="" width={200} height={200} className="mx-auto my-5" />
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
              className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
            >Mi currículum</button>
          </div>
          <div >
            <button
              className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
            >Editar información de mi perfil</button>
          </div>
        </div>
      </div>

      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Qué te has perdido?</h2>
      <div className='flex flex-row bg-gradient-to-b from-slate-900 to-slate-600 h-full'>
        <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Mensajes nuevos</p>
        </div>
        <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Publicaciones nuevas de las empresas que sigues</p>
        </div>
        <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Solicitudes</p>
          <button
            className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
            onClick={handlemissolicitudes}
          >Mis solicitudes</button>
        </div>
        <div className='h-full flex-1 text-center my-3'>
          <p className='font-bold'>Solicitudes enviadas</p>
          <p>Solicitudes leídas</p>
          <p>Solicitudes no leídas</p>
        </div>
      </div>
    </div>
  );
};

export default HomeTrab;