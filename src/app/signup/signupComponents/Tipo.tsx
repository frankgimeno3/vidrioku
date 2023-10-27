import { FC } from 'react';
 import { useRouter } from 'next/navigation';


interface TipoProps {
    userType: any
    handleUserTypeChange: any
}

const Tipo: React.FC<TipoProps> = ({ userType, handleUserTypeChange }) => {
  const router = useRouter();



  return (
    <div>
    <label htmlFor="userType" className="block text-sm font-medium leading-6 text-white">
      Tipo de cuenta
    </label>
    <div className="mt-2">
      <select
        id="userType"
        name="userType"
        value={userType}
        onChange={handleUserTypeChange}
        required
        className="bg-transparent block w-full rounded-md border-0   py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      >
        <option value="profesional" className='bg-gray-100 text-black'>Profesional</option>
        <option value="empresa" className='bg-gray-100 text-black'>Empresa</option>
      </select>
    </div>
  </div>  );
};

export default Tipo;