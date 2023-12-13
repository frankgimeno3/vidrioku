import React, { FC, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

interface CambiarNombreProps {
  setIsCambiarNombreOpen: (isOpen: boolean) => void;
  id: any;
}

const CambiarNombre: FC<CambiarNombreProps> = ({ setIsCambiarNombreOpen, id }) => {
  const [idname, setidname] = useState<any>()
  const [newname, setNewName] = useState('');

useEffect(()=>{
   setidname(id)
}, [id])

  const handlenamechange = async (nuevonombre: string) => {
    if (!nuevonombre.trim()) {
      console.error('El nombre no puede estar vacío.');
      return;
    }

    try {
      const docRef = doc(db, "anuncios", idname);
      const anuncioDoc = await getDoc(docRef);

      if (anuncioDoc.exists()) {
        await setDoc(docRef, { nombre: nuevonombre }, { merge: true });
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre:', error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handlenamechange(newname);
  };

  return (
    <div className='absolute border border-gray-100 inset-0 flex justify-between top-5 inset-x-0 right-0 flex-row bg-white rounded-lg shadow-xl p-12 z-0 m-36 mx-72'>
      <div className='flex flex-col justify-center text-center text-gray-500 ml-56 '>
        <p className='font-bold text-lg ml-12'>Cambiar nombre del banner</p>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input 
            type='text' 
            value={newname}
            onChange={(e) => setNewName(e.target.value)}
            className='bg-white hover:bg-gray-50 text-gray-500 p-2 mt-5 rounded-lg shadow-xl border border-gray-50'
          />
          <button type="submit" className='bg-white hover:bg-gray-50 text-gray-500 p-2 mt-5 rounded-lg shadow-xl border border-gray-50'>
            Confirmar y sustituir
          </button>
        </form>
      </div>
      <div onClick={() => setIsCambiarNombreOpen(false)} className='flex flex-row justify-end'>
        <svg 
          className="w-8 h-8 text-gray-500 hover:text-gray-400" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
  );
}

export default CambiarNombre;