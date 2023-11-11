import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';


interface ChatListProps {
    userData: any
    selectUser1: any
    selectUser2: any
    selectUser3: any
    selectUser4: any
    selectUser5: any
}

interface User {
    apellidos: string;
    edad: number;
    genero: string;
    nombre: string;
    ubi: string;
    userEmail: string;
}

const ChatList: FC<ChatListProps> = ({ userData, selectUser1, selectUser2, selectUser3, selectUser4, selectUser5 }) => {
    const router = useRouter();
    const [user, setUser] = useState<User>();

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
        <div className='my-3 flex flex-1 flex-col'>
            <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
              onClick={selectUser1}>
              <div>
                <Image
                  src="/profilepictures/2.jpg"
                  alt="ing1"
                  width={100}
                  height={100}
                  className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
                />
              </div>

              <div className='flex flex-col px-3 flex-3'>
                <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de usuario</h2>

                <div className='flex flex-col'></div>
                <h2 className='mt-1 text-sm   mx-5'>El usuario
                  <span className='font-bold'> Miquel Àngel Rodriguez </span>le ha enviado un mensaje </h2>
              </div>
            </div>
            <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
              onClick={selectUser2}>

              <div className=''>
                <Image
                  src="/inventedlogos/4.png"
                  alt="ing1"
                  width={100}
                  height={100}
                  className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
                />
              </div>
              <div className='flex flex-col px-3 flex-3'>
                <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de Empresa</h2>

                <div className='flex flex-col'></div>
                <h2 className='mt-1 text-sm   mx-5'>La empresa
                  <span className='font-bold'> TUROMAS </span>le ha enviado un mensaje </h2>
              </div>
            </div>
            <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
              onClick={selectUser3}>

              <div>
                <Image
                  src="/profilepictures/3.jpg"
                  alt="ing2"
                  width={100}
                  height={100}
                  className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
                />
              </div>

              <div className='flex flex-col px-3 flex-3'>
                <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de usuario</h2>

                <div className='flex flex-col'></div>
                <h2 className='mt-1 text-sm   mx-5'>El usuario
                  <span className='font-bold'> Pepito Ramos </span>le ha enviado un mensaje </h2>
              </div>
            </div>
            <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
              onClick={selectUser4}>

              <div>
                <Image
                  src="/inventedlogos/5.png"
                  alt="ing1"
                  width={100}
                  height={100}
                  className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
                />
              </div>

              <div className='flex flex-col px-4 flex-3'>
                <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de Empresa</h2>

                <div className='flex flex-col'></div>
                <h2 className='mt-1 text-sm   mx-5'>La empresa
                  <span className='font-bold'> TVITEC </span>le ha enviado un mensaje </h2>
              </div>
            </div>
            <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
              onClick={selectUser5}>

              <div >
                <Image
                  src="/inventedlogos/6.png"
                  alt="ing1"
                  width={100}
                  height={100}
                  className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
                />
              </div>

              <div className='flex flex-col px-4  '>
                <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de Empresa</h2>

                <div className='flex flex-col'></div>
                <h2 className='mt-1 text-sm   mx-5'>La empresa
                  <span className='font-bold'> GLASTON </span>le ha enviado un mensaje </h2>
              </div>
            </div>
          </div>
    );
};

export default ChatList;