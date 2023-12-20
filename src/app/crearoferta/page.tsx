"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';

import Titulo from './componentes/Titulo';
import Cargo from './componentes/Cargo';
import Jornada from './componentes/Jornada';
import Localizacion from './componentes/Localizacion';
import Ubicacion from './componentes/Ubicacion';
import Descripcion from './componentes/Descripcion';
import Requerimientos from './componentes/Requerimientos';
import Additional from './componentes/Additional';
import Footer from '../components/Footer';
import Banners from '../components/Banners';


const Crearoferta: FC = () => {
  const router = useRouter();

  const [titulo, setTitulo] = useState('')
  const [cargo, setCargo] = useState('');
  const [tipoJornada, setTipoJornada] = useState('Jornada Completa');
  const [tipoLocalizacion, setTipoLocalizacion] = useState('Híbrido');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [habilidadRequerida, setHabilidadRequerida] = useState('');
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState('');
  const [habilidadAEliminar, setHabilidadAEliminar] = useState<number | null>(null);

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  const [userData, setUserData] = useState("")

  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserData(session.data.user.email);
    } else { setUserData("Usuario") }
  }, [session?.data?.user?.email]);



  const handleHabilidadRequeridaChange = (e: any) => {
    setHabilidadRequerida(e.target.value);
  };

  const handleInsertarHabilidad = (event: any) => {
    event.preventDefault();
    if (habilidadRequerida.trim() !== '') {
      setHabilidades([...habilidades, habilidadRequerida]);
      setHabilidadRequerida('');
    }
  };

  const handleEliminarHabilidad = (event: any, index: number) => {
    event.preventDefault();
    const nuevasHabilidades = habilidades.filter((_, i) => i !== index);
    setHabilidades(nuevasHabilidades);
  };

  const addOfferToAuthor = async (userId: string, offerId: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.ofertascreadas && Array.isArray(userData.ofertascreadas)) {
          // Conservar el resto del documento y agregar el nuevo offerId al array existente
          await setDoc(docRef, {
            ...userData,
            ofertascreadas: [...userData.ofertascreadas, offerId],
          });
        } else {
          // Si ofertascreadas no existe o no es un array, crea uno nuevo
          await setDoc(docRef, {
            ...userData,
            ofertascreadas: [offerId],
          });
        }
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al añadir la oferta al autor:', error);
    }
  };

  const addOfferInFirebase = async (event: any) => {
    event.preventDefault();
    if (titulo !== '' && cargo !== '' && tipoJornada !== '' && tipoLocalizacion !== '') {
      try {
        const offersCollection = collection(db, 'ofertas');
        const newOfferRef = await addDoc(offersCollection, {
          id: '',
          titulo: titulo.trim(),
          cargo: cargo.trim(),
          jornada: tipoJornada.trim(),
          tipoubi: tipoLocalizacion.trim(),
          ubicacion: ubicacion.trim(),
          descripcion: descripcion.trim(),
          experiencia: habilidades,
          adicional: comentarios.trim(),
          empresa: userData,
          solcitantes: [],
          publicacion: Timestamp.now(),
          estado: "activa",

        });
        await updateDoc(newOfferRef, { id: newOfferRef.id });

        addOfferToAuthor(userData, newOfferRef.id)
        router.push('/misofertas');
      } catch (error) {
        console.error('Error al crear la oferta en Firestore:', error);
      }
    } else {
      console.log("Campos vacíos");
    }
  };
  return (
    <>
      <Navbar />
      <div className='flex flex-row w-full h-full justify-between bg-white bg-opacity-90'>

        <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 text-center  w-full">
          <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center w-full">Crear oferta</h2>
          <div className='px-80 mt-12'>
            <form className='flex flex-col mx-72 text-sm '>
              <Titulo titulo={titulo} setTitulo={setTitulo} />
              <Cargo cargo={cargo} setCargo={setCargo} />
              <Jornada tipoJornada={tipoJornada} setTipoJornada={setTipoJornada} />
              <Localizacion tipoLocalizacion={tipoLocalizacion} setTipoLocalizacion={setTipoLocalizacion} />

              {tipoLocalizacion !== 'Trabajo Remoto' && (
                <Ubicacion ubicacion={ubicacion} setUbicacion={setUbicacion} />
              )}

              <Descripcion descripcion={descripcion} setDescripcion={setDescripcion} />
              <Requerimientos habilidadRequerida={habilidadRequerida} handleHabilidadRequeridaChange={handleHabilidadRequeridaChange} />

              <button onClick={handleInsertarHabilidad} className="bg-white px-3 py-1 rounded-lg mx-44 text-sm m-2 text-gray-500 text-sm mb-2">
                Insertar requisitos
              </button>

              <ul className="mx-12 mb-2">
                {habilidades.map((habilidad, index) => (
                  <div className="flex flex-row w-full bg-gray-100 text-gray-700 rounded-lg my-1 shadow-lg " key={index}>
                    <li className="flex-1 my-auto">{habilidad}</li>
                    <div className="shadow">
                      <button onClick={() => handleEliminarHabilidad(event, index)} className="m-2 px-2 bg-gray-300 rounded-lg py-0.5 shadow-lg">x</button>
                    </div>
                  </div>
                ))}
              </ul>
              <Additional comentarios={comentarios} setComentarios={setComentarios} />

              <button onClick={addOfferInFirebase} className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
                Crear oferta
              </button>
            </form>
          </div>
        </div>

        <div className='h-full bg-white bg-opacity-5'>
          <Banners widthProp={250} />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Crearoferta;



