
import { FC } from 'react';
import { useRouter } from 'next/navigation';


interface ContrasProps {
    setPassword: any,
    setPasswordAgain: any
}

const Contras: React.FC<ContrasProps> = ({ setPassword, setPasswordAgain}) => {

    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                        Contraseña
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                        Repita la contraseña
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                </div>
            </div></>
    );
};

export default Contras;