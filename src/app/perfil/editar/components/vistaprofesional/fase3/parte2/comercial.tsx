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
  const [ventasInternacionalesExport, setVentasInternacionalesExport] = useState(false)
  const [estudiosVentasInternacionalesExport, setEstudiosVentasInternacionalesExport] = useState('')
  const [detallesVentasInternacionalesExport, setDetallesVentasInternacionalesExport] = useState('')

  const [comercialTecnico, setComercialTecnico] = useState(false)
  const [estudiosComercialTecnico, setEstudiosComercialTecnico] = useState('')
  const [experienciaComercialTecnico, setExperienciaComercialTecnico] = useState('')

  const [coordinadorProyectos, setCoordinadorProyectos] = useState(false)
  const [estudiosCoordinadorProyectos, setEstudiosCoordinadorProyectos] = useState('')
  const [experienciaCoordinadorProyectos, setExperienciaCoordinadorProyectos] = useState('')

  const [gestorProyectos, setGestorProyectos] = useState(false)
  const [estudiosGestorProyectos, setEstudiosGestorProyectos] = useState('')
  const [experienciaGestorProyectos, setExperienciaGestorProyectos] = useState('')

  const [arrayPosicionesComerciales, setArrayPosicionesComerciales] = useState<string[]>([]);
  const [detallePosicionesComerciales, setDetallePosicionesComerciales] = useState<ExperienciaItem[]>([]);

  const [receivedUser, setReceivedUser] = useState<any>();

  useEffect(() => {
    setReceivedUser(user);
    console.log("user recibido desde comercial", user)
  }, [user]);

  useEffect(() => {
    if (receivedUser) {
      let detallesPosicionesRecibido = receivedUser.posicionesMap.detallePosicionesArray;
      if (receivedUser.posicionesMap.arrayPosiciones.includes('ventasInternacionalesExport')) {
        setVentasInternacionalesExport(true);
        let ventasInternacionalesExportDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'ventasInternacionalesExport');
        if (ventasInternacionalesExportDetails) {
          setEstudiosVentasInternacionalesExport(ventasInternacionalesExportDetails.estudios);
          setDetallesVentasInternacionalesExport(ventasInternacionalesExportDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('comercialTecnico')) {
        setComercialTecnico(true);
        let comercialTecnicoDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'comercialTecnico');
        if (comercialTecnicoDetails) {
          setEstudiosComercialTecnico(comercialTecnicoDetails.estudios);
          setExperienciaComercialTecnico(comercialTecnicoDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('coordinadorProyectos')) {
        setCoordinadorProyectos(true);
        let coordinadorProyectosDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'coordinadorProyectos');
        if (coordinadorProyectosDetails) {
          setEstudiosCoordinadorProyectos(coordinadorProyectosDetails.estudios);
          setExperienciaCoordinadorProyectos(coordinadorProyectosDetails.detalles);
        }
      }
      if (receivedUser.posicionesMap.arrayPosiciones.includes('gestorProyectos')) {
        setGestorProyectos(true);
        let gestorProyectosDetails = detallesPosicionesRecibido.find((obj: { posicion: string; }) => obj.posicion === 'gestorProyectos');
        if (gestorProyectosDetails) {
          setEstudiosGestorProyectos(gestorProyectosDetails.estudios);
          setExperienciaGestorProyectos(gestorProyectosDetails.detalles);
        }
      }
    }
  }, [receivedUser]);

  const handleExperienceToggle = (estado: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(!estado);
  }

  useEffect(() => {
    const actualizarPosicionesComerciales = () => {
      const posicionesComercialesArrayOperativo = [];
      const detallePosicionesComercialesArrayOperativo = [];
      if (ventasInternacionalesExport) {
        posicionesComercialesArrayOperativo.push('ventasInternacionalesExport');
        detallePosicionesComercialesArrayOperativo.push({
          posicion: 'ventasInternacionalesExport',
          estudios: estudiosVentasInternacionalesExport,
          detalles: detallesVentasInternacionalesExport
        })
      }
      if (comercialTecnico) {
        posicionesComercialesArrayOperativo.push('comercialTecnico');
        detallePosicionesComercialesArrayOperativo.push({
          posicion: 'comercialTecnico',
          estudios: estudiosComercialTecnico,
          detalles: experienciaComercialTecnico
        })
      }
      if (coordinadorProyectos) {
        posicionesComercialesArrayOperativo.push('coordinadorProyectos');
        detallePosicionesComercialesArrayOperativo.push({
          posicion: 'coordinadorProyectos',
          estudios: estudiosCoordinadorProyectos,
          detalles: experienciaCoordinadorProyectos
        })
      }
      if (gestorProyectos) {
        posicionesComercialesArrayOperativo.push('gestorProyectos');
        detallePosicionesComercialesArrayOperativo.push({
          posicion: 'gestorProyectos',
          estudios: estudiosGestorProyectos,
          detalles: experienciaGestorProyectos
        })
      }
      setArrayPosicionesComerciales(posicionesComercialesArrayOperativo);
      setDetallePosicionesComerciales(detallePosicionesComercialesArrayOperativo)
    }

    actualizarPosicionesComerciales();
  }, [ventasInternacionalesExport, comercialTecnico, coordinadorProyectos, gestorProyectos,
    estudiosVentasInternacionalesExport, detallesVentasInternacionalesExport,
    estudiosComercialTecnico, experienciaComercialTecnico,
    estudiosCoordinadorProyectos, experienciaCoordinadorProyectos,
    estudiosGestorProyectos, experienciaGestorProyectos]
  );


  const ActualizarPosicionesComerciales = async () => {
    try {
      const docRef = doc(db, "users", receivedUser.id);
      const userDoc = await getDoc(docRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;

        let arrayPosicionesToUpdate = userData.posicionesMap?.arrayPosiciones || [];
        let detallePosicionesToUpdate = userData.posicionesMap?.detallePosicionesArray || [];

        if (arrayPosicionesComerciales.length !== 0) {
          for (const item of arrayPosicionesComerciales) {
            const index = arrayPosicionesToUpdate.findIndex((existingItem: string) => existingItem === item);
            if (index !== -1) {
              arrayPosicionesToUpdate[index] = item;
            } else {
              arrayPosicionesToUpdate.push(item);
            }
          }
        }

        if (detallePosicionesComerciales.length !== 0) {
          for (const newItem of detallePosicionesComerciales) {
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
    ActualizarPosicionesComerciales()
    cambioComponenteMostrar('comercial');
  };

  return (
    <div>
      <div>
        <p className='pt-8 text-lg font-bold'>Departamento comercial</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>

        <div className='flex flex-col p-2'>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" checked={ventasInternacionalesExport} onChange={() => handleExperienceToggle(ventasInternacionalesExport, setVentasInternacionalesExport)} />
              <p className='ml-2'>Ventas internacionales y exportación</p>
            </label>
            {ventasInternacionalesExport &&
              <div className='flex flex-col'>
                <textarea
                  placeholder="Estudios relacionados"
                  value={estudiosVentasInternacionalesExport}
                  onChange={(e) => setEstudiosVentasInternacionalesExport(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
                <textarea
                  placeholder="Detalles de la experiencia"
                  value={detallesVentasInternacionalesExport}
                  onChange={(e) => setDetallesVentasInternacionalesExport(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              </div>}
          </div>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" checked={comercialTecnico} onChange={() => handleExperienceToggle(comercialTecnico, setComercialTecnico)} />
              <p className='ml-2'>Comercial Técnico</p>
            </label>
            {comercialTecnico &&
              <div className="flex flex-col">
                <textarea
                  placeholder="Estudios relacionados"
                  value={estudiosComercialTecnico}
                  onChange={(e) => setEstudiosComercialTecnico(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
                <textarea
                  placeholder="Detalles de la experiencia"
                  value={experienciaComercialTecnico}
                  onChange={(e) => setExperienciaComercialTecnico(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              </div>}
          </div>
          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" checked={coordinadorProyectos} onChange={() => handleExperienceToggle(coordinadorProyectos, setCoordinadorProyectos)} />
              <p className='ml-2'>Coordinador de proyectos</p>
            </label>
            {coordinadorProyectos &&
              <div className='flex flex-col'>
                <textarea
                  placeholder="Estudios relacionados"
                  value={estudiosCoordinadorProyectos}
                  onChange={(e) => setEstudiosCoordinadorProyectos(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
                <textarea
                  placeholder="Detalles de la experiencia"
                  value={experienciaCoordinadorProyectos}
                  onChange={(e) => setExperienciaCoordinadorProyectos(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              </div>}
          </div>

          <div className='py-1 pl-5'>
            <label className='flex flex-row items-center'  >
              <input type="checkbox" checked={gestorProyectos} onChange={() => handleExperienceToggle(gestorProyectos, setGestorProyectos)} />
              <p className='ml-2'>Gestor de proyectos</p>
            </label>
            {gestorProyectos &&
              <div className='flex flex-col'>
                <textarea
                  placeholder="Estudios relacionados"
                  value={estudiosGestorProyectos}
                  onChange={(e) => setEstudiosGestorProyectos(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
                <textarea
                  placeholder="Detalles de la experiencia"
                  value={experienciaGestorProyectos}
                  onChange={(e) => setExperienciaGestorProyectos(e.target.value)}
                  className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'>
                </textarea>
              </div>}
          </div>
        </div>

        <button type="submit" onClick={handleGuardarYseguir} className='w-56 mx-auto py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'>
          Guardar y seguir
        </button>

      </div>
    </div>
  );
};

export default Comercial;
