import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

interface UnreadNotifprops {
    idnotificacion: any;
    tipo: any;
    redireccion: any;
    content: any;
    estado: any;
    userData: any;
}

const UnreadNotif: FC<UnreadNotifprops> = ({ idnotificacion, tipo, redireccion, content, estado, userData }) => {
    const router = useRouter()

    const [userObject, setUserObject] = useState<any>()
    const [prevUnreadNotifications, setPrevUnreadNotifications] = useState<any>()
    const [prevReadNotifications, setPrevReadNotifications] = useState<any>()
    const [updatedReadNotifications, setUpdatedReadNotifications] = useState<any>([]);
    const [updatedUnreadNotifications, setUpdatedUnreadNotifications] = useState<any>([]);

//utilizamos userData (mail) para hacer fetch a users y obtener el userObject
    useEffect(() => {
        const fetchDoc = async () => {
            if (userData) {
                const docRef = doc(db, "users", userData);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const myUserData = response.data() as any;
                    setUserObject(myUserData);
                }
            }
        };
        fetchDoc();
    }, [userData]);

//usamos el object para crear dos arrays, uno para notif leidas y otro para no leidas
    useEffect(() => {
        if (userObject) {
            setPrevUnreadNotifications(userObject.unreadnotifications)
            setPrevReadNotifications(userObject.readnotifications)
        }
    }, [userObject]);

//creamos una nueva version de las no leidas, ELIMINANDO LA ACTUAL
    useEffect(() => {
        if (prevUnreadNotifications && prevUnreadNotifications.length > 0 && idnotificacion) {
            const filteredArray = prevUnreadNotifications.filter((notification: any) => notification !== idnotificacion);
            setUpdatedUnreadNotifications(filteredArray);
        } else if (prevUnreadNotifications && prevUnreadNotifications.length === 0) {
            setUpdatedUnreadNotifications(prevUnreadNotifications);
        }
    }, [prevUnreadNotifications, idnotificacion]);

//creamos una nueva version de las SÍ leidas, AÑADIENDO LA ACTUAL
    //Esto no se activa con las unread (porque este comp se utiliza solo con las read), por lo que nunca habrá duplicaciones
    useEffect(() => {
        if (prevReadNotifications && prevReadNotifications.length > 0 && idnotificacion) {
            const newArray = [...prevUnreadNotifications, idnotificacion];
            setUpdatedReadNotifications(newArray);
        } else if (prevReadNotifications && prevReadNotifications.length === 0) {
            setUpdatedReadNotifications([idnotificacion]);
        }
    }, [prevReadNotifications, idnotificacion]);

//SOLO AL HACER CLICK se hace un setObject, modificando para el user sus arrays de notif, sustituyendo por los actualizados
    const pasaraunread = (userData: any) => {
        const fetchDoc = async () => {
            if (userData) {
                const docRef = doc(db, "users", userData);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const userObjectData = response.data() as any;
                    const updatedUserData = {
                        unreadnotifications: updatedUnreadNotifications,
                        readnotifications: updatedReadNotifications
                    }
                    const filteredData = Object.fromEntries(
                        Object.entries(updatedUserData).filter(([_, value]) => value !== undefined)
                    );

                    await setDoc(docRef, {
                        ...userObjectData,
                        ...filteredData,
                    }
                    );
                }
            }
        };
        fetchDoc();
    }


    const handleredireccion = () => {
        pasaraunread(userData);

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

export default UnreadNotif