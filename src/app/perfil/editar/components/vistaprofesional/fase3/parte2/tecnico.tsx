import { User } from '@/app/components/interfaces/interfaces';
import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ExperienciaItem {
  posicion: string;
  estudios: string;
  detalles: string;
}

interface TecnicoProps {
  user: any;
  cambioComponenteMostrar: any;
}
 

const Tecnico: FC<TecnicoProps> = ({ user, cambioComponenteMostrar }) => {
 
  const [consultoriaDireccionTecnica, setConsultoriaDireccionTecnica] = useState(false);
  const [estudiosConsultoriaDireccionTecnica, setEstudiosConsultoriaDireccionTecnica] = useState('');
  const [detallesConsultoriaDireccionTecnica, setDetallesConsultoriaDireccionTecnica] = useState('');

  const [arquitecturaTecnica, setArquitecturaTecnica] = useState(false);
  const [estudiosArquitecturaTecnica, setEstudiosArquitecturaTecnica] = useState('');
  const [detallesArquitecturaTecnica, setDetallesArquitecturaTecnica] = useState('');

  const [analisisDocumentacionTecnica, setAnalisisDocumentacionTecnica] = useState(false);
  const [estudiosAnalisisDocumentacionTecnica, setEstudiosAnalisisDocumentacionTecnica] = useState('');
  const [detallesAnalisisDocumentacionTecnica, setDetallesAnalisisDocumentacionTecnica] = useState('');

  const [mejoraContinua, setMejoraContinua] = useState(false);
  const [estudiosMejoraContinua, setEstudiosMejoraContinua] = useState('');
  const [detallesMejoraContinua, setDetallesMejoraContinua] = useState(''); 

  const [ingenierias, setIngenierias] = useState(false);
  const [estudiosIngenierias, setEstudiosIngenierias] = useState('');
  const [detallesIngenierias, setDetallesIngenierias] = useState('');

  const [arrayPosicionesTecnico, setArrayPosicionesTecnico] = useState<string[]>([]);
  const [detallePosicionesTecnico, setDetallePosicionesTecnico] = useState<ExperienciaItem[]>([]);
  const [arrayPosicionesEliminar, setArrayPosicionesEliminar] = useState<string[]>([])


  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
   }, [user]);


  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('consultoriaDireccionTecnica')) {
        setConsultoriaDireccionTecnica(true);
        let consultoriaDireccionTecnicaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'consultoriaDireccionTecnica');
        if (consultoriaDireccionTecnicaDetails) {
          setEstudiosConsultoriaDireccionTecnica(consultoriaDireccionTecnicaDetails.estudios);
          setDetallesConsultoriaDireccionTecnica(consultoriaDireccionTecnicaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('arquitecturaTecnica')) {
        setArquitecturaTecnica(true);
        let arquitecturaTecnicaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'arquitecturaTecnica');
        if (arquitecturaTecnicaDetails) {
          setEstudiosArquitecturaTecnica(arquitecturaTecnicaDetails.estudios);
          setDetallesArquitecturaTecnica(arquitecturaTecnicaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('analisisDocumentacionTecnica')) {
        setAnalisisDocumentacionTecnica(true);
        let analisisDocumentacionTecnicaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'analisisDocumentacionTecnica');
        if (analisisDocumentacionTecnicaDetails) {
          setAnalisisDocumentacionTecnica(analisisDocumentacionTecnicaDetails.estudios);
          setAnalisisDocumentacionTecnica(analisisDocumentacionTecnicaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('mejoraContinua')) {
        setMejoraContinua(true);
        let mejoraContinuaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'mejoraContinua');
        if (mejoraContinuaDetails) {
          setEstudiosMejoraContinua(mejoraContinuaDetails.estudios);
          setDetallesMejoraContinua(mejoraContinuaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('ingenierias')) {
        setIngenierias(true);
        let ingenieriasDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'ingenierias');
        if (ingenieriasDetails) {
          setEstudiosIngenierias(ingenieriasDetails.estudios);
          setDetallesIngenierias(ingenieriasDetails.detalles);
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
    const actualizarPosicionesTecnico = () => {
      const posicionesTecnicoArrayOperativo = [];
      const detallePosicionesTecnicoArrayOperativo = [];
      if (consultoriaDireccionTecnica) {
        posicionesTecnicoArrayOperativo.push('consultoriaDireccionTecnica');
        detallePosicionesTecnicoArrayOperativo.push({
          posicion: 'consultoriaDireccionTecnica',
          estudios: estudiosConsultoriaDireccionTecnica,
          detalles: detallesConsultoriaDireccionTecnica
        })
      }
      if (arquitecturaTecnica) {
        posicionesTecnicoArrayOperativo.push('arquitecturaTecnica');
        detallePosicionesTecnicoArrayOperativo.push({
          posicion: 'arquitecturaTecnica',
          estudios: estudiosArquitecturaTecnica,
          detalles: detallesArquitecturaTecnica
        })
      }
      if (analisisDocumentacionTecnica) {
        posicionesTecnicoArrayOperativo.push('analisisDocumentacionTecnica');
        detallePosicionesTecnicoArrayOperativo.push({
          posicion: 'analisisDocumentacionTecnica',
          estudios: estudiosAnalisisDocumentacionTecnica,
          detalles: detallesAnalisisDocumentacionTecnica
        })
      }
      if (mejoraContinua) {
        posicionesTecnicoArrayOperativo.push('mejoraContinua');
        detallePosicionesTecnicoArrayOperativo.push({
          posicion: 'mejoraContinua',
          estudios: estudiosMejoraContinua,
          detalles: detallesMejoraContinua
        })
      }
      if (ingenierias) {
        posicionesTecnicoArrayOperativo.push('ingenierias');
        detallePosicionesTecnicoArrayOperativo.push({
          posicion: 'ingenierias',
          estudios: estudiosIngenierias,
          detalles: detallesIngenierias
        })
      }
      setArrayPosicionesTecnico(posicionesTecnicoArrayOperativo);
      setDetallePosicionesTecnico(detallePosicionesTecnicoArrayOperativo)
    }

    actualizarPosicionesTecnico();
  }, [consultoriaDireccionTecnica, estudiosConsultoriaDireccionTecnica, detallesConsultoriaDireccionTecnica,
    arquitecturaTecnica, estudiosArquitecturaTecnica, detallesArquitecturaTecnica,
    analisisDocumentacionTecnica, estudiosAnalisisDocumentacionTecnica, detallesAnalisisDocumentacionTecnica,
    mejoraContinua, estudiosMejoraContinua, detallesMejoraContinua,
    ingenierias, estudiosIngenierias, detallesIngenierias]
  );


  const ActualizarPosicionesTecnico = async () => { 

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

        if (arrayPosicionesTecnico.length !== 0) {
          for (const item of arrayPosicionesTecnico) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesTecnico.length !== 0) {
          for (const newItem of detallePosicionesTecnico) {
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
    ActualizarPosicionesTecnico()
    cambioComponenteMostrar('tecnico');
  };
  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'> Departamento técnico, consultoría técnica e ingenierías</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>
        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(consultoriaDireccionTecnica, 'consultoriaDireccionTecnica', setConsultoriaDireccionTecnica)} />
              <p className='ml-2'>Consultoría o dirección técnica</p>
            </label>
            {consultoriaDireccionTecnica &&
              <div className='flex flex-col'>
                <textarea 
                  placeholder="Estudios relacionados"
                  value={estudiosConsultoriaDireccionTecnica}
                  onChange={(e) => setEstudiosConsultoriaDireccionTecnica(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                  </textarea>

                  <textarea 
                  placeholder="Detalles de la experiencia"
                  value={detallesConsultoriaDireccionTecnica}
                  onChange={(e) => setDetallesConsultoriaDireccionTecnica(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                    </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-top'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(arquitecturaTecnica, 'arquitecturaTecnica', setArquitecturaTecnica)}
                className='my-1' />
              <p className='ml-2 text-left'>Arquitectura técnica</p>
            </label>
            {arquitecturaTecnica && <div className='flex flex-col'>
              <textarea
                placeholder="Estudios relacionados"
                value={estudiosArquitecturaTecnica}
                onChange={(e) => setEstudiosArquitecturaTecnica(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              <textarea placeholder="Estudios relacionados"
                value={detallesArquitecturaTecnica}
                onChange={(e) => setDetallesArquitecturaTecnica(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(analisisDocumentacionTecnica, 'analisisDocumentacionTecnica', setAnalisisDocumentacionTecnica)} />
              <p className='ml-2'> Análisis o creación de documentación de proyectos técnicos</p>
            </label>
            {analisisDocumentacionTecnica && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosAnalisisDocumentacionTecnica}
                onChange={(e) => setEstudiosAnalisisDocumentacionTecnica(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesAnalisisDocumentacionTecnica}
                onChange={(e) => setDetallesAnalisisDocumentacionTecnica(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(mejoraContinua, 'mejoraContinua', setMejoraContinua)} />
              <p className='ml-2'> Mejora contínua</p>
            </label>
            {mejoraContinua && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosMejoraContinua}
                onChange={(e) => setEstudiosMejoraContinua(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesMejoraContinua}
                onChange={(e) => setDetallesMejoraContinua(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(ingenierias, 'ingenierias', setIngenierias)} />
              <p className='ml-2'>  Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras</p>
            </label>
            {ingenierias && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosIngenierias}
                onChange={(e) => setEstudiosIngenierias(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesIngenierias}
                onChange={(e) => setDetallesIngenierias(e.target.value)}
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

export default Tecnico;
