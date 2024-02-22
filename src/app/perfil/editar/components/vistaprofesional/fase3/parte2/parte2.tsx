import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface parte2Props {
    user: any;
    setParte: any;
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

const Parte2: FC<parte2Props> = ({ user, setParte }) => {
    const [receivedUser, setReceivedUser] = useState<any>();
    const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({
        comercial: false,
        tecnico: false,
        operario: false,
        mantenimiento: false,
        calidad: false,
        logistica: false,
    });
    const [departamentosUpdated, setDepartamentosUpdated] = useState<Array<string>>([]);

    useEffect(() => {
        setReceivedUser(user);
        // Initialize departamentosUpdated with user's current departments
        if (user && user.departamentos) {
            setDepartamentosUpdated(user.departamentos);
        }
    }, [user]);

    const updateDepartamentos = async (departamentos: Array<string>) => {
        try {
            const docRef = doc(db, "users", receivedUser.id);
            const userDoc = await getDoc(docRef);

            if (userDoc.exists()) {
                const userData = userDoc.data() as User;

                const newData: Partial<User> = {
                    departamentos: departamentos.length !== 0 ? departamentos : userData.departamentos,
                };

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

    const toggleInfo = (option: string) => {
        setShowInfo((prev) => ({ ...prev, [option]: !prev[option] }));
        // Update departamentosUpdated based on the checkbox toggled
        if (departamentosUpdated.includes(option)) {
            setDepartamentosUpdated(departamentosUpdated.filter(depto => depto !== option));
        } else {
            setDepartamentosUpdated([...departamentosUpdated, option]);
        }
    };

    const getInfoText = (option: string) => {
        switch (option) {
            case 'comercial':
                return 'Ha trabajado en el departamento comercial o de compras.';
            case 'tecnico':
                return 'Ha trabajado en el departamento técnico o de ingeniería.';
            case 'operario':
                return 'Ha trabajado como operario en fabricación o instalación en el sector del vidrio y/o las ventanas.';
            case 'mantenimiento':
                return 'Ha trabajado como técnico de mantenimiento y/o prevención.';
            case 'calidad':
                return 'Ha trabajado como técnico de calidad.';
            case 'logistica':
                return 'Ha trabajado como profesional de la logística.';
            default:
                return '';
        }
    };

    useEffect(() => {
        if (receivedUser && receivedUser.departamentos) {
            const updatedShowInfo = { ...showInfo };
            receivedUser.departamentos.forEach((dept: string) => {
                if (dept in updatedShowInfo) {
                    updatedShowInfo[dept] = true;
                }
            });
            setShowInfo(updatedShowInfo);
        }
    }, [receivedUser]);

    return (
        <div className='flex flex-col'>
            <p className='text-gray-500 text-lg'>Haga click si ha trabajado o tiene estudios relacionados con alguno de los siguientes departamentos</p>
            <div>
                <input type="checkbox" id="comercial" onChange={() => toggleInfo('comercial')} />
                <label htmlFor="comercial">Departamento comercial o compras</label><br/>

                <input type="checkbox" id="tecnico" onChange={() => toggleInfo('tecnico')} />
                <label htmlFor="tecnico">Departamento técnico o de ingeniería</label><br/>

                <input type="checkbox" id="operario" onChange={() => toggleInfo('operario')} />
                <label htmlFor="operario">Operario en fabricación o instalación en el sector del vidrio y/o las ventanas</label><br/>

                <input type="checkbox" id="mantenimiento" onChange={() => toggleInfo('mantenimiento')} />
                <label htmlFor="mantenimiento">Técnico de mantenimiento y/o prevención</label><br/>

                <input type="checkbox" id="calidad" onChange={() => toggleInfo('calidad')} />
                <label htmlFor="calidad">Técnico de calidad</label><br/>

                <input type="checkbox" id="logistica" onChange={() => toggleInfo('logistica')} />
                <label htmlFor="logistica">Profesional de la logística</label><br/>
            </div>

            {Object.entries(showInfo).map(([key, value]) => (
                <div key={key}>
                    <button onClick={() => toggleInfo(key)}>{value ? 'Ocultar' : 'Mostrar'} información de {key}</button>
                    {value && <p>{getInfoText(key)}</p>}
                </div>
            ))}

            <button type="submit" onClick={handleNextPart} className="bg-blue-500 text-white px-4 my-2 rounded text-center">
                Seguir para añadir detalles
            </button>
        </div>
    );
};

export default Parte1;
