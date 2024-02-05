import { auth } from "@/app/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";

function CambioContra() {


    const [email, setEmail] = useState('');



    const resetEmail = () => {
        sendPasswordResetEmail(auth, email);
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
                <p className="font-bold text-xl my-5">Cambio de contraseña</p>
                <p>Introduzca su email para resetear la contraseña</p>
                <p className="text-sm mb-24">Recibirá un correo electrónico a su dirección de email</p>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                       Introduzca su correo electrónico
                    </label>
                    <div className="my-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <button
                        onClick={() => resetEmail()}
                        disabled={!email}
                        className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Enviar cambio de contraseña
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CambioContra;