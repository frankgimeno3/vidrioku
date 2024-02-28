import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ExperienciaItem {
  posicion: string;
  estudios: string;
  detalles: string;
}

interface MantenimientoProps {
  user: any;
  cambioComponenteMostrar: any;
}

interface User {
  posicionesMap: any
}

const Mantenimiento: FC<MantenimientoProps> = ({ user, cambioComponenteMostrar }) => {

  const [tecnicoElectricoMecanico, setTecnicoElectricoMecanico] = useState(false);
  const [estudiosTecnicoElectricoMecanico, setEstudiosTecnicoElectricoMecanico] = useState('');
  const [detallesTecnicoElectricoMecanico, setDetallesTecnicoElectricoMecanico] = useState('');

  const [revisionMantenimiento, setRevisionMantenimiento] = useState(false);
  const [estudiosRevisionMantenimiento, setEstudiosRevisionMantenimiento] = useState('');
  const [detallesRevisionMantenimiento, setDetallesRevisionMantenimiento] = useState('');

  const [reparacionResolucionIncidencias, setReparacionResolucionIncidencias] = useState(false);
  const [estudiosReparacionResolucionIncidencias, setEstudiosReparacionResolucionIncidencias] = useState('');
  const [detallesReparacionResolucionIncidencias, setDetallesReparacionResolucionIncidencias] = useState('');

  const [soldaduraElectricidad, setSoldaduraElectricidad] = useState(false);
  const [estudiosSoldaduraElectricidad, setEstudiosSoldaduraElectricidad] = useState('');
  const [detallesSoldaduraElectricidad, setDetallesSoldaduraElectricidad] = useState('');

  const [arrayPosicionesMantenimiento, setArrayPosicionesMantenimiento] = useState<string[]>([]);
  const [detallePosicionesMantenimiento, setDetallePosicionesMantenimiento] = useState<ExperienciaItem[]>([]);
  const [arrayPosicionesEliminar, setArrayPosicionesEliminar] = useState<string[]>([])


  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
   }, [user]);


  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('tecnicoElectricoMecanico')) {
        setTecnicoElectricoMecanico(true);
        let tecnicoElectricoMecanicoDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'tecnicoElectricoMecanico');
        if (tecnicoElectricoMecanicoDetails) {
          setEstudiosTecnicoElectricoMecanico(tecnicoElectricoMecanicoDetails.estudios);
          setDetallesTecnicoElectricoMecanico(tecnicoElectricoMecanicoDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('revisionMantenimiento')) {
        setRevisionMantenimiento(true);
        let revisionMantenimientoDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'revisionMantenimiento');
        if (revisionMantenimientoDetails) {
          setEstudiosRevisionMantenimiento(revisionMantenimientoDetails.estudios);
          setDetallesRevisionMantenimiento(revisionMantenimientoDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('reparacionResolucionIncidencias')) {
        setReparacionResolucionIncidencias(true);
        let reparacionResolucionIncidenciasDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'reparacionResolucionIncidencias');
        if (reparacionResolucionIncidenciasDetails) {
          setEstudiosReparacionResolucionIncidencias(reparacionResolucionIncidenciasDetails.estudios);
          setDetallesReparacionResolucionIncidencias(reparacionResolucionIncidenciasDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('soldaduraElectricidad')) {
        setReparacionResolucionIncidencias(true);
        let soldaduraElectricidadDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'soldaduraElectricidad');
        if (soldaduraElectricidadDetails) {
          setEstudiosSoldaduraElectricidad(soldaduraElectricidadDetails.estudios);
          setDetallesSoldaduraElectricidad(soldaduraElectricidadDetails.detalles);
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
    const actualizarPosicionesMantenimiento = () => {
      const posicionesMantenimientoArrayOperativo = [];
      const detallePosicionesMantenimientoArrayOperativo = [];
      if (tecnicoElectricoMecanico) {
        posicionesMantenimientoArrayOperativo.push('tecnicoElectricoMecanico');
        detallePosicionesMantenimientoArrayOperativo.push({
          posicion: 'tecnicoElectricoMecanico',
          estudios: estudiosTecnicoElectricoMecanico,
          detalles: detallesTecnicoElectricoMecanico
        })
      }
      if (revisionMantenimiento) {
        posicionesMantenimientoArrayOperativo.push('revisionMantenimiento');
        detallePosicionesMantenimientoArrayOperativo.push({
          posicion: 'revisionMantenimiento',
          estudios: estudiosRevisionMantenimiento,
          detalles: detallesRevisionMantenimiento
        })
      }
      if (reparacionResolucionIncidencias) {
        posicionesMantenimientoArrayOperativo.push('reparacionResolucionIncidencias');
        detallePosicionesMantenimientoArrayOperativo.push({
          posicion: 'reparacionResolucionIncidencias',
          estudios: estudiosReparacionResolucionIncidencias,
          detalles: detallesReparacionResolucionIncidencias
        })
      }
      if (soldaduraElectricidad) {
        posicionesMantenimientoArrayOperativo.push('soldaduraElectricidad');
        detallePosicionesMantenimientoArrayOperativo.push({
          posicion: 'soldaduraElectricidad',
          estudios: estudiosSoldaduraElectricidad,
          detalles: detallesSoldaduraElectricidad
        })
      }

      setArrayPosicionesMantenimiento(posicionesMantenimientoArrayOperativo);
      setDetallePosicionesMantenimiento(detallePosicionesMantenimientoArrayOperativo)
    }

    actualizarPosicionesMantenimiento();
  }, [tecnicoElectricoMecanico, estudiosTecnicoElectricoMecanico, detallesTecnicoElectricoMecanico, 
    revisionMantenimiento, estudiosRevisionMantenimiento, detallesRevisionMantenimiento, 
    reparacionResolucionIncidencias, estudiosReparacionResolucionIncidencias, detallesReparacionResolucionIncidencias, 
    soldaduraElectricidad, estudiosSoldaduraElectricidad, detallesSoldaduraElectricidad]
  );


  const ActualizarPosicionesMantenimiento = async () => { 
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

        if (arrayPosicionesMantenimiento.length !== 0) {
          for (const item of arrayPosicionesMantenimiento) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesMantenimiento.length !== 0) {
          for (const newItem of detallePosicionesMantenimiento) {
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
    ActualizarPosicionesMantenimiento()
    cambioComponenteMostrar('mantenimiento');
  };
  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'> Departamento de Compras</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>
        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(tecnicoElectricoMecanico, 'tecnicoElectricoMecanico', setTecnicoElectricoMecanico)} />
              <p className='ml-2'>Electromecánica, técnico eléctrico y/o mecánico</p>
            </label>
            {tecnicoElectricoMecanico &&
              <div className='flex flex-col'>
                <textarea 
                  placeholder="Estudios relacionados"
                  value={estudiosTecnicoElectricoMecanico}
                  onChange={(e) => setEstudiosTecnicoElectricoMecanico(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                  </textarea>

                  <textarea 
                  placeholder="Detalles de la experiencia"
                  value={detallesTecnicoElectricoMecanico}
                  onChange={(e) => setDetallesTecnicoElectricoMecanico(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                    </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-top'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(revisionMantenimiento, 'revisionMantenimiento', setRevisionMantenimiento)}
                className='my-1' />
              <p className='ml-2 text-left'>Revisión y mantenimiento preventivo de equipos</p>
            </label>
            {revisionMantenimiento && <div className='flex flex-col'>
              <textarea
                placeholder="Estudios relacionados"
                value={estudiosRevisionMantenimiento}
                onChange={(e) => setEstudiosRevisionMantenimiento(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              <textarea placeholder="Estudios relacionados"
                value={detallesRevisionMantenimiento}
                onChange={(e) => setDetallesRevisionMantenimiento(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(reparacionResolucionIncidencias, 'reparacionResolucionIncidencias', setReparacionResolucionIncidencias)} />
              <p className='ml-2'>Reparación y resolución de incidencias</p>
            </label>
            {reparacionResolucionIncidencias && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosReparacionResolucionIncidencias}
                onChange={(e) => setEstudiosReparacionResolucionIncidencias(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesReparacionResolucionIncidencias}
                onChange={(e) => setDetallesReparacionResolucionIncidencias(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(soldaduraElectricidad, 'soldaduraElectricidad', setSoldaduraElectricidad)} />
              <p className='ml-2'>Experiencia con soldadura y/o electricidad</p>
            </label>
            {soldaduraElectricidad && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosSoldaduraElectricidad}
                onChange={(e) => setEstudiosSoldaduraElectricidad(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesSoldaduraElectricidad}
                onChange={(e) => setDetallesSoldaduraElectricidad(e.target.value)}
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

export default Mantenimiento;
