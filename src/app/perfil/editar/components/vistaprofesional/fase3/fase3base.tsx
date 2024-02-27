import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image';
import Parte1 from './parte1'
import Parte2 from './parte2/parte2'

interface fase3Props {
    user:any;
    setFase: any;
}
const fase3: FC<fase3Props> = ({  user, setFase,  }) => {

        const [receivedUser, setReceivedUser] = useState<any>()
        const [parte, setParte] = useState<number>(1)
        const [departamentosUpdated, setDepartamentosUpdated] = useState<Array<string>>([]);

 

    useEffect(() => {
        setReceivedUser(user)
    }, [user]);

    return (
        <div className='flex flex-col'>
            <p className='font-bold text-gray-400 text-2xl'>Modificar información de usuario</p>
            <p className='text-gray-500 text-lg'>Perfil Profesional <span className='font-bold text-gray-e00 text-lg'>(Parte 3/3)</span></p>
            {
                parte == 1  && 
                <Parte1 user={receivedUser} setParte={setParte} departamentosUpdated={departamentosUpdated} setDepartamentosUpdated={setDepartamentosUpdated}/>
             }

{
                parte == 2  && 
                <Parte2 user={receivedUser} setParte={setParte} departamentosUpdated={departamentosUpdated}/>
             }
        </div>
    )
}

export default fase3