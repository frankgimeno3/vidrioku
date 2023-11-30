
import React, { FC, useEffect, useState } from 'react';


const InputForm: FC = ({ }) => {

   
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
   
    };
  
    return (
      <div>
        <form className="flex flex-row mx-6 py-2 bg-white bg-opacity-10 text-zinc-100 rounded-lg my-1 justify-between mb-5">
          <input
            className="text-gray-300 py-3 pl-5 px-5 text-sm bg-transparent rounded-lg w-full mx-4 placeholder-gray-300"
            placeholder="Inserte su texto aquí"
            id="inputData"
            name="inputData"
            required
           />
          <button
            className="text-gray-300 px-2 mx-2 mr-4 text-sm bg-white bg-opacity-10 rounded-lg text-xs"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </form>
      </div>
    );
  };
  
  export default InputForm;