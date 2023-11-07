"use client"
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';

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

  const addOfferInFirebase = async (event: any) => {
    event.preventDefault();
    if (titulo !== '' && cargo !== '' && tipoJornada !== '' && tipoLocalizacion !== '') {
      try {
        const offersCollection = collection(db, 'ofertas');
        const newOfferRef = await addDoc(offersCollection, {
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
        });

        // Redirect to the desired page after creating the offer
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
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 text-center px-80">
        <h2 className='py-10'>Crear oferta</h2>
        <form className='flex flex-col mx-72 text-sm '>
          <label htmlFor="titulo">Título de la oferta</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Introduzca título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
          />

          <label htmlFor="cargo">Cargo ofrecido</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            placeholder="Introduzca cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
          />

          <label htmlFor="tipoJornada">Tipo de jornada</label>
          <select
            id="tipoJornada"
            name="tipoJornada"
            value={tipoJornada}
            onChange={(e) => setTipoJornada(e.target.value)}  
            className="text-gray-500 text-sm mb-2 rounded-md"
          >
            <option>Jornada Completa</option>
            <option>Jornada Parcial</option>
          </select>

          <label htmlFor="tipoLocalizacion">Tipo de localización</label>
          <select
            id="tipoLocalizacion"
            name="tipoLocalizacion"
            value={tipoLocalizacion}
            onChange={(e) => setTipoLocalizacion(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
          >
            <option>Trabajo Híbrido</option>
            <option>Trabajo Remoto</option>
            <option>Trabajo Presencial</option>
          </select>

          {tipoLocalizacion !== 'Remoto' && (
            <>
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                placeholder="Introduzca ubicación del empleo"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="text-gray-500 text-sm mb-2 rounded-md"
              />
            </>
          )}

          <label htmlFor="descripcion">Descripción general del empleo</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Introduzca descripción del empleo"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
          />

          <label htmlFor="habilidadRequerida">Experiencia y habilidades requeridas</label>
          <input
            type="text"
            id="habilidadRequerida"
            name="habilidadRequerida"
            placeholder="Insertar habilidad requerida"
            value={habilidadRequerida}
            onChange={handleHabilidadRequeridaChange}
            className="text-gray-500 text-sm mb-2 rounded-md"
          />

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

          <label htmlFor="comentarios">Comentarios adicionales</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
            placeholder="Añada comentarios adicionales aquí"
          />
          <button onClick={addOfferInFirebase} className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
            Crear oferta
          </button>
        </form>
      </div>
    </>
  );
};

export default Crearoferta;



