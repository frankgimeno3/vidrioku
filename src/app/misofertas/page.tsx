"use client"
import { FC, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

type Oferta = {
  titulo: string;
  cargo: string;
};
 
const Misofertas: FC = ({}) => {
  const router = useRouter();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true); // Agregamos un estado para controlar la carga

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  const [misOfertas, setMisOfertas] = useState<Oferta[]>([]);

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else {
      setUserData("Usuario");
    }

    const fetchData = async () => {
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('empresa', '==', userData));
      const querySnapshot = await getDocs(q);

      const offersData: Oferta[] = [];
      querySnapshot.forEach((doc) => {
        offersData.push(doc.data() as Oferta);
      });

      setMisOfertas(offersData);
      setLoading(false); // Indicamos que la carga ha finalizado
    };

    fetchData();
  }, [userData]);

  if (loading) {
    // Mientras se carga, puedes mostrar un indicador de carga o un mensaje de espera
    return <p>Cargando ofertas...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2 className="bg-zinc-800 bg-white bg-opacity-50 font-bold text-lg py-3 text-center">Mis Ofertas</h2>
        <div className="mx-6 bg-white h-full text-zinc-900">
          <div className="p-5">
            {misOfertas.map((oferta, index) => (
              <div key={index}>
                <h3>{oferta.titulo}</h3>
                <p>{oferta.cargo}</p>
                {/* Render other fields as needed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Misofertas;