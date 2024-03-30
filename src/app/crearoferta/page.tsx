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
import Fase1 from './fases/fase1';
import Fase2 from './fases/fase2';
import Fase3 from './fases/fase3';


const Crearoferta: FC = () => {
  const router = useRouter();
  const [faseActual, setFaseActual] = useState(1)

  const [titulo, setTitulo] = useState('')
  const [cargo, setCargo] = useState('');
  const [tipoJornada, setTipoJornada] = useState('Jornada Completa');
  const [tipoLocalizacion, setTipoLocalizacion] = useState('Híbrido');
  const [ubicacion, setUbicacion] = useState('');
  const [pais, setPais] = useState<string>();
  const [descripcion, setDescripcion] = useState('');
  const [habilidadRequerida, setHabilidadRequerida] = useState('');
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState('');
  const [departamentos, setDepartamentos] = useState<any>([]);
  const [posiciones, setPosiciones] = useState<any>([]);
  const [otraPosicion, setOtraPosicion] = useState<string>('');

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
          await setDoc(docRef, {
            ...userData,
            ofertascreadas: [...userData.ofertascreadas, offerId],
          });
        } else {
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
          pais: pais,
          descripcion: descripcion.trim(),
          experiencia: habilidades,
          adicional: comentarios.trim(),
          departamentos: departamentos,
          posiciones: posiciones,
          otraPosicion: otraPosicion,
          empresa: userData,
          solcitantes: [],
          publicacion: Timestamp.now(),
          estado: "activa",


          habilidadRequerida





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
      <div className='flex flex-row w-full   justify-between bg-white bg-opacity-90'>

        <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 text-center w-full">
          <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center w-full">Crear oferta</h2>
          <div className='mx-24 mt-12 '>
            <p className='text-xl'>Introduzca datos en los campos requeridos para crear una oferta</p>
            <p className=' mt-12'>Parte <span>{faseActual}</span>/3</p>
            <form className='flex flex-col px-56 text-sm  text-md w-full my-1 mb-5'>
              {
                faseActual == 1 &&
                <Fase1 setFaseActual={setFaseActual} titulo={titulo} setTitulo={setTitulo} cargo={cargo} setCargo={setCargo} descripcion={descripcion} setDescripcion={setDescripcion} />
              }
              {
                faseActual == 2 &&
                <Fase2 setFaseActual={setFaseActual} tipoJornada={tipoJornada}
                  setTipoJornada={setTipoJornada}
                  tipoLocalizacion={tipoLocalizacion}
                  setTipoLocalizacion={setTipoLocalizacion}
                  ubicacion={ubicacion}
                  setUbicacion={setUbicacion}
                  pais={pais}
                  setPais={setPais}
                  departamentos={departamentos}
                  setDepartamentos={setDepartamentos}
                  posiciones={posiciones}
                  setPosiciones={setPosiciones}
                  otraPosicion={otraPosicion}
                  setOtraPosicion={setOtraPosicion}
                />
              }
              {
                faseActual == 3 &&
                <Fase3 addOfferInFirebase={addOfferInFirebase} handleEliminarHabilidad={handleEliminarHabilidad} habilidadRequerida={habilidadRequerida}
                  handleHabilidadRequeridaChange={handleHabilidadRequeridaChange} handleInsertarHabilidad={handleInsertarHabilidad}
                  comentarios={comentarios} setComentarios={setComentarios} habilidades={habilidades} />
              }
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



