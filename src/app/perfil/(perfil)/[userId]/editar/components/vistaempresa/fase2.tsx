import React, { FC, useEffect, useState } from 'react';

interface fase2Props {
  user: any;
  setActividadActualizado: any;
  setDescripcionActualizado: any;
  setFase: any;
}

const fase2: FC<fase2Props> = ({ user, setActividadActualizado, setDescripcionActualizado, setFase }) => {
  const [receivedUser, setReceivedUser] = useState<any>()

  useEffect(() => {
    setReceivedUser(user)
  }, [user]);


  const [actividadSeleccionada, setActividadSeleccionada] = useState<string[]>(receivedUser?.actividad || []);

  useEffect(() => {
    if (receivedUser) {
      setActividadSeleccionada(receivedUser.actividad);
      setActividadActualizado(receivedUser.actividad);
    }
  }, [receivedUser]);

  const handleActividadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let updatedActividadSeleccionada: string[];
    if (actividadSeleccionada.includes(value)) {
      updatedActividadSeleccionada = actividadSeleccionada.filter(item => item !== value);
    } else {
      updatedActividadSeleccionada = [...actividadSeleccionada, value];
    }
    setActividadSeleccionada(updatedActividadSeleccionada);
    setActividadActualizado(updatedActividadSeleccionada);
  };
  

  const handleNextFase = () => {
    setFase(3);
  };

  return (
    <div className='flex flex-col'>
      <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
      <p className='text-gray-500 text-lg'>Descripción de la empresa <span className='font-bold text-gray-e00 text-lg'>2/3</span></p>
      <div className="flex flex-col  my-2">
        <label htmlFor="actividad" >Actividad: </label>
        <div>
          <label>
            <input
              type="checkbox"
              value="Transformador"
              checked={actividadSeleccionada?.includes("Transformador")}
              onChange={handleActividadChange}
            />
            Transformación y tratamiento de vidrio
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Almacenista"
              checked={actividadSeleccionada?.includes("Almacenista")}
              onChange={handleActividadChange}
            />
            Almacenista de vidrio
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Cristaleria"
              checked={actividadSeleccionada?.includes("Cristaleria")}
              onChange={handleActividadChange}
            />
            Cristalería
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Maquinaria"
              checked={actividadSeleccionada?.includes("Maquinaria")}
              onChange={handleActividadChange}
            />
            Fabricante de maquinaria para el sector del vidrio y acristalamientos
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Suministros"
              checked={actividadSeleccionada?.includes("Suministros")}
              onChange={handleActividadChange}
            />
            Fabricante de suministros para manufactura de vidrio y acristalamientos
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Otros"
              checked={actividadSeleccionada?.includes("Otros")}
              onChange={handleActividadChange}
            />
            Otros
          </label>
        </div>
      </div>
      <div className="flex flex-col p-4 justify-between text-center justify-center px-auto  mx-10 my-5 rounded text-gray-500 ">
        <label htmlFor="descripcion" >Descripción </label>
        <textarea placeholder="Añada aquí una descripción completa de su empresa, y los servicios que ofrece"
          className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
          onChange={(e) => setDescripcionActualizado(e.target.value)}
        ></textarea>
        <div>
          <button
            className='py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'
            onClick={() => { handleNextFase() }} > Siguiente fase</button>
        </div>
      </div>
    </div>
  );
};

export default fase2;
