import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';


interface ChatcontentProps {
    userData: any
    backToMenu: any
    userSelectedImg: any
    userSelectedName: any
}

interface User {
    apellidos: string;
    edad: number;
    genero: string;
    nombre: string;
    ubi: string;
    userEmail: string;
}

const Chatcontent: FC<ChatcontentProps> = ({ userData, backToMenu, userSelectedImg, userSelectedName }) => {
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
        <div className='flex flex-col h-screen flex-1  '>
            <div className="flex flex-row items-center pb-2 px-2 bg-white bg-opacity-10   ">

                <div className='w-8 pt-3 mx-3 '>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"
                        onClick={backToMenu}>
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff"
                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002"
                                stroke="#ffffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </div>
                <div>
                    <Image
                        src={userSelectedImg}
                        alt="ing1"
                        width={10}
                        height={50}
                        className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
                    />
                </div>

                <h2 className='pt-2 px-3'>{userSelectedName}</h2>
            </div>

            <div className="flex h-full flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 mt-4  ">
                <div className="flex h-full flex-col  h-full mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1">
                </div>
            </div>
            <form className="flex flex-row  mx-6  py-2 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 justify-between mb-5 w-full">
                <input className='text-gray-300 py-1 pl-5 px-5 text-sm bg-transparent  w-full mx-4' placeholder='Inserte su texto aquí'></input>
                <button className='text-gray-300  px-2 mr-1 text-sm bg-white bg-opacity-10 rounded-lg text-xs'>Enviar</button>
            </form>
        </div>
    );
};

export default Chatcontent;