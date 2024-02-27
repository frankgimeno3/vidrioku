import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import Comercial from './comercial'
import Tecnico from './tecnico'
import Mantenimiento from './mantenimiento'
import Operario from './operario'
import Calidad from './calidad'
import Logistica from './logistica'
import ComponenteFinal from './componenteFinal'
import Compras from './Compras';


interface parte2Props {
    user: any;
    setParte: any;
    departamentosUpdated: any;
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

const Parte2: FC<parte2Props> = ({ user, setParte, departamentosUpdated }) => {
    const [departamentosInicial, setDepartamentosInicial] = useState<Array<string>>([]);
    const [departamentosActual, setDepartamentosActual] = useState<Array<string>>([]);
    const [componenteAmostrar, setComponenteAmostrar] = useState<string>('');
    const [receivedUser, setReceivedUser] = useState<any>();

    useEffect(() => {
        setReceivedUser(user);
        console.log("user recibido desde comercial", user)
    }, [user]);



    useEffect(() => {
        if (departamentosUpdated.length !== 0) {
            setDepartamentosInicial(departamentosUpdated);
            setDepartamentosActual(departamentosUpdated);
        }
    }, [departamentosUpdated]);

    useEffect(() => {
        if (departamentosInicial.length !== 0) {
            setComponenteAmostrar(departamentosInicial[0]);
        }
    }, [departamentosInicial]);

    const cambioComponenteMostrar = (componenteActual: string) => {
        if (departamentosActual.length !== 0) {
            const updatedDepartamentos = departamentosActual.filter(componente => componente !== componenteActual);
            setDepartamentosActual(updatedDepartamentos);
            if (updatedDepartamentos.length !== 0) {
                setComponenteAmostrar(updatedDepartamentos[0]);
            } else {
                setComponenteAmostrar('ComponenteFinal');
            }
        } else {
            setComponenteAmostrar('ComponenteFinal');
        }
    }

    return (
        <div className='flex flex-col'>
                  <p className='pt-8 text-lg font-bold'> {componenteAmostrar}</p>
                  {componenteAmostrar === 'comercial' &&
                <Comercial user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
                       {componenteAmostrar === 'compras' &&
                <Compras user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
            {componenteAmostrar === 'tecnico' &&
                <Tecnico user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
            {componenteAmostrar === 'mantenimiento' &&
                <Mantenimiento user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
            {componenteAmostrar === 'operario' &&
                <Operario user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
            {componenteAmostrar === 'calidad' &&
                <Calidad user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
            {componenteAmostrar === 'logistica' &&
                <Logistica user={receivedUser} cambioComponenteMostrar={cambioComponenteMostrar} />
            }
            {componenteAmostrar === 'componenteFinal' &&
                <ComponenteFinal user={receivedUser} />
            }

        </div>
    );
};

export default Parte2;
