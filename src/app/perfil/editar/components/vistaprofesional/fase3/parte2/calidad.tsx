import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ExperienciaItem {
  posicion: string;
  estudios: string;
  detalles: string;
}

interface CalidadProps {
  user: any;
  cambioComponenteMostrar: any;
}

interface User {
  posicionesMap: any
}

const Calidad: FC<CalidadProps> = ({ user, cambioComponenteMostrar }) => {

  const [tecnicoControlCalidad, setTecnicoControlCalidad] = useState(false);
  const [estudiosTecnicoControlCalidad, setEstudiosTecnicoControlCalidad] = useState('');
  const [detallesTecnicoControlCalidad, setDetallesTecnicoControlCalidad] = useState('');

  const [analisisStockMuestreo, setAnalisisStockMuestreo] = useState(false);
  const [estudiosAnalisisStockMuestreo, setEstudiosAnalisisStockMuestreo] = useState('');
  const [detallesAnalisisStockMuestreo, setDetallesAnalisisStockMuestreo] = useState('');

  const [informesDocumentacionCalidad, setInformesDocumentacionCalidad] = useState(false);
  const [estudiosInformesDocumentacionCalidad, setEstudiosInformesDocumentacionCalidad] = useState('');
  const [detallesInformesDocumentacionCalidad, setDetallesInformesDocumentacionCalidad] = useState('');

  
  const [arrayPosicionesCalidad, setArrayPosicionesCalidad] = useState<string[]>([]);
  const [detallePosicionesCalidad, setDetallePosicionesCalidad] = useState<ExperienciaItem[]>([]);
  const [arrayPosicionesEliminar, setArrayPosicionesEliminar] = useState<string[]>([])


  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
   }, [user]);


  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('tecnicoControlCalidad')) {
        setTecnicoControlCalidad(true);
        let tecnicoControlCalidadDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'tecnicoControlCalidad');
        if (tecnicoControlCalidadDetails) {
          setEstudiosTecnicoControlCalidad(tecnicoControlCalidadDetails.estudios);
          setDetallesTecnicoControlCalidad(tecnicoControlCalidadDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('analisisStockMuestreo')) {
        setAnalisisStockMuestreo(true);
        let analisisStockMuestreoDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'analisisStockMuestreo');
        if (analisisStockMuestreoDetails) {
          setEstudiosAnalisisStockMuestreo(analisisStockMuestreoDetails.estudios);
          setDetallesAnalisisStockMuestreo(analisisStockMuestreoDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('informesDocumentacionCalidad')) {
        setInformesDocumentacionCalidad(true);
        let informesDocumentacionCalidadDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'informesDocumentacionCalidad');
        if (informesDocumentacionCalidadDetails) {
          setEstudiosInformesDocumentacionCalidad(informesDocumentacionCalidadDetails.estudios);
          setDetallesInformesDocumentacionCalidad(informesDocumentacionCalidadDetails.detalles);
        }
      }

    }
  }, [receivedUser]);

  const handleExperienceToggle = (estado: boolean, estadoToString: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    let arrayPrevioPosicionesEliminar = []
    if (estado) {
      arrayPrevioPosicionesEliminar.push(estadoToString);
      setter(!estado);
    } else {
      const index = arrayPosicionesEliminar.indexOf(estadoToString);
      if (index !== -1) {
        arrayPosicionesEliminar.splice(index, 1);
      }
      setter(!estado);
    }
    setArrayPosicionesEliminar(arrayPrevioPosicionesEliminar)
   }

  useEffect(() => {
    const actualizarPosicionesCalidad = () => {
      const posicionesCalidadArrayOperativo = [];
      const detallePosicionesCalidadArrayOperativo = [];
      if (tecnicoControlCalidad) {
        posicionesCalidadArrayOperativo.push('tecnicoControlCalidad');
        detallePosicionesCalidadArrayOperativo.push({
          posicion: 'tecnicoControlCalidad',
          estudios: estudiosTecnicoControlCalidad,
          detalles: detallesTecnicoControlCalidad
        })
      }
      if (analisisStockMuestreo) {
        posicionesCalidadArrayOperativo.push('analisisStockMuestreo');
        detallePosicionesCalidadArrayOperativo.push({
          posicion: 'analisisStockMuestreo',
          estudios: estudiosAnalisisStockMuestreo,
          detalles: detallesAnalisisStockMuestreo
        })
      }
      if (informesDocumentacionCalidad) {
        posicionesCalidadArrayOperativo.push('informesDocumentacionCalidad');
        detallePosicionesCalidadArrayOperativo.push({
          posicion: 'informesDocumentacionCalidad',
          estudios: estudiosInformesDocumentacionCalidad,
          detalles: detallesInformesDocumentacionCalidad
        })
      }

      setArrayPosicionesCalidad(posicionesCalidadArrayOperativo);
      setDetallePosicionesCalidad(detallePosicionesCalidadArrayOperativo)
    }

    actualizarPosicionesCalidad();
  }, [tecnicoControlCalidad,  estudiosTecnicoControlCalidad,  detallesTecnicoControlCalidad,
    analisisStockMuestreo,  estudiosAnalisisStockMuestreo,  detallesAnalisisStockMuestreo,
    informesDocumentacionCalidad,  estudiosInformesDocumentacionCalidad,  detallesInformesDocumentacionCalidad]
  );


  const ActualizarPosicionesCalidad = async () => {
     
    try {
      const docRef = doc(db, "users", receivedUser.id);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;

        let arrayPosicionesToUpdate = userData.posicionesMap?.arrayPosiciones || [];
        let detallePosicionesToUpdate = userData.posicionesMap?.detallePosicionesArray || [];

        if (arrayPosicionesEliminar.length !== 0) {
           for (const item of arrayPosicionesToUpdate) {
            if (arrayPosicionesEliminar.includes(item)) {
              const index = arrayPosicionesToUpdate.indexOf(item);
              if (index !== -1) {
                arrayPosicionesToUpdate.splice(index, 1);
              }
              detallePosicionesToUpdate = detallePosicionesToUpdate.filter((obj: { posicion: any; }) => obj.posicion !== item);
            }
          }
        }

        if (arrayPosicionesCalidad.length !== 0) {
          for (const item of arrayPosicionesCalidad) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesCalidad.length !== 0) {
          for (const newItem of detallePosicionesCalidad) {
            const index = detallePosicionesToUpdate.findIndex((existingItem: { posicion: string; }) => existingItem.posicion === newItem.posicion);
            if (index !== -1) {
              detallePosicionesToUpdate[index] = newItem;
            } else {
              detallePosicionesToUpdate.push(newItem);
            }
          }
        }

        const newData: Partial<User> = {
          posicionesMap: {
            ...userData.posicionesMap,
            arrayPosiciones: arrayPosicionesToUpdate,
            detallePosicionesArray: detallePosicionesToUpdate
          }
        };

        await updateDoc(docRef, newData);
      } else {
        console.error('El documento del usuario no existe');
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
    }
  };

  const handleGuardarYseguir = () => {
    ActualizarPosicionesCalidad()
    cambioComponenteMostrar('calidad');
  };
  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'> Departamento de control de calidad</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>
        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(tecnicoControlCalidad, 'tecnicoControlCalidad', setTecnicoControlCalidad)} />
              <p className='ml-2'> Técnico en control de calidad</p>
            </label>
            {tecnicoControlCalidad &&
              <div className='flex flex-col'>
                <textarea 
                  placeholder="Estudios relacionados"
                  value={estudiosTecnicoControlCalidad}
                  onChange={(e) => setEstudiosTecnicoControlCalidad(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                  </textarea>

                  <textarea 
                  placeholder="Detalles de la experiencia"
                  value={detallesTecnicoControlCalidad}
                  onChange={(e) => setDetallesTecnicoControlCalidad(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                    </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-top'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(analisisStockMuestreo, 'analisisStockMuestreo', setAnalisisStockMuestreo)}
                className='my-1' />
              <p className='ml-2 text-left'>Análisis de stock y/o aprovisionamientos, muestreo</p>
            </label>
            {analisisStockMuestreo && <div className='flex flex-col'>
              <textarea
                placeholder="Estudios relacionados"
                value={estudiosAnalisisStockMuestreo}
                onChange={(e) => setEstudiosAnalisisStockMuestreo(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              <textarea placeholder="Estudios relacionados"
                value={detallesAnalisisStockMuestreo}
                onChange={(e) => setDetallesAnalisisStockMuestreo(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(informesDocumentacionCalidad, 'informesDocumentacionCalidad', setInformesDocumentacionCalidad)} />
              <p className='ml-2'>Creación de informes de calidad, documentación</p>
            </label>
            {informesDocumentacionCalidad && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosInformesDocumentacionCalidad}
                onChange={(e) => setEstudiosInformesDocumentacionCalidad(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesInformesDocumentacionCalidad}
                onChange={(e) => setDetallesInformesDocumentacionCalidad(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

        </div>



        <button type="submit" onClick={() => { handleGuardarYseguir() }} className='w-56 mx-auto py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'>
          Guardar y seguir
        </button>

      </div>
    </div>
  );
};

export default Calidad;
