import { FC } from 'react';

const SearchTrabajadores: FC = () => {
  return (
    <div className="flex flex-row justify-center items-center py-2 px-2 ">
      <input
        type="text"
        placeholder="Busque aquí por criterios específicos"
        className="border border-gray-200 text-gray-500 ml-2 px-4 py-2 text-xs rounded m-1 w-full"
      />
      <button
        className="bg-white shadow border text-gray-500 border-gray-200 rounded px-4 py-2 text-xs m-1"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchTrabajadores;