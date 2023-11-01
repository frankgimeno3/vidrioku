import { FC } from 'react';
import { useRouter } from 'next/navigation';


interface ProfesionalesContentProps {
    setNombre: any
    setApellidos: any
    setEdad: any
    setGenero: any
    setUbi: any
}

const ProfesionalesContent: React.FC<ProfesionalesContentProps> = ({ setNombre, setApellidos, setEdad, setGenero, setUbi }) => {
    const router = useRouter();

    return (
        <div>
            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-white ">
                Nombre completo (sin apellidos)
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

            <label htmlFor="apellidos" className="block text-sm font-medium leading-6 text-white  mt-3">
                Apellidos
            </label> 
            <div className="mt-2">
                <input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    autoComplete="apellidos"
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
            </div>

            <label htmlFor="edad" className="block text-sm font-medium leading-6 text-white  mt-3">
                Año de nacimiento
            </label> 
            <div className="mt-2">
                <input
                    id="edad"
                    name="edad"
                    type="number"
                    autoComplete="edad"
                    onChange={(e) => setEdad(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
            </div>

            <label htmlFor="genero" className="block text-sm font-medium leading-6 text-white mt-3">
                 Género
            </label> 
            <div className="mt-2">
                <input
                    id="genero"
                    name="genero"
                    type="text"
                    autoComplete="genero"
                    onChange={(e) => setGenero(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
            </div>

            <label htmlFor="ubi" className="block text-sm font-medium leading-6 text-white  mt-3">
                Residencia actual
            </label> 
            <div className="mt-2">
                <input
                    id="ubi"
                    name="ubi"
                    type="text"
                    autoComplete="ubi"
                    onChange={(e) => setUbi(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
};

export default ProfesionalesContent;