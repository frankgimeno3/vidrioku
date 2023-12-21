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

    const [userObject, setUserObject] = useState<any>()
    const [prevUnreadNotifications, setPrevUnreadNotifications] = useState<any>()
    const [prevReadNotifications, setPrevReadNotifications] = useState<any>()
    const [updatedReadNotifications, setUpdatedReadNotifications] = useState<any>([]);
    const [updatedUnreadNotifications, setUpdatedUnreadNotifications] = useState<any>([]);


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

    useEffect(() => {
        if (userObject) {
            setPrevUnreadNotifications(userObject.unreadnotifications)
            setPrevReadNotifications(userObject.readnotifications)
        }
    }, [userObject]);

    useEffect(() => {
        if (prevUnreadNotifications && prevUnreadNotifications.length > 0 && idnotificacion) {
            const filteredArray = prevUnreadNotifications.filter((notification: any) => notification !== idnotificacion);
            setUpdatedUnreadNotifications(filteredArray);
        } else if (prevUnreadNotifications && prevUnreadNotifications.length === 0) {
            setUpdatedReadNotifications(prevUnreadNotifications);
        }
    }, [prevUnreadNotifications, idnotificacion]);

    useEffect(() => {
        if (prevReadNotifications && prevReadNotifications.length > 0 && idnotificacion) {
            const newArray = [...prevUnreadNotifications, idnotificacion];
            setUpdatedUnreadNotifications(newArray);
        } else if (prevReadNotifications && prevReadNotifications.length === 0) {
            setUpdatedReadNotifications([idnotificacion]);
        }
    }, [prevReadNotifications, idnotificacion]);

    const pasaraunread = (userData: any) => {
        const fetchDoc = async () => {
            if (userData) {
                const docRef = doc(db, "users", userData);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const userObjectData = response.data() as any;
                    const updatedUserData = {
                        undereadnotifications: updatedUnreadNotifications,
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

export default Readnotif