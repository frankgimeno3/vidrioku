import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react' 

const inter = Inter({ subsets: ['latin'] })

const Bolsas: React.FC = ({  }) => {

 
  return (
     <div className='flex flex-col text-center border '>
        <h1>Iniciar Sesión </h1>
        <form className="md:mx-24 text-center md:px-12 py-5 text-xs md:text-lg text-center" 
        // onSubmit={handleLogin}
        >
                            <div className="mb-4 mx-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 border-2 rounded-lg bg-gray-100 bg-opacity-90 text-black placeholder-black"
                                    placeholder="Ingrese correo electrónico"
                                    // value={email}
                                    // onChange={handleEmailChange}
                                />
                            </div>
                            <div className="mb-4 mx-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border-2 rounded-lg bg-gray-100 bg-opacity-90 text-black placeholder-black"
                                    placeholder="Ingrese contraseña"
                                    // value={password}
                                    // onChange={handlePasswordChange}
                                />
                            </div>
                            {/* {errorMessage && (
                                <div className="mb-4 mx-16 text-red-500">
                                    {errorMessage}
                                </div>
                            )} */}
                            <button
                                type="submit"
                                className="bg-yellow-500 text-black rounded-lg shadow-lg px-5 py-3 lg:font-bold   text-sm"
                            >
                                REGISTRARSE
                            </button>
                        </form>
      </div>
  )
}
export default Bolsas