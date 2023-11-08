import React from 'react';
interface TituloProps {
    ubicacion: string;
    setUbicacion: (value: string) => void;
  }
  
  const Ubicacion: React.FC<TituloProps> = ({ ubicacion, setUbicacion }) => {
  return (
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
  );
};

export default Ubicacion;