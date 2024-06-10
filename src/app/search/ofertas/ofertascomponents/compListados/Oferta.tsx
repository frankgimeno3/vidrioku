import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface OfertaProps {
  id: any,
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: string,
  adicional: string,
  empresaNombre: string,
  empresa: string,
  estado: string,
}

const Oferta: FC<OfertaProps> = ({  titulo, cargo,  ubicacion, empresa, empresaNombre }) => {
  const [userImage, setUserImage] = useState<string | undefined>();
  const [nombreEmpresa, setNombreEmpresa] = useState<any>('')

  useEffect(() => {
    obtainData(empresaNombre);
}, [empresaNombre]);

  const obtainData = async (userId: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setNombreEmpresa(empresaNombre)

      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al buscar empresa por id:', error);
    }
  };


  return (
    <div className="flex flex-row justify-left items-center p-5 bg-gray-50 hover:bg-gray-100 shadow-lg mb-1 text-gray-600">
      {userImage ? (
        <Image
          src={userImage}
          alt="profilepicture"
          height={75}
          width={75}
          className="objectFit:cover"
        />
      ) : (
        <Image
          src="/icons/empresas.png"
          alt="profilepicture"
          height={75}
          width={75}
          className="objectFit:cover"
        />
      )}
      <div className="justify-left pl-5 w-full">
        <h2>{titulo}</h2>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col text-sm text-gray-500">
            <p>{empresaNombre}</p>
            <p>{ubicacion}</p>
          </div>
          <div className="flex flex-row">
            <button>{cargo}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oferta;
