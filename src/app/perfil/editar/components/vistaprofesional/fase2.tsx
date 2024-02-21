import React, { FC, useEffect, useState } from 'react';

interface fase2Props {
    user: any;
    setTelActualizado: any;
    setLinkedinActualizado: any;
    setEmailActualizado:any;
    setCartaActualizado: any;    
    setFase: any;
}

const Fase2: FC<fase2Props> = ({ user, setTelActualizado, setEmailActualizado, setLinkedinActualizado, setCartaActualizado, setFase }) => {
    const [receivedUser, setReceivedUser] = useState<any>();
    const [hasLinkedin, setHasLinkedin] = useState(false);

    useEffect(() => {
        setReceivedUser(user);
    }, [user]);

    const handleToggleLinkedin = () => {
        setHasLinkedin(prevState => !prevState);
    };

    const handleNextFase = () => {
        setFase(3);
    };

    return (
        <div className='flex flex-col'>
            <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
            <p className='text-gray-500 text-lg'>Información de contacto <span className='font-bold text-gray-600 text-lg'>(Parte 2/3)</span></p>
            <div className="flex flex-col mx-60">
            <div className="flex flex-row pt-12">
                    <div className="flex flex-col m-2  w-full">
                    <label htmlFor="tel">Teléfono de contacto</label>
                    <input
                        type="text"
                        id="tel"
                        name="tel"
                        placeholder={user?.tel || "Inserte aquí la URL de su número de teléfono"}
                        onChange={(e) => setTelActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                        />
                </div>
                <div className="flex flex-col m-2 w-full ">
                    <label htmlFor="email">Email de contacto</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder={user?.email || "Inserte aquí la URL de su número de teléfono"}
                        onChange={(e) => setEmailActualizado(e.target.value)}
                        className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                        />
                </div>
                </div>
                <div className="flex flex-col my-2">
                    <div className="flex items-center mx-auto pt-12">
                        <label htmlFor="hasLinkedin" className="mr-2">Tiene cuenta de Linkedin?</label>
                        <input
                            type="checkbox"
                            id="hasLinkedin"
                            name="hasLinkedin"
                            checked={hasLinkedin}
                            onChange={handleToggleLinkedin}
                            className="form-checkbox h-5 w-5 text-gray-600"
                        />
                    </div>
                    {hasLinkedin && (
                        <div className="flex flex-col my-2">
                            <label htmlFor="linkedin">Perfil de Linkedin</label>
                            <input
                                type="text"
                                id="linkedin"
                                name="linkedin"
                                placeholder="Inserte aquí la URL de su perfil de Linkedin"
                                onChange={(e) => setLinkedinActualizado(e.target.value)}
                                className='w-full text-center bg-transparent shadow rounded border border-gray-100 placeholder-gray-400'
                                />
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-between text-center justify-center pt-3  my-5 rounded text-gray-500 ">
                    <label htmlFor="carta" className='my-2 mb-2 text-lg'>Carta de presentación</label>
                    <textarea
                        placeholder={receivedUser?.descripcion || "Añada aquí una descripción completa de su empresa, y los servicios que ofrece"}
                        className='w-full text-left bg-transparent shadow rounded border border-gray-100 placeholder-gray-400 p-6 h-56'
                        onChange={(e) => setCartaActualizado(e.target.value)}
                    ></textarea>
                    <div>
                        <button
                            className='py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'
                            onClick={() => { handleNextFase() }}>Siguiente fase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fase2;
