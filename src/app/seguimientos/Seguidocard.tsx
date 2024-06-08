import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../components/interfaces/interfaces';
import { db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateSeguidos } from '@/redux/features/userSlice';

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
    <div className="flex flex-row bg-white rounded-lg shadow-lg p-5">
      {followedUserObject?.userType === "profesional" && (
        <>
          <p>{followedUserObject.nombre}</p>
          <p>{followedUserObject.apellidos}</p>
        </>
      )}
      {followedUserObject?.userType === "empresa" && <p>{followedUserObject.nombre}</p>}
      <button onClick={handleViewProfile}>Ver perfil</button>
      <button onClick={handleUnfollow}>Dejar de seguir</button>
    </div>
  );
};

export default SeguidoCard;
