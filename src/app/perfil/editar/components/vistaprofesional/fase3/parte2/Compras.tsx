import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface ExperienciaItem {
  posicion: string;
  estudios: string;
  detalles: string;
}

interface ComercialProps {
  user: any;
  cambioComponenteMostrar: any;
}

interface User {
  posicionesMap: any
}

const Comercial: FC<ComercialProps> = ({ user, cambioComponenteMostrar }) => {

  const [compraMaquinaria, setCompraMaquinaria] = useState(false);
  const [estudiosCompraMaquinaria, setEstudiosCompraMaquinaria] = useState('');
  const [detallesCompraMaquinaria, setDetallesCompraMaquinaria] = useState('');

  const [compraSuministros, setCompraSuministros] = useState(false);
  const [estudiosCompraSuministros, setEstudiosCompraSuministros] = useState('');
  const [detallesCompraSuministros, setDetallesCompraSuministros] = useState('');

  const [otrasCompras, setOtrasCompras] = useState(false);
  const [estudiosOtrasCompras, setEstudiosOtrasCompras] = useState('');
  const [detallesOtrasCompras, setDetallesOtrasCompras] = useState('');

  const [arrayPosicionesCompras, setArrayPosicionesCompras] = useState<string[]>([]);
  const [detallePosicionesCompras, setDetallePosicionesCompras] = useState<ExperienciaItem[]>([]);
  const [arrayPosicionesEliminar, setArrayPosicionesEliminar] = useState<string[]>([])


  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
   }, [user]);


  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('compraMaquinaria')) {
        setCompraMaquinaria(true);
        let compraMaquinariaDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'compraMaquinaria');
        if (compraMaquinariaDetails) {
          setEstudiosCompraMaquinaria(compraMaquinariaDetails.estudios);
          setDetallesCompraMaquinaria(compraMaquinariaDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('compraSuministros')) {
        setCompraSuministros(true);
        let compraSuministrosDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'compraSuministros');
        if (compraSuministrosDetails) {
          setEstudiosCompraSuministros(compraSuministrosDetails.estudios);
          setDetallesCompraSuministros(compraSuministrosDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('otrasCompras')) {
        setOtrasCompras(true);
        let otrasComprasDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'otrasCompras');
        if (otrasComprasDetails) {
          setEstudiosOtrasCompras(otrasComprasDetails.estudios);
          setDetallesOtrasCompras(otrasComprasDetails.detalles);
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
    const actualizarPosicionesCompras = () => {
      const posicionesComprasArrayOperativo = [];
      const detallePosicionesComprasArrayOperativo = [];
      if (compraMaquinaria) {
        posicionesComprasArrayOperativo.push('compraMaquinaria');
        detallePosicionesComprasArrayOperativo.push({
          posicion: 'compraMaquinaria',
          estudios: estudiosCompraMaquinaria,
          detalles: detallesCompraMaquinaria
        })
      }
      if (compraSuministros) {
        posicionesComprasArrayOperativo.push('compraSuministros');
        detallePosicionesComprasArrayOperativo.push({
          posicion: 'compraSuministros',
          estudios: estudiosCompraSuministros,
          detalles: detallesCompraSuministros
        })
      }
      if (otrasCompras) {
        posicionesComprasArrayOperativo.push('otrasCompras');
        detallePosicionesComprasArrayOperativo.push({
          posicion: 'otrasCompras',
          estudios: estudiosOtrasCompras,
          detalles: detallesOtrasCompras
        })
      }

      setArrayPosicionesCompras(posicionesComprasArrayOperativo);
      setDetallePosicionesCompras(detallePosicionesComprasArrayOperativo)
    }

    actualizarPosicionesCompras();
  }, [compraMaquinaria, estudiosCompraMaquinaria, detallesCompraMaquinaria,
    compraSuministros, estudiosCompraSuministros, detallesCompraSuministros,
    otrasCompras, estudiosOtrasCompras, detallesOtrasCompras]
  );


  const ActualizarPosicionesCompras = async () => { 

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

        if (arrayPosicionesCompras.length !== 0) {
          for (const item of arrayPosicionesCompras) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesCompras.length !== 0) {
          for (const newItem of detallePosicionesCompras) {
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
    ActualizarPosicionesCompras()
    cambioComponenteMostrar('compras');
  };
  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'> Departamento de Compras</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>
        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(compraMaquinaria, 'compraMaquinaria', setCompraMaquinaria)} />
              <p className='ml-2'>Compra de maquinaria industrial</p>
            </label>
            {compraMaquinaria &&
              <div className='flex flex-col'>
                <textarea 
                  placeholder="Estudios relacionados"
                  value={estudiosCompraMaquinaria}
                  onChange={(e) => setEstudiosCompraMaquinaria(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                  </textarea>

                  <textarea 
                  placeholder="Detalles de la experiencia"
                  value={detallesCompraMaquinaria}
                  onChange={(e) => setDetallesCompraMaquinaria(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                    </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-top'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(compraSuministros, 'compraSuministros', setCompraSuministros)}
                className='my-1' />
              <p className='ml-2 text-left'>Compra de suministros para fabricación y/o manipulado de vidrio</p>
            </label>
            {compraSuministros && <div className='flex flex-col'>
              <textarea
                placeholder="Estudios relacionados"
                value={estudiosCompraSuministros}
                onChange={(e) => setEstudiosCompraSuministros(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              <textarea placeholder="Estudios relacionados"
                value={detallesCompraSuministros}
                onChange={(e) => setDetallesCompraSuministros(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
            </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" onChange={() => handleExperienceToggle(otrasCompras, 'otrasCompras', setOtrasCompras)} />
              <p className='ml-2'>Otras experiencias en compras</p>
            </label>
            {otrasCompras && <div className='flex flex-col'>
              <textarea placeholder="Estudios relacionados"
                value={estudiosOtrasCompras}
                onChange={(e) => setEstudiosOtrasCompras(e.target.value)}
                className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
              <textarea placeholder="Detalles de la experiencia"
                value={detallesOtrasCompras}
                onChange={(e) => setDetallesOtrasCompras(e.target.value)}
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

export default Comercial;
