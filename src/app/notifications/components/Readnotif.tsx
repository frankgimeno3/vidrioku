import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

interface Readnotifprops {
    idnotificacion: any;
    tipo: any;
    redireccion: any;
    content: any;
    estado: any;
    userData: any;
}

const Readnotif: FC<Readnotifprops> = ({ idnotificacion, tipo, redireccion, content, estado, userData }) => {
    const router = useRouter()



    const handleredireccion = () => {
            router.push(redireccion);
    }

    return (
        <>
            <div onClick={handleredireccion}>
                <div className=" mx-6 pb-3 bg-white bg-opacity-60 hover:bg-opacity-70  text-zinc-100  rounded-lg my-6">
                    <h2 className='text-right pr-3 pt-2 text-zinc-700 text-sm'>{tipo}</h2>
                    <h2 className='mt-1 text-sm mb-2 mx-5'>{content}</h2>
                </div>

            </div>
        </>
    )
}

export default Readnotif