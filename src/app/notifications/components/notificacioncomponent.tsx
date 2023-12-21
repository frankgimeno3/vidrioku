import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react'

interface notigicacioncomponentprops {
    idnotificacion: any;
    tipo: any;
    redireccion: any;
    content: any;
    estado: any;
}

const notificacioncomponent: FC<notigicacioncomponentprops> = ({ idnotificacion, tipo, redireccion, content, estado }) => {
    const router = useRouter()
 

    const pasaraunread = (identificacion: any) => {
        const fetchDoc = async () => {
            if (identificacion) {
                 const docRef = doc(db, "notificaciones", identificacion);
                const response = await getDoc(docRef);
                if (response.exists()) {
                     const notificationData = response.data() as any;
                    const updatedNotificationData = {
                        estado: "read"
                    }
                    const filteredData = Object.fromEntries(
                        Object.entries(updatedNotificationData).filter(([_, value]) => value !== undefined)
                    );

                    await setDoc(docRef, {
                        ...notificationData,
                        ...filteredData,
                    }
                    );
                }
            } 
        };
        fetchDoc();
    }


    const handleredireccion = () => {
        pasaraunread(idnotificacion);
    
         setTimeout(() => {
            router.push(redireccion);
        }, 300);  
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

export default notificacioncomponent