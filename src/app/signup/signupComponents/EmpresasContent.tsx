import { FC } from 'react';
import { useRouter } from 'next/navigation';


interface EmpresasContentProps {
  setNombre: any
  setActividad: any
  setCifEmpresa:any
}

const EmpresasContent: React.FC<EmpresasContentProps> = ({ setNombre, setActividad, setCifEmpresa }) => {
  const router = useRouter();



  return (
    <>
      <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-white ">
        Nombre de la empresa
      </label>
      <div className="mt-2">
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="nombre"
          onChange={(e) => setNombre(e.target.value)}
          required
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <label htmlFor="cif" className="block text-sm font-medium leading-6 text-white ">
        Cif de la empresa
      </label>
      <div className="mt-2">
        <input
          id="cif"
          name="cif"
          type="text"
          autoComplete="cif"
          onChange={(e) => setCifEmpresa(e.target.value)}
          required
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <label htmlFor="actividad" className="block text-sm font-medium leading-6 text-white  mt-3">
        Actividad de la empresa <span className='font-light'>(puede modificarse más adelante)</span>
      </label>
      <textarea
        id="actividad"
        name="actividad"
        autoComplete="actividad"
        onChange={(e) => setActividad(e.target.value)}
        required
        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      />
    </>
  );
};

export default EmpresasContent;