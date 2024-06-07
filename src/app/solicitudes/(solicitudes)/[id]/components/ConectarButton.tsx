import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface ConectarButtonProps {
    usuario: any}



const ConectarButton: React.FC<ConectarButtonProps> = ({ usuario }) => {
    // tengo comprobado que usuario llega bien

    const router = useRouter()



    // EL USUARIO YA ESTÁ BIEN COMO ESTÁ...


    //creamos funcion para crear primer mensaje para usar + adelante

    return (
        <></>
    )
}

export default ConectarButton
