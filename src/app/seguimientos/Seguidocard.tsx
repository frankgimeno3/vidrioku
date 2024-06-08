import { doc, getDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { User } from '../components/interfaces/interfaces';
import { db } from '../firebase';

interface SeguidoCardProps {
    id: string;
}

const SeguidoCard: FC<SeguidoCardProps> = ({ id }) => {
    const [followedUserObject, setFollowedUserObject] = useState<any>()

    useEffect(() => {
        const fetchDoc = async () => {
            if (id) {
                const docRef = doc(db, "users", id);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const myUserData = response.data() as User;
                    setFollowedUserObject(myUserData.userType);
                }
            }
        };
        fetchDoc();
    }, [id]);


    return (
        <div className=' flex flex-row bg-white rounded-lg shadow-lg p-5 '>
            {followedUserObject.usertype == "profesional" &&
                <> <p>{followedUserObject.nombre}</p>
                    <p>{followedUserObject.apellidos}</p> </>}
            {followedUserObject.usertype == "empresa" &&
                <> <p>{followedUserObject.nombre}</p></>}
            <button> Ver perfil</button>
            <button> Dejar de seguir</button>
        </div>
    );
};

export default SeguidoCard;