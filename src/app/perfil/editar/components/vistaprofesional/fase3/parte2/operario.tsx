import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ExperienciaItem {
  posicion: string;
  estudios: string;
  detalles: string;
}

interface OperarioProps {
  user: any;
  cambioComponenteMostrar: any;
}

interface User {
  posicionesMap: any
}

const Operario: FC<OperarioProps> = ({ user, cambioComponenteMostrar }) => {
 
  const [carpinteriaAluminioChapa, setCarpinteriaAluminioChapa] = useState(false);
  const [estudiosCarpinteriaAluminioChapa, setEstudiosCarpinteriaAluminioChapa] = useState('');
  const [detallesCarpinteriaAluminioChapa, setDetallesCarpinteriaAluminioChapa] = useState('');

  const [serigrafia, setSerigrafia] = useState(false);
  const [estudiosSerigrafia, setEstudiosSerigrafia] = useState('');
  const [detallesSerigrafia, setDetallesSerigrafia] = useState('');

  const [corteBiseladoFresadoTratamientoVidrio, setCorteBiseladoFresadoTratamientoVidrio] = useState(false);
  const [estudiosCorteBiseladoFresadoTratamientoVidrio, setEstudiosCorteBiseladoFresadoTratamientoVidrio] = useState('');
  const [detallesCorteBiseladoFresadoTratamientoVidrio, setDetallesCorteBiseladoFresadoTratamientoVidrio] = useState('');

  const [mecanizado, setMecanizado] = useState(false);
  const [estudiosMecanizado, setEstudiosMecanizado] = useState('');
  const [detallesMecanizado, setDetallesMecanizado] = useState(''); 

  const [manipulacionVidrios, setManipulacionVidrios] = useState(false);
  const [estudiosManipulacionVidrios, setEstudiosManipulacionVidrios] = useState('');
  const [detallesManipulacionVidrios, setDetallesManipulacionVidrios] = useState('');

  const [otrosOperarios, setOtrosOperarios] = useState(false);
  const [estudiosOtrosOperarios, setEstudiosOtrosOperarios] = useState('');
  const [detallesOtrosOperarios, setDetallesOtrosOperarios] = useState('');

  const [arrayPosicionesOperario, setArrayPosicionesOperario] = useState<string[]>([]);
  const [detallePosicionesOperario, setDetallePosicionesOperario] = useState<ExperienciaItem[]>([]);
  const [arrayPosicionesEliminar, setArrayPosicionesEliminar] = useState<string[]>([])


  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
   }, [user]);


  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('carpinteriaAluminioChapa')) {
        setCarpinteriaAluminioChapa(true);
        let carpinteriaAluminioChapaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'carpinteriaAluminioChapa');
        if (carpinteriaAluminioChapaDetails) {
          setEstudiosCarpinteriaAluminioChapa(carpinteriaAluminioChapaDetails.estudios);
          setDetallesCarpinteriaAluminioChapa(carpinteriaAluminioChapaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('serigrafia')) {
        setSerigrafia(true);
        let serigrafiaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'serigrafia');
        if (serigrafiaDetails) {
          setEstudiosSerigrafia(serigrafiaDetails.estudios);
          setDetallesSerigrafia(serigrafiaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('corteBiseladoFresadoTratamientoVidrio')) {
        setCorteBiseladoFresadoTratamientoVidrio (true);
        let corteBiseladoFresadoTratamientoVidrioDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'corteBiseladoFresadoTratamientoVidrio');
        if (corteBiseladoFresadoTratamientoVidrioDetails) {
          setCorteBiseladoFresadoTratamientoVidrio(corteBiseladoFresadoTratamientoVidrioDetails.estudios);
          setCorteBiseladoFresadoTratamientoVidrio(corteBiseladoFresadoTratamientoVidrioDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('mecanizado')) {
        setMecanizado(true);
        let mecanizadoDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'mecanizado');
        if (mecanizadoDetails) {
          setEstudiosMecanizado(mecanizadoDetails.estudios);
          setDetallesMecanizado(mecanizadoDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('manipulacionVidrios')) {
        setManipulacionVidrios(true);
        let manipulacionVidriosDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'manipulacionVidrios');
        if (manipulacionVidriosDetails) {
          setEstudiosManipulacionVidrios(manipulacionVidriosDetails.estudios);
          setDetallesManipulacionVidrios(manipulacionVidriosDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('otrosOperarios')) {
        setOtrosOperarios(true);
        let otrosOperariosDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'otrosOperarios');
        if (otrosOperariosDetails) {
          setEstudiosOtrosOperarios(otrosOperariosDetails.estudios);
          setDetallesOtrosOperarios(otrosOperariosDetails.detalles);
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
    const actualizarPosicionesOperario = () => {
      const posicionesOperarioArrayOperativo = [];
      const detallePosicionesOperarioArrayOperativo = [];
      if (carpinteriaAluminioChapa) {
        posicionesOperarioArrayOperativo.push('carpinteriaAluminioChapa');
        detallePosicionesOperarioArrayOperativo.push({
          posicion: 'carpinteriaAluminioChapa',
          estudios: estudiosCarpinteriaAluminioChapa,
          detalles: detallesCarpinteriaAluminioChapa
        })
      }
      if (serigrafia) {
        posicionesOperarioArrayOperativo.push('serigrafia');
        detallePosicionesOperarioArrayOperativo.push({
          posicion: 'serigrafia',
          estudios: estudiosSerigrafia,
          detalles: detallesSerigrafia
        })
      }
      if (corteBiseladoFresadoTratamientoVidrio) {
        posicionesOperarioArrayOperativo.push('corteBiseladoFresadoTratamientoVidrio');
        detallePosicionesOperarioArrayOperativo.push({
          posicion: 'corteBiseladoFresadoTratamientoVidrio',
          estudios: estudiosCorteBiseladoFresadoTratamientoVidrio,
          detalles: detallesCorteBiseladoFresadoTratamientoVidrio
        })
      }
      if (mecanizado) {
        posicionesOperarioArrayOperativo.push('mecanizado');
        detallePosicionesOperarioArrayOperativo.push({
          posicion: 'mecanizado',
          estudios: estudiosMecanizado,
          detalles: detallesMecanizado
        })
      }
      if (manipulacionVidrios) {
        posicionesOperarioArrayOperativo.push('manipulacionVidrios');
        detallePosicionesOperarioArrayOperativo.push({
          posicion: 'manipulacionVidrios',
          estudios: estudiosManipulacionVidrios,
          detalles: detallesManipulacionVidrios
        })
      }
      if (otrosOperarios) {
        posicionesOperarioArrayOperativo.push('otrosOperarios');
        detallePosicionesOperarioArrayOperativo.push({
          posicion: 'otrosOperarios',
          estudios: estudiosOtrosOperarios,
          detalles: detallesOtrosOperarios
        })
      }
      setArrayPosicionesOperario(posicionesOperarioArrayOperativo);
      setDetallePosicionesOperario(detallePosicionesOperarioArrayOperativo)
    }

    actualizarPosicionesOperario();
  }, [carpinteriaAluminioChapa, estudiosCarpinteriaAluminioChapa, detallesCarpinteriaAluminioChapa,
    serigrafia, estudiosSerigrafia, detallesSerigrafia,
    corteBiseladoFresadoTratamientoVidrio, estudiosCorteBiseladoFresadoTratamientoVidrio, detallesCorteBiseladoFresadoTratamientoVidrio,
    mecanizado, estudiosMecanizado, detallesMecanizado,
    manipulacionVidrios, estudiosManipulacionVidrios, detallesManipulacionVidrios,
    otrosOperarios, estudiosOtrosOperarios, detallesOtrosOperarios]
  );


  const ActualizarPosicionesOperario = async () => { 

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

        if (arrayPosicionesOperario.length !== 0) {
          for (const item of arrayPosicionesOperario) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesOperario.length !== 0) {
          for (const newItem of detallePosicionesOperario) {
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
    ActualizarPosicionesOperario()
    cambioComponenteMostrar('operario');
  };
  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'> Operario en fabricación o instalación en el sector del vidrio y/o las ventanas</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>
        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(carpinteriaAluminioChapa, 'carpinteriaAluminioChapa', setCarpinteriaAluminioChapa)} />
              <p className='ml-2'>Carpintería de aluminio y/o chapa</p>
            </label>
            {carpinteriaAluminioChapa &&
              <div className='flex flex-col'>
                <textarea 
                  placeholder="Estudios relacionados"
                  value={estudiosCarpinteriaAluminioChapa}
                  onChange={(e) => setEstudiosCarpinteriaAluminioChapa(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                  </textarea>

                  <textarea 
                  placeholder="Detalles de la experiencia"
                  value={detallesCarpinteriaAluminioChapa}
                  onChange={(e) => setDetallesCarpinteriaAluminioChapa(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                    </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-top'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(serigrafia, 'serigrafia', setSerigrafia)}
                className='my-1' />
              <p className='ml-2 text-left'>Serigrafía</p>
            </label>
            {serigrafia && <div className='flex flex-col'>
              <textarea
                placeholder="Estudios relacionados"
                value={estudiosSerigrafia}
                onChange={(e) => setEstudiosSerigrafia(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              <textarea placeholder="Estudios relacionados"
                value={detallesSerigrafia}
                onChange={(e) => setDetallesSerigrafia(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(corteBiseladoFresadoTratamientoVidrio, 'corteBiseladoFresadoTratamientoVidrio', setCorteBiseladoFresadoTratamientoVidrio)} />
              <p className='ml-2'> Corte, biselado, fresado y/o tratamiento químico de vidrio plano</p>
            </label>
            {corteBiseladoFresadoTratamientoVidrio && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosCorteBiseladoFresadoTratamientoVidrio}
                onChange={(e) => setEstudiosCorteBiseladoFresadoTratamientoVidrio(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesCorteBiseladoFresadoTratamientoVidrio}
                onChange={(e) => setDetallesCorteBiseladoFresadoTratamientoVidrio(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(mecanizado, 'mecanizado', setMecanizado)} />
              <p className='ml-2'> Mecanizado</p>
            </label>
            {mecanizado && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosMecanizado}
                onChange={(e) => setEstudiosMecanizado(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesMecanizado}
                onChange={(e) => setDetallesMecanizado(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(manipulacionVidrios, 'manipulacionVidrios', setManipulacionVidrios)} />
              <p className='ml-2'>Manipulación industrial de vidrio plano y/o curvo</p>
            </label>
            {manipulacionVidrios && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosManipulacionVidrios}
                onChange={(e) => setEstudiosManipulacionVidrios(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesManipulacionVidrios}
                onChange={(e) => setDetallesManipulacionVidrios(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>


          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(otrosOperarios, 'otrosOperarios', setOtrosOperarios)} />
              <p className='ml-2'>Otras tareas como operario de fábrica</p>
            </label>
            {otrosOperarios && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosOtrosOperarios}
                onChange={(e) => setEstudiosOtrosOperarios(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesOtrosOperarios}
                onChange={(e) => setDetallesOtrosOperarios(e.target.value)}
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

export default Operario;
