import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../../firebase';
import MessageListComponent from './MessageListComponent';


interface ChatListProps {
    userData: any
    selectUser1: any
}

interface User {
    id:any
    apellidos: string;
    edad: number;
    genero: string;
    nombre: string;
    ubi: string;
    userEmail: string;
    conversations: any
}

const ChatList: FC<ChatListProps> = ({ userData, selectUser1 }) => {
    const router = useRouter();
    const [user, setUser] = useState<User>();

    //obtenemos daros de nuestro usuario
    useEffect(() => {
        const fetchDoc = async () => {
            if (userData) {
                const docRef = doc(db, "users", userData);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const myUserData = response.data() as User;
                    setUser(myUserData.id);
                }
            }
        };

        fetchDoc();
    }, [userData]);



    return (
        <div className='my-3 flex flex-1 flex-col'>
            <MessageListComponent selectUser1={selectUser1}/>
             
          </div>
    );
};

export default ChatList;