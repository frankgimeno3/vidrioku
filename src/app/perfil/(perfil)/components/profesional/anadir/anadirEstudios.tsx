import React, { FC, useEffect } from 'react';

interface anadirEstudiosProps {
    setIsEstudiosSelected: any;
}

const AnadirEstudios: FC<anadirEstudiosProps> = ({ setIsEstudiosSelected }) => {

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsEstudiosSelected(false);
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [setIsEstudiosSelected]);

    return (
        <>
            <div className='w-screen bg-black bg-opacity-70' style={{ height: '2500px' }}
                onClick={() => { setIsEstudiosSelected(false) }}>
            </div>
            <div className='flex flex-col bg-white text-gray-500 px-5  mx-auto mt-36 pb-16 border border-gray-50 shadow-xl rounded-md' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="flex justify-end py-6 pr-2 ">
                    <svg className="h-8 w-8 cursor-pointer text-gray-300 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                        onClick={() => { setIsEstudiosSelected(false) }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className='px-20'>
                    <p className='text-xl font-medium pb-5'>Añadir estudios, títulos, certificados o reconocimientos</p>
                    <form className='flex flex-col px-5'>
                        <label> Concepto</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Grado superior en electromecánica' />
                        <label> Descripción</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='(opcional)' />
                        <label> Desde</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Año de inicio' />
                        <label> Hasta</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='Año de finalización' />
                        <label> Entidad emisora</label>
                        <input className='bg-white p-2 px-4 mt-1 mb-5 rounded-lg border border-gray-100 shadow placeholder-gray-300'
                            placeholder='UPC - Universitat Politecnica Catalunya' />

                        <button className='bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow text-gray-500 text-xs'>Añadir</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AnadirEstudios;
