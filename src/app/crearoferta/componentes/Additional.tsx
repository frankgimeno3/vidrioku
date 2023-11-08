import React from 'react';
interface TituloProps {
  comentarios: string;
  setComentarios: (value: string) => void;
  }
  
  const Additional: React.FC<TituloProps> = ({ comentarios, setComentarios }) => {
  return (
    <>
        <label htmlFor="comentarios">Comentarios adicionales</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className="text-gray-500 text-sm mb-2 rounded-md"
            placeholder="Añada comentarios adicionales aquí"
          />
    </>
  );
};

export default Additional;