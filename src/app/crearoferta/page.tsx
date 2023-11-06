"use client"
import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const Crearoferta: FC = ({ }) => {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [cargo, setCargo] = useState('');
  const [tipoJornada, setTipoJornada] = useState('');
  const [tipoLocalizacion, setTipoLocalizacion] = useState('Híbrido');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [habilidadRequerida, setHabilidadRequerida] = useState('');
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState('');
  const [habilidadAEliminar, setHabilidadAEliminar] = useState<number | null>(null);

  const handleHabilidadRequeridaChange = (e: any) => {
    e.preventDefault();
    setHabilidadRequerida(e.target.value);
  };

  const handleInsertarHabilidad = (e: any) => {
    e.preventDefault();
    if (habilidadRequerida.trim() !== '') {
      setHabilidades([...habilidades, habilidadRequerida]);
    }
  };

  const handleEliminarHabilidad = (index: number) => {
    
    setHabilidadAEliminar(index);
  };

  const confirmarEliminarHabilidad = () => {
    if (habilidadAEliminar !== null) {
      const nuevasHabilidades = habilidades.filter((_, index) => index !== habilidadAEliminar);
      setHabilidades(nuevasHabilidades);
      setHabilidadAEliminar(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 text-center px-80">
        <h2 className='py-10'>Crear oferta</h2>
        <form className='flex flex-col mx-72 text-sm '>
          <label>Título de la oferta</label>
          <input
            placeholder='Introduzca título'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className='text-gray-500 text-sm mb-2  rounded-md'
          />
          <label>Cargo ofrecido</label>
          <input
            placeholder='Introduzca cargo'
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className='text-gray-500 text-sm mb-2  rounded-md'
          />
          <label>Tipo de jornada</label>
          <select
            value={tipoJornada}
            onChange={(e) => setTipoJornada(e.target.value)}
            className='text-gray-500 text-sm mb-2 rounded-md'
          >
            <option>Jornada Completa</option>
            <option>Jornada Parcial</option>
          </select>
          <label>Tipo de localización</label>
          <select
            value={tipoLocalizacion}
            onChange={(e) => setTipoLocalizacion(e.target.value)}
            className='text-gray-500 text-sm mb-2  rounded-md'
          >
            <option>Trabajo Híbrido</option>
            <option>Trabajo Remoto</option>
            <option>Trabajo Presencial</option>
          </select>
          {tipoLocalizacion !== 'Remoto' && (
            <>
              <label>Ubicación</label>
              <input
                placeholder='Introduzca ubicación del empleo'
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className='text-gray-500 text-sm mb-2  rounded-md'
              />
            </>)
          }
          <label>Descripción general del empleo</label>
          <textarea
            placeholder='Introduzca descripción del empleo'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className='text-gray-500 text-sm mb-2  rounded-md'
          />
          <label>Experiencia y habilidades requeridas</label>
          <input
            placeholder='Insertar habilidad requerida'
            value={habilidadRequerida}
            onChange={handleHabilidadRequeridaChange}
            className='text-gray-500 text-sm mb-2  rounded-md'
          />
          <button onClick={handleInsertarHabilidad} className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
            Insertar
          </button>
          <ul>
            {habilidades.map((habilidad, index) => (
              <div className='flex flex-row' key={index}>
                <li>{habilidad}</li>
                <button onClick={() => handleEliminarHabilidad(index)} className='ml-2'>X</button>
              </div>
            ))}
          </ul>
          <label>Comentarios adicionales</label>
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className='text-gray-500 text-sm mb-2 rounded-md'
            placeholder='Añada comentarios adicionales aquí'
          />
          <button className='bg-white px-3 py-1 rounded-lg mx-52 text-sm m-2 text-gray-500 text-sm mb-2'>
            Crear oferta
          </button>
        </form>
      </div>
    </>
  );
};

export default Crearoferta;