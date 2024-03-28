import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface OfertaProps {
  receivedParamsTratado:any;
  setrenderoferta:any;
  ofertasArray:any;
}

// ESTO LO HE pasadO A PELO
// id={oferta.id}
// titulo={oferta.titulo}
// cargo={oferta.cargo}
// jornada={oferta.jornada}
// tipoubi={oferta.tipoubi}
// ubicacion={oferta.ubicacion}
// descripcion={oferta.descripcion}
// experiencia={oferta.experiencia}
// adicional={oferta.adicional}
// empresa={oferta.empresa}
// estado={oferta.estado}


const OfertasList: FC<OfertaProps> = ({ receivedParamsTratado, setrenderoferta, ofertasArray }) => {
  const [userImage, setUserImage] = useState<string | undefined>();

  useEffect(() => {
    const fetchDoc = async () => {
      if (empresa) {
        const docRef = doc(db, "users", empresa);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const empresaData = response.data() as any;
          setUserImage(empresaData.profilepicture);
        }
      }
    };

    fetchDoc();
  }, [empresa]);

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
            <p>{empresa}</p>
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

export default OfertasList;
