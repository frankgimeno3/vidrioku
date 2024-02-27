import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface parte1Props {
    user: any;
    setParte: any;
    departamentosUpdated: any;
setDepartamentosUpdated: any;
}

interface User {
    nombre: string;
    anoCreacion: string;
    empleados: any;
    actividad: string;
    ubi: string;
    web: string;
    email: string;
    tel: string;
    linkedin: string;
    descripcion: any;
    departamentos: Array<string>;
}

const Parte1: FC<parte1Props> = ({ user, setParte, departamentosUpdated, setDepartamentosUpdated }) => {
    const [receivedUser, setReceivedUser] = useState<any>();
    const [opcionActual, setOpcionActual] = useState('')

    const [isComercialShown, setIsComercialShown] = useState(false);
    const [isTecnicoShown, setIsTecnicoShown] = useState(false);
    const [isOperarioShown, setIsOperarioShown] = useState(false);
    const [isMantenimientoShown, setIsMantenimientoShown] = useState(false);
    const [isCalidadShown, setIsCalidadShown] = useState(false);
    const [isLogisticaShown, setIsLogisticaShown] = useState(false);

    const [isComercialSelected, setIsComercialSelected] = useState(false);
    const [isTecnicoSelected, setIsTecnicoSelected] = useState(false);
    const [isOperarioSelected, setIsOperarioSelected] = useState(false);
    const [isMantenimientoSelected, setIsMantenimientoSelected] = useState(false);
    const [isCalidadSelected, setIsCalidadSelected] = useState(false);
    const [isLogisticaSelected, setIsLogisticaSelected] = useState(false);


    useEffect(() => {
        setReceivedUser(user);
        if (user && user.departamentos) {
            setDepartamentosUpdated(user.departamentos);
        } else {
            setDepartamentosUpdated([]);
        }
    }, [user]);

    useEffect(() => {
        departamentosUpdated.forEach((departamento: any) => {
            switch (departamento) {
                case 'comercial':
                    setIsComercialSelected(true);
                    break;
                case 'tecnico':
                    setIsTecnicoSelected(true);
                    break;
                case 'operario':
                    setIsOperarioSelected(true);
                    break;
                case 'mantenimiento':
                    setIsMantenimientoSelected(true);
                    break;
                case 'calidad':
                    setIsCalidadSelected(true);
                    break;
                case 'logistica':
                    setIsLogisticaSelected(true);
                    break;
                default:
                    break;
            }
        });
    }, [departamentosUpdated]);


    const selectElement = (option: string) => {
        const isChecked = departamentosUpdated.includes(option);
        let updatedDepartamentos: Array<string>;

        if (isChecked) {
            updatedDepartamentos = departamentosUpdated.filter((dep: string) => dep !== option);
        } else {
            updatedDepartamentos = [...departamentosUpdated, option];
        }
        setDepartamentosUpdated(updatedDepartamentos);

        if (option === 'comercial') {
            setIsComercialSelected(!isChecked);
        } else if (option === 'tecnico') {
            setIsTecnicoSelected(!isChecked);
        } else if (option === 'operario') {
            setIsOperarioSelected(!isChecked);
        } else if (option === 'mantenimiento') {
            setIsMantenimientoSelected(!isChecked);
        } else if (option === 'calidad') {
            setIsCalidadSelected(!isChecked);
        } else if (option === 'logistica') {
            setIsLogisticaSelected(!isChecked);
        }
    };


    const updateDepartamentos = async (departamentos: Array<string>) => {
        try {
            const docRef = doc(db, "users", receivedUser.id);
            const userDoc = await getDoc(docRef);

            if (userDoc.exists()) {
                const userData = userDoc.data() as User;

                const newData: Partial<User> = {
                    departamentos: departamentos.length !== 0 ? departamentosUpdated : userData.departamentos,
                };
                console.log("departamentosUpdated: ", departamentosUpdated, "dep lemngth: ", departamentos.length)

                await updateDoc(docRef, { ...userData, ...newData });
            } else {
                console.error('El documento del usuario no existe');
            }
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
        }
    };

    const handleNextPart = () => {
        updateDepartamentos(departamentosUpdated);
        setParte(2);
    };



    const toggleInfo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: string) => {
        event.preventDefault()
        if (option == 'comercial') {
            if (isComercialShown == true) { setIsComercialShown(false) }
            if (isComercialShown == false) { setIsComercialShown(true) }
        }
        if (option === 'tecnico') {
            if (isTecnicoShown === true) { setIsTecnicoShown(false); }
            if (isTecnicoShown === false) { setIsTecnicoShown(true); }
        }
        if (option === 'mantenimiento') {
            if (isMantenimientoShown === true) { setIsMantenimientoShown(false); }
            if (isMantenimientoShown === false) { setIsMantenimientoShown(true); }
        }
        if (option === 'operario') {
            if (isOperarioShown === true) { setIsOperarioShown(false); }
            if (isOperarioShown === false) { setIsOperarioShown(true); }
        }
        if (option === 'calidad') {
            if (isCalidadShown === true) { setIsCalidadShown(false); }
            if (isCalidadShown === false) { setIsCalidadShown(true); }
        }
        if (option === 'logistica') {
            if (isLogisticaShown === true) { setIsLogisticaShown(false); }
            if (isLogisticaShown === false) { setIsLogisticaShown(true); }
        }
    };


    return (
        <div className='flex flex-col'>
            <p className='text-gray-500 text-lg pt-12 font-bold'>Haga click si ha trabajado o tiene estudios relacionados con alguno de los siguientes departamentos</p>
            <p className='text-gray-500 text-lg text-md pt-1'>Haga click en más información para ver ejemplos de posiciones relacionadas al departamento</p>
            <div className='text-left flex flex-row px-12  pb-3'>
                <div className='flex flex-col px-12 pt-8 pb-3 flex-1'>
                    <div className='flex flex-row items-center'>
                        <input type="checkbox" id='comercial' value='comercial' onChange={() => selectElement('comercial')} checked={isComercialSelected} />
                        <label htmlFor='comercial' className='pl-1'>Departamento comercial o compras</label><br />
                    </div>
                    <div className='pb-2'>
                        {isComercialShown == false &&
                            <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'comercial')} >
                                <p className='text-blue-700 pl-5'> Más información</p>
                                <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                                </svg>
                            </button>
                        }
                        {isComercialShown == true &&
                            <>
                                <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'comercial')}>
                                    <p className='text-blue-900 pl-5'> Más información</p>

                                    <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                                    </svg>
                                </button>
                                <div className='bg-white p-5 flex flex-col'>
                                    <p className='text-black'>Posiciones relacionadas con:</p>
                                    <p className='pl-2'>· Gestor o coordinador de proyectos</p>
                                    <p className='pl-2'>· Ventas internacionales y/o exportación</p>
                                    <p className='pl-2'>· Comercial técnico</p>
                                    <p className='pl-2'>· Departamentos de compras, gestiones de aprovisionamientos</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className='flex flex-row items-center'>
                        <input type="checkbox" id='tecnico' value='tecnico' onChange={() => selectElement('tecnico')} checked={isTecnicoSelected} />
                        <label htmlFor='tecnico' className='pl-1'>Departamento técnico o de ingeniería</label><br />
                    </div>
                    <div className='pb-2'>
                        {isTecnicoShown == false &&
                            <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'tecnico')} >
                                <p className='text-blue-700 pl-5'> Más información</p>
                                <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                                </svg>
                            </button>
                        }
                        {isTecnicoShown == true &&
                            <>
                                <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'tecnico')}>
                                    <p className='text-blue-900 pl-5'> Más información</p>
                                    <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                                    </svg>
                                </button>
                                <div className='bg-white p-5'>
                                    <p className='text-black'>Posiciones relacionadas con:</p>
                                    <p className='pl-2'>· Consultoría o dirección técnica</p>
                                    <p className='pl-2'>· Arquitectura técnica</p>
                                    <p className='pl-2'>· Análisis o creación de documentación de proyectos técnicos</p>
                                    <p className='pl-2'>· Mejora contínua</p>
                                    <p className='pl-2'>· Ingeniería de la edificación, civil, de minas, electromecánica, industrial, técnica-mecánica u otras</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className='flex flex-row items-center'>
                        <input type="checkbox" id='operario' value='operario' onChange={() => selectElement('operario')} checked={isOperarioSelected} className='mt-1' />
                        <label htmlFor='operario' className='pl-1'>Operario en fabricación o instalación en el sector del vidrio y/o las ventanas</label><br />
                    </div>
                    <div className='pb-2'>
                        {isOperarioShown == false &&
                            <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'operario')} >
                                <p className='text-blue-700 pl-5'> Más información</p>
                                <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                                </svg>
                            </button>
                        }
                        {isOperarioShown == true &&
                            <>
                                <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'operario')}>
                                    <p className='text-blue-900 pl-5'> Más información</p>
                                    <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                                    </svg>
                                </button>
                                <div className='bg-white p-5'>
                                    <div className='bg-white p-5'>
                                        <p className='text-black'>Posiciones relacionadas con:</p>
                                        <p className='pl-2'>· Carpintería de aluminio y/o chapa</p>
                                        <p className='pl-2'>· Serigrafía</p>
                                        <p className='pl-2'>· Corte, biselado, fresado y/o tratamiento químico de vidrio plano</p>
                                        <p className='pl-2'>· Mecanizado</p>
                                        <p className='pl-2'>· Manipulación industrial de vidrio plano y/o curvo</p>
                                        <p className='pl-2'>· Otras tareas como operario de fábrica</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    </div>
                    <div className='flex flex-col px-12 pt-8 pb-3 flex-1'>

                    <div className='flex flex-row items-center'>
                        <input type="checkbox" id='mantenimiento' value='mantenimiento' onChange={() => selectElement('mantenimiento')} checked={isMantenimientoSelected} />
                        <label htmlFor='mantenimiento' className='pl-1'>Técnico de mantenimiento y/o prevención</label><br />
                    </div>
                    <div className='pb-2'>
                        {isMantenimientoShown == false &&
                            <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'mantenimiento')} >
                                <p className='text-blue-700 pl-5'> Más información</p>
                                <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                                </svg>
                            </button>
                        }
                        {isMantenimientoShown == true &&
                            <>
                                <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'mantenimiento')}>
                                    <p className='text-blue-900 pl-5'> Más información</p>
                                    <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                                    </svg>
                                </button>
                                <div className='bg-white p-5'>
                                    <div className='bg-white p-5'>
                                        <p className='text-black'>Posiciones relacionadas con:</p>
                                        <p className='pl-2'>· Técnico eléctrico y/o mecánico</p>
                                        <p className='pl-2'>· Revisión y mantenimiento preventivo de equipos</p>
                                        <p className='pl-2'>· Reparación y resolución de incidencias</p>
                                        <p className='pl-2'>· Experiencia con soldadura y/o electricidad</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    <div className='flex flex-row items-center'>
                        <input type="checkbox" id='calidad' value='calidad' onChange={() => selectElement('calidad')} checked={isCalidadSelected} />
                        <label htmlFor='calidad' className='pl-1'>Técnico de calidad</label><br />
                    </div>
                    <div className='pb-2'>
                        {isCalidadShown == false &&
                            <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'calidad')} >
                                <p className='text-blue-700 pl-5'> Más información</p>
                                <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                                </svg>
                            </button>
                        }
                        {isCalidadShown == true &&
                            <>
                                <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'calidad')}>
                                    <p className='text-blue-900 pl-5'> Más información</p>
                                    <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                                    </svg>
                                </button>
                                <div className='bg-white p-5'>
                                    <div className='bg-white p-5'>
                                        <p className='text-black'>Posiciones relacionadas con:</p>
                                        <p className='pl-2'>· Técnico en control de calidad</p>
                                        <p className='pl-2'>· Grados superiores relacionados con química o control de calidad</p>
                                        <p className='pl-2'>· Análisis de stock y/o aprovisionamientos, muestreo</p>
                                        <p className='pl-2'>· Creación de informes de calidad, documentación</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    <div className='flex flex-row items-center'>
                        <input type="checkbox" id='logistica' value='logistica' onChange={() => selectElement('logistica')} checked={isLogisticaSelected} />
                        <label htmlFor='logistica' className='pl-1'>Profesional de la logística</label><br />
                    </div>
                    <div className='pb-2'>
                        {isLogisticaShown == false &&
                            <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'logistica')} >
                                <p className='text-blue-700 pl-5'> Más información</p>
                                <svg className='w-5 h-5 text-gray-400 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                    <path fillRule='evenodd' d='M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z' clipRule='evenodd' />
                                </svg>
                            </button>
                        }
                        {isLogisticaShown == true &&
                            <>
                                <button className='flex flex-row items-center my-1' onClick={(event) => toggleInfo(event, 'logistica')}>
                                    <p className='text-blue-900 pl-5'> Más información</p>
                                    <svg className='w-5 h-5 text-gray-500 ml-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M10 7a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 7z' clipRule='evenodd' />
                                    </svg>
                                </button>
                                <div className='bg-white p-5'>
                                    <div className='bg-white p-5'>
                                        <p className='text-black'>Posiciones relacionadas con:</p>
                                        <p className='pl-2'>· Instalación de vidrios y/o ventanas</p>
                                        <p className='pl-2'>· Transportista de vidrios y/o ventanas fuera de fábrica </p>
                                        <p className='pl-2'>· Profesionales de almacén o manipulación interna de vidrios y/o otros bienes</p>
                                        <p className='pl-2'>· Control de stock y expediciones</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>

            <button type="submit" onClick={() => { handleNextPart() }} className='w-56 mx-auto py-2 px-4 my-8 bg-white hover:bg-gray-50 text-gray-500 text-sm rounded-lg shadow-xl'>
                Seguir para añadir detalles
            </button>
        </div>
    );

};

export default Parte1;
