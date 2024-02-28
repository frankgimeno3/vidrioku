import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ExperienciaItem {
  posicion: string;
  estudios: string;
  detalles: string;
}

interface LogisticaProps {
  user: any;
  cambioComponenteMostrar: any;
}

interface User {
  posicionesMap: any
}

const Logistica: FC<LogisticaProps> = ({ user, cambioComponenteMostrar }) => {

  const [instalador, setInstalador] = useState(false);
  const [estudiosInstalador, setEstudiosInstalador] = useState('');
  const [detallesInstalador, setDetallesInstalador] = useState('');
 
  const [transportista, setTransportista] = useState(false);
  const [estudiosTransportista, setEstudiosTransportista] = useState('');
  const [detallesTransportista, setDetallesTransportista] = useState('');

  const [almacenManipulacionInterna, setAlmacenManipulacionInterna] = useState(false);
  const [estudiosAlmacenManipulacionInterna, setEstudiosAlmacenManipulacionInterna] = useState('');
  const [detallesAlmacenManipulacionInterna, setDetallesAlmacenManipulacionInterna] = useState('');

  const [gestionStockLogisticaExpediciones, setGestionStockLogisticaExpediciones] = useState(false);
  const [estudiosGestionStockLogisticaExpediciones, setEstudiosGestionStockLogisticaExpediciones] = useState('');
  const [detallesGestionStockLogisticaExpediciones, setDetallesGestionStockLogisticaExpediciones] = useState('');

  const [arrayPosicionesLogistica, setArrayPosicionesLogistica] = useState<string[]>([]);
  const [detallePosicionesLogistica, setDetallePosicionesLogistica] = useState<ExperienciaItem[]>([]);
  const [arrayPosicionesEliminar, setArrayPosicionesEliminar] = useState<string[]>([])


  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
   }, [user]);


  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('instalador')) {
        setInstalador(true);
        let instaladorDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'instalador');
        if (instaladorDetails) {
          setEstudiosInstalador(instaladorDetails.estudios);
          setDetallesInstalador(instaladorDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('transportista')) {
        setTransportista(true);
        let transportistaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'transportista');
        if (transportistaDetails) {
          setEstudiosTransportista(transportistaDetails.estudios);
          setDetallesTransportista(transportistaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('almacenManipulacionInterna')) {
        setAlmacenManipulacionInterna(true);
        let almacenManipulacionInternaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'almacenManipulacionInterna');
        if (almacenManipulacionInternaDetails) {
          setEstudiosAlmacenManipulacionInterna(almacenManipulacionInternaDetails.estudios);
          setDetallesAlmacenManipulacionInterna(almacenManipulacionInternaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('gestionStockLogisticaExpediciones')) {
        setGestionStockLogisticaExpediciones(true);
        let gestionStockLogisticaExpedicionesDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'gestionStockLogisticaExpediciones');
        if (gestionStockLogisticaExpedicionesDetails) {
          setEstudiosGestionStockLogisticaExpediciones(gestionStockLogisticaExpedicionesDetails.estudios);
          setDetallesGestionStockLogisticaExpediciones(gestionStockLogisticaExpedicionesDetails.detalles);
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
    const actualizarPosicionesLogistica = () => {
      const posicionesLogisticaArrayOperativo = [];
      const detallePosicionesLogisticaArrayOperativo = [];
      if (instalador) {
        posicionesLogisticaArrayOperativo.push('instalador');
        detallePosicionesLogisticaArrayOperativo.push({
          posicion: 'instalador',
          estudios: estudiosInstalador,
          detalles: detallesInstalador
        })
      }
      if (transportista) {
        posicionesLogisticaArrayOperativo.push('transportista');
        detallePosicionesLogisticaArrayOperativo.push({
          posicion: 'transportista',
          estudios: estudiosTransportista,
          detalles: detallesTransportista
        })
      }
      if (almacenManipulacionInterna) {
        posicionesLogisticaArrayOperativo.push('almacenManipulacionInterna');
        detallePosicionesLogisticaArrayOperativo.push({
          posicion: 'almacenManipulacionInterna',
          estudios: estudiosAlmacenManipulacionInterna ,
          detalles: detallesAlmacenManipulacionInterna
        })
      }
      if (gestionStockLogisticaExpediciones) {
        posicionesLogisticaArrayOperativo.push('gestionStockLogisticaExpediciones');
        detallePosicionesLogisticaArrayOperativo.push({
          posicion: 'gestionStockLogisticaExpediciones',
          estudios: estudiosGestionStockLogisticaExpediciones,
          detalles: detallesGestionStockLogisticaExpediciones
        })
      }
      setArrayPosicionesLogistica(posicionesLogisticaArrayOperativo);
      setDetallePosicionesLogistica(detallePosicionesLogisticaArrayOperativo)
    }

    actualizarPosicionesLogistica();
  }, [instalador, estudiosInstalador, detallesInstalador,
    transportista, estudiosTransportista, detallesTransportista,
    almacenManipulacionInterna, estudiosAlmacenManipulacionInterna, detallesAlmacenManipulacionInterna,
    gestionStockLogisticaExpediciones, estudiosGestionStockLogisticaExpediciones, detallesGestionStockLogisticaExpediciones]
  );


  const ActualizarPosicionesLogistica = async () => { 

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

        if (arrayPosicionesLogistica.length !== 0) {
          for (const item of arrayPosicionesLogistica) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesLogistica.length !== 0) {
          for (const newItem of detallePosicionesLogistica) {
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
    ActualizarPosicionesLogistica()
    cambioComponenteMostrar('logistica');
  };
  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'> Departamentos de almacenamiento, logística y transportes</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>
        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(instalador, 'instalador', setInstalador)} />
              <p className='ml-2'> Instalación de vidrios y/o ventanas</p>
            </label>
            {instalador &&
              <div className='flex flex-col'>
                <textarea 
                  placeholder="Estudios relacionados"
                  value={estudiosInstalador}
                  onChange={(e) => setEstudiosInstalador(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                  </textarea>

                  <textarea 
                  placeholder="Detalles de la experiencia"
                  value={detallesInstalador}
                  onChange={(e) => setDetallesInstalador(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                    </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-top'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(transportista, 'transportista', setTransportista)}
                className='my-1' />
              <p className='ml-2 text-left'>Transportista de vidrios y/o ventanas fuera de fábrica</p>
            </label>
            {transportista && <div className='flex flex-col'>
              <textarea
                placeholder="Estudios relacionados"
                value={estudiosTransportista}
                onChange={(e) => setEstudiosTransportista(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              <textarea placeholder="Estudios relacionados"
                value={detallesTransportista}
                onChange={(e) => setDetallesTransportista(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(almacenManipulacionInterna, 'almacenManipulacionInterna', setAlmacenManipulacionInterna)} />
              <p className='ml-2'>Profesionales de almacén o manipulación interna de vidrios y/o otros bienes</p>
            </label>
            {almacenManipulacionInterna && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosAlmacenManipulacionInterna}
                onChange={(e) => setEstudiosAlmacenManipulacionInterna(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesAlmacenManipulacionInterna}
                onChange={(e) => setDetallesAlmacenManipulacionInterna(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(gestionStockLogisticaExpediciones, 'gestionStockLogisticaExpediciones', setGestionStockLogisticaExpediciones)} />
              <p className='ml-2'>Gestión de stock, logística y expediciones</p>
            </label>
            {gestionStockLogisticaExpediciones && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosGestionStockLogisticaExpediciones}
                onChange={(e) => setEstudiosGestionStockLogisticaExpediciones(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesGestionStockLogisticaExpediciones}
                onChange={(e) => setDetallesGestionStockLogisticaExpediciones(e.target.value)}
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

export default Logistica;
