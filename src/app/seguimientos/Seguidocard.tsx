import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../components/interfaces/interfaces';
import { db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateSeguidos } from '@/redux/features/userSlice';
import Image from 'next/image';

interface SeguidoCardProps {
    id: string;
}

const SeguidoCard: FC<SeguidoCardProps> = ({ id }) => {
    const [followedUserObject, setFollowedUserObject] = useState<any>();
    const router = useRouter();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDoc = async () => {
            if (id) {
                const docRef = doc(db, "users", id);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const myUserData = response.data() as User;
                    setFollowedUserObject(myUserData);
                }
            }
        };
        fetchDoc();
    }, [id]);

    const handleViewProfile = () => {
        router.push(`/perfiles/${id}`);
    };

    const handleUnfollow = async () => {
        if (user?.seguidos) {
            const newSeguidos = user.seguidos.filter((seguidoId: string) => seguidoId !== id);
            const userDocRef = doc(db, "users", user.id);

            try {
                await setDoc(userDocRef, { seguidos: newSeguidos }, { merge: true });
                dispatch(updateSeguidos(newSeguidos));
            } catch (error) {
                console.error("Error al dejar de seguir:", error);
            }
        }
    };

    return (
        <div className="flex flex-row items-center justify-beteen bg-gray-50 rounded-lg shadow-lg py-1 px-5 my-2 w-full">
            <div className='w-40 m-1'>
                <Image src="/icons/empty-user-profile.png"
                    alt={'Cuenta seguida'}
                    width={100}
                    height={100}
                    className="shadow-lg rounded-full    "
                />
            </div>
            <div className='w-full ml-5'>
                {followedUserObject?.userType === "profesional" && (
                    <p >{followedUserObject.nombre} {followedUserObject.apellidos}</p>
                )}
                {followedUserObject?.userType === "empresa" && <p>{followedUserObject.nombre}</p>}
            </div>
            <div className='flex justify-end w-full'>
                <button onClick={handleViewProfile} className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
                >Ver perfil</button>
                <button onClick={handleUnfollow} className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
                >Dejar de seguir</button>
            </div>
        </div>
    );
};

export default SeguidoCard;
