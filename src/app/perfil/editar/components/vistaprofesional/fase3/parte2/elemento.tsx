// import { db } from '@/app/firebase';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import React, { FC, useEffect, useState } from 'react';

// interface ElementoProps {
//   estudiosRelacionados: string;
//   detallesExperiencia: string;
//   nombrePosicion: string;
// }

// const Elemento: FC<ElementoProps> = ({ estudiosRelacionados, detallesExperiencia, nombrePosicion }) => {
//   const [estudiosRelacionadosState, setEstudiosRelacionadosState] = useState(estudiosRelacionados);
//   const [detallesExperienciaState, setDetallesExperienciaState] = useState(detallesExperiencia);

//   const handleEstudiosRelacionadosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEstudiosRelacionadosState(event.target.value);
//   };

//   const handleDetallesExperienciaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDetallesExperienciaState(event.target.value);
//   };

//   useEffect(() => {
//   }, [estudiosRelacionadosState, detallesExperienciaState]);

//   return (
//     <div className='flex flex-col'>
//       <label htmlFor='estudiosRelacionados'>Estudios relacionados:</label>
//       <input
//         type='text'
//         id='estudiosRelacionados'
//         value={estudiosRelacionadosState}
//         onChange={handleEstudiosRelacionadosChange}
//       />
//       <label htmlFor='detallesExperiencia'>Detalles de la experiencia (opcional):</label>
//       <textarea
//         id='detallesExperiencia'
//         placeholder='Detalle aquí su cargo específico, la duración del empleo, personas a cargo, tareas realizadas, principales logros, y todo aquello que considere compartir'
//         value={detallesExperienciaState}
//         onChange={handleDetallesExperienciaChange}
//       />
//     </div>
//   );
// };

// export default Elemento;
