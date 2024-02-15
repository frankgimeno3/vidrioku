import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useSession } from 'next-auth/react';


interface PerfilempresaProps {
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

const Perfilempresa: FC<PerfilempresaProps> = ({   }) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState("")
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {
      setUserData('Usuario');
    }
  }, [session?.data?.user?.email]);
  
  useEffect(() => {
    const fetchDoc = async () => {
      if (userData) {
        const docRef = doc(db, "users", userData);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as User;
          setUser(myUserData);
          console.log(myUserData)
        }
      }
    };

    fetchDoc();
  }, [userData]);
 
  return (
    <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-600">
      <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">  {user?.nombre} S.A.</h2>
 
          <div className=" w-full flex justify-between bg-gradient-to-b from-slate-900 to-slate-600">
            <div className="flex flex-col p-4 w-full flex justify-between text-center justify-center px-auto">
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
                  className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
                >Editar información de mi perfil de empresa</button>
              </div>
            </div>
          </div>
 
      <div className='mx-auto mt-5'>
      <h2>Ofertas activas</h2> 

      </div>
    </div>
  );
};

export default Perfilempresa;