import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const Crearoferta: FC = ({ }) => {
  const router = useRouter();

  // Estados para los campos del formulario
  const [titulo, setTitulo] = useState('');
  const [cargo, setCargo] = useState('');
  const [tipoJornada, setTipoJornada] = useState('');
  const [tipoLocalizacion, setTipoLocalizacion] = useState('Híbrido');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [habilidadRequerida, setHabilidadRequerida] = useState('');
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState('');

  const handleHabilidadRequeridaChange = (event: any) => {
    setHabilidadRequerida(event.target.value);
  };

  const handleInsertarHabilidad = () => {
    if (habilidadRequerida.trim() !== '') {
      setHabilidades([...habilidades, habilidadRequerida]);
      setHabilidadRequerida('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
        <h2>Crear oferta</h2>
        <form>
          <label>Título de la oferta</label>
          <input
            placeholder='Introduzca título'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label>Cargo ofrecido</label>
          <input
            placeholder='Introduzca cargo'
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />

          <label>Tipo de jornada</label>
          <select
            value={tipoJornada}
            onChange={(e) => setTipoJornada(e.target.value)}
          >
            <option>Completa</option>
            <option>Parcial</option>
          </select>

          <label>Tipo de localización</label>
          <select
            value={tipoLocalizacion}
            onChange={(e) => setTipoLocalizacion(e.target.value)}
          >
            <option>Híbrido</option>
            <option>Remoto</option>
            <option>Presencial</option>
          </select>

          {tipoLocalizacion !== 'Remoto' && (
            <label>Ubicación</label>
          )}

          <label>Descripción general del empleo</label>
          <textarea
            placeholder='Introduzca descripción del empleo'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <label>Experiencia y habilidades requeridas</label>
          <input
            placeholder='insertar habilidad requerida'
            value={habilidadRequerida}
            onChange={handleHabilidadRequeridaChange}
          />
          <button onClick={handleInsertarHabilidad}>Insertar</button>
          <ul>
            {habilidades.map((habilidad, index) => (
              <li key={index}>{habilidad}</li>
            ))}
          </ul>

          <label>Comentarios adicionales</label>
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default Crearoferta;