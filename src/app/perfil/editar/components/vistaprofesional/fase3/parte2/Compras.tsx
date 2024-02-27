import React, { FC, useState } from 'react';

interface ExperienciaItem {
  Experiencia: string;
  Estudios: string;
  Detalles: string;
}

interface ComercialProps {
  user: any;
  cambioComponenteMostrar: any;
}

const Comercial: FC<ComercialProps> = ({ user, cambioComponenteMostrar }) => {

  const [compraMaquinaria, setCompraMaquinaria] = useState(false);
  const [compraSuministros, setCompraSuministros] = useState(false);
  const [otrasCompras, setOtrasCompras] = useState(false);

  const [experienciaComercial, setExperienciaComercial] = useState<ExperienciaItem[]>([]);
  const [experienciaCompras, setExperienciaCompras] = useState<ExperienciaItem[]>([]);

  const [estudiosRelacionados, setEstudiosRelacionados] = useState('');
  const [detallesExperiencia, setDetallesExperiencia] = useState('');



  const handleExperienceToggle = (estado: any, setter: any) => {
    if (estado == true) { setter(false) }
    if (estado == false) { setter(true) }
  }

  const handleEstudiosChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEstudiosRelacionados(event.target.value);
  };

  const handleDetallesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetallesExperiencia(event.target.value);
  };

  const  updateEstudiosYexpe = (experiencia: string) => {
    const estudios = estudiosRelacionados.trim();
    const detalles = detallesExperiencia.trim();
    if (estudios && detalles) {
      const newItem: ExperienciaItem = { Experiencia: experiencia, Estudios: estudios, Detalles: detalles };

        setExperienciaCompras([...experienciaCompras, newItem]);
   
      setEstudiosRelacionados('');
      setDetallesExperiencia('');
    } else {
      alert('Por favor, complete los campos de estudios relacionados y detalles de la experiencia.');
    }
  };

  const handleGuardarYseguir = () => {
    // updateEstudiosYexpe(departamentosUpdated);
    cambioComponenteMostrar('comercial');
};


  return (
    <div>
      <div>
      <p className='pt-8 text-lg font-bold'> Departamento de Compras</p>
        <p>Haga click en una de las siguientes opciones si ha trabajado en dicha posición, o tiene estudios relacionados con dicho departamento</p>

  
              <div className='flex flex-col p-2'>
                <div className='py-1 pl-5'>
                  <label className='flex flex-row items-center'  >
                    <input type="checkbox" onChange={() => handleExperienceToggle(compraMaquinaria, setCompraMaquinaria)} />
                    <p className='ml-2'>Compra de maquinaria industrial</p>
                  </label>
                  {compraMaquinaria && <div className='flex flex-col'>
                    <textarea placeholder="Estudios relacionados" value={estudiosRelacionados} onChange={handleEstudiosChange}
                      className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
                    <textarea placeholder="Detalles de la experiencia" value={detallesExperiencia} onChange={handleDetallesChange}
                      className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
                  </div>}
                </div>

                <div className='py-1 pl-5'>
                  <label className='flex flex-row items-top'  >
                    <input type="checkbox" onChange={() => handleExperienceToggle(compraSuministros, setCompraSuministros)}
                      className='my-1' />
                    <p className='ml-2 text-left'>Compra de suministros para fabricación y/o manipulado de vidrio</p>
                  </label>
                  {compraSuministros && <div className='flex flex-col'>
                    <textarea placeholder="Estudios relacionados" value={estudiosRelacionados} onChange={handleEstudiosChange}
                      className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
                    <textarea placeholder="Detalles de la experiencia" value={detallesExperiencia} onChange={handleDetallesChange}
                      className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
                  </div>}
                </div>

                <div className='py-1 pl-5'>
                  <label className='flex flex-row items-center'  >
                    <input type="checkbox" onChange={() => handleExperienceToggle(otrasCompras, setOtrasCompras)} />
                    <p className='ml-2'>Otras experiencias en compras</p>
                  </label>
                  {otrasCompras && <div className='flex flex-col'>
                    <textarea placeholder="Estudios relacionados" value={estudiosRelacionados} onChange={handleEstudiosChange}
                      className='my-1 border-gray-100 placeholder-gray-400 rounded-lg'></textarea>
                    <textarea placeholder="Detalles de la experiencia" value={detallesExperiencia} onChange={handleDetallesChange}
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
