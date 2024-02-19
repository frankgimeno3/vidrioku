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
      <p className='text-gray-500 text-lg'>Descripción de la empresa <span className='font-bold text-gray-600 text-lg'>(Parte 2/3)</span></p>
      <div className="flex flex-col  my-2">
        <label htmlFor="actividad"  className='mt-5 mb-2 text-lg' >Actividad </label>
        <div className="flex flex-row  ">
          <div className="flex flex-col flex-1 my-2 text-left pl-36">
            <div className=''>
              <label className="flex flex-row my-2">
                <input
                  type="checkbox"
                  value="Transformador"
                  checked={actividadSeleccionada?.includes("Transformador")}
                  onChange={handleActividadChange}
                  className='my-1'
                />
                <p className='pl-3'>Transformación y tratamiento de vidrio</p>
              </label>
            </div>
            <div>
              <label className="flex flex-row my-2">
                <input
                  type="checkbox"
                  value="Almacenista"
                  checked={actividadSeleccionada?.includes("Almacenista")}
                  onChange={handleActividadChange}
                  className='my-1'
                />

                <p className='pl-3'>Almacenista de vidrio</p>
              </label>
            </div>
            <div>
              <label className="flex flex-row my-2">
                <input
                  type="checkbox"
                  value="Cristaleria"
                  checked={actividadSeleccionada?.includes("Cristaleria")}
                  onChange={handleActividadChange}
                  className='my-1'
                />
                <p className='pl-3'>Cristalería</p>
              </label>
            </div>
          </div>
          <div className="flex flex-col flex-1 my-1 text-left pr-12">
            <div>
              <label className="flex flex-row my-2">
                <input
                  type="checkbox"
                  value="Maquinaria"
                  checked={actividadSeleccionada?.includes("Maquinaria")}
                  onChange={handleActividadChange}
                  className='my-1'
                />
                <p className='pl-3'>Fabricante de maquinaria para el sector del vidrio y acristalamientos</p>
              </label>
            </div>
            <div>
              <label className="flex flex-row my-2">
                <input
                  type="checkbox"
                  value="Suministros"
                  checked={actividadSeleccionada?.includes("Suministros")}
                  onChange={handleActividadChange}
                  className='my-1'
                />
                <p className='pl-3'>Fabricante de suministros para manufactura de vidrio y acristalamientos</p>
              </label>
            </div>
            <div>
              <label className="flex flex-row my-2">
                <input
                  type="checkbox"
                  value="Otros"
                  checked={actividadSeleccionada?.includes("Otros")}
                  onChange={handleActividadChange}
                  className='my-1'
                />
                <p className='pl-3'>Otros</p>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between text-center justify-center px-24 pt-3 mx-10 my-5 rounded text-gray-500 ">
          <label htmlFor="descripcion" className='my-2 mb-2 text-lg' >Descripción </label>
          <textarea
            placeholder={receivedUser?.descripcion || "Añada aquí una descripción completa de su empresa, y los servicios que ofrece"}
            className='w-full text-left bg-transparent shadow rounded border border-gray-100 placeholder-gray-400 p-4 py-6'
            onChange={(e) => setDescripcionActualizado(e.target.value)}
          ></textarea>
          <div>
            <button
              className='py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'
              onClick={() => { handleNextFase() }} > Siguiente fase</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default fase2;
