import React, { FC, useState, useEffect } from 'react';
import PublicationCard from './PublicationCard';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface PublicacionesProps {}

const Publicaciones: FC<PublicacionesProps> = () => {
  const user = useSelector(selectUser);

  const [publicacionesArray, setPublicacionesArray] = useState<any[]>([]);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState<string[]>([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setUsuariosSeguidos(user?.seguidos || []);

      const fetchPublicaciones = async () => {
        const q = query(collection(db, 'publicaciones'));
        const querySnapshot = await getDocs(q);
        const fetchedPublicaciones: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPublicaciones.push(doc.data());
        });
        setPublicacionesArray(fetchedPublicaciones);
      };

      fetchPublicaciones();
    }
  }, [user]);

  useEffect(() => {
     if (publicacionesArray.length > 0 && usuariosSeguidos.length > 0) {
      const filteredPublicaciones = publicacionesArray.filter(publicacion =>
        usuariosSeguidos.includes(publicacion.autor)
      );
      setPublicacionesFiltradas(filteredPublicaciones);
    } else {
      setPublicacionesFiltradas([]);
    }
  }, [publicacionesArray, usuariosSeguidos]);

  return (
    <div className='p-5'>
      {publicacionesFiltradas.length >= 1 ? (
        publicacionesFiltradas.map((publicacion, index) => (
          <PublicationCard key={index} publicacion={publicacion} />
        ))
      ) : (
        <p className='text-sm py-12'>No se encontraron publicaciones recientes de las cuentas que sigues</p>
      )}
    </div>
  );
};

export default Publicaciones;
