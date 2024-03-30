import React from 'react';
interface TituloProps {
  ubicacion: string;
  setUbicacion: (value: string) => void;
  pais: any;
  setPais: any;
}

const Ubicacion: React.FC<TituloProps> = ({ ubicacion, setUbicacion, pais, setPais }) => {
  const handlePaisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPais(e.target.value);
  };

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
      <label htmlFor="pais">País</label>
      <select
        id="pais"
        name="pais"
        value={pais}
        onChange={handlePaisChange}
        className="text-gray-500 text-sm mb-2 rounded-md"
      >
        <option value="">Seleccione un país</option>
        <option value="Pais - Andorra">Andorra</option>
        <option value="Pais - Argentina">Argentina</option>
        <option value="Pais - Bolivia">Bolivia</option>
        <option value="Pais - Brasil">Brasil</option>
        <option value="Pais - Chile">Chile</option>
        <option value="Pais - Colombia">Colombia</option>
        <option value="Pais - Costa Rica">Costa Rica</option>
        <option value="Pais - Cuba">Cuba</option>
        <option value="Pais - Ecuador">Ecuador</option>
        <option value="Pais - El Salvador">El Salvador</option>
        <option value="Pais - España">España</option>
        <option value="Pais - Florida">Florida</option>
        <option value="Pais - Guatemala">Guatemala</option>
        <option value="Pais - Honduras">Honduras</option>
        <option value="Pais - México">México</option>
        <option value="Pais - Nicaragua">Nicaragua</option>
        <option value="Pais - Panamá">Panamá</option>
        <option value="Pais - Paraguay">Paraguay</option>
        <option value="Pais - Perú">Perú</option>
        <option value="Pais - Portugal">Portugal</option>
        <option value="Pais - Puerto Rico">Puerto Rico</option>
        <option value="Pais - República Dominicana">República Dominicana</option>
        <option value="Pais - Uruguay">Uruguay</option>
        <option value="Pais - Venezuela">Venezuela</option>
      </select>
    </>
  );
};

export default Ubicacion;