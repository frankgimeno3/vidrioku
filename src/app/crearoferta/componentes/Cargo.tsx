import React from 'react';
interface TituloProps {
    cargo: string;
    setCargo: (value: string) => void;
  }
  
  const Cargo: React.FC<TituloProps> = ({ cargo, setCargo }) => {
  return (
    <>
    <label className='my-1'  htmlFor="cargo">Cargo ofrecido</label>
    <input
      type="text"
      id="cargo"
      name="cargo"
      placeholder="Introduzca el nombre del cargo que ocupará el aspirante"
      value={cargo}
      onChange={(e) => setCargo(e.target.value)}
      className="text-gray-500 text-sm mb-2 rounded-md"
      required  
    />
    </>
  );
};

export default Cargo;