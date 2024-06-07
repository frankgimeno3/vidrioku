"use client"
import Navbar from '@/app/components/Navbar';
import { db } from '@/app/firebase';
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'
import DetallesOferta from './components/DetallesOferta';
import DetallesPerfil from './components/DetallesPerfil';
import DetallesSolicitud from './components/DetallesSolicitud';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import Banners from '@/app/components/Banners';
import { Solicitud, User } from '@/app/components/interfaces/interfaces';

 
interface SolicitudesProps {
    params: { id: string }
}
 

const solicitudseleccionada: FC<SolicitudesProps> = ({ params }) => {
    const router = useRouter()

    const [userData, setUserData] = useState<User>();
    const [userObject, setUserObject] = useState<any>();
    const [solicitud, setSolicitud] = useState<Solicitud>();
    const [loading, setLoading] = useState(true);
    const [isOfertaClicked, setIsOfertaClicked] = useState(false)
    const [isPerfilClicked, setIsPerfilClicked] = useState(false)
    const [isSolicitudClicked, setIsSolicitudClicked] = useState(false)
    const [interlocutor, setInterlocutor] = useState();
    const [oferta, setOferta] = useState();
    const [solicitudId, setSolicitudId] = useState()
    const [nosotros, setNosotros] = useState<any>()
     const [conversationRef, setConversationRef] = useState<any>()

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });
    useEffect(() => {
        if (session?.data?.user?.email) {
            setUserData(session.data.user as User);
        } else {
            setUserData(undefined);
        }
    }, [session?.data?.user?.email]);

    useEffect(() => {
        if (userData) {
            setNosotros(userData.email)
        }
    }, [userData]);

    useEffect(() => {
        const fetchDoc = async () => {
          if (userData) {
            const docRef = doc(db, "users", userData.email);
            const response = await getDoc(docRef);
            if (response.exists()) {
              const myUserData = response.data() as User;
              setUserObject(myUserData);
              
            }
          }
        };
    
        fetchDoc();
      }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const solicitudesCollection = collection(db, 'solicitudes');
            const q = query(solicitudesCollection, where('id', '==', params.id));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                setSolicitud(doc.data() as Solicitud);
            });

            setLoading(false);
        };

        fetchData();
    }, [params.id]);

    useEffect(() => {
        if (solicitud) {
            setSolicitudId(solicitud.solicitudId);
            setInterlocutor(solicitud.userId);
            setOferta(solicitud.offerId);
        }
    }, [solicitud]);


    const toggleDetallesOferta = () => {
        setIsOfertaClicked(!isOfertaClicked)
    }

    const toggleDetallesPerfil = () => {
        setIsPerfilClicked(!isPerfilClicked)
    }

    const toggleDetallesSolicitud = () => {
        setIsSolicitudClicked(!isSolicitudClicked)
    }

    const deleteSolicitud = () => {

    }

    const volverSolicitudes = () => {
        router.push("/solicitudes")
    }

    //a partir de aquí, todo va a ser button

    const addConversationToUsuario = async (conversationId: any, usuarioDB: any) => {
        try {
            const docRef = doc(db, "users", usuarioDB);
            const userDoc = await getDoc(docRef);
            if (userDoc.exists()) {
                const datosUsuario = userDoc.data() as User;
                if (datosUsuario.conversations && Array.isArray(datosUsuario.conversations)) {
                    await updateDoc(docRef, {
                        ...datosUsuario,
                        conversations: [...datosUsuario.conversations, conversationId.id],
                    });
                } else {
                    await updateDoc(docRef, {
                        ...datosUsuario,
                        conversations: [conversationId.id],
                    });
                }
            } else {
                console.error('El documento del usuario no existe');
            }
        } catch (error) {
            console.error('Error al añadir conversacion a usuario:', error);
        }
    };

    const addmessageInFirebase = async (conversationId: any, usuario: any, empresa: any) => {
        try {
            const messagesCollection = collection(db, 'messages');
            const newMessageRef = await addDoc(messagesCollection, {
                messageId: '',
                conversationId: conversationId.id,
                emisor: empresa,
                receptor: usuario,
                readc1: true,
                readc2: false,
                sent: Timestamp.now(),
                content: `Hola ${usuario}, somos la empresa ${empresa}, estamos interesados en su perfil.`,
            });
            await updateDoc(newMessageRef, { messageId: newMessageRef.id });
            try {
                const docRef = doc(db, "conversations", conversationId.id);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    const datosConversacion = userDoc.data();
                    if (datosConversacion.messagesArray) {
                        await updateDoc(docRef, {
                            ...datosConversacion,
                            messagesArray: [...datosConversacion.messagesArray, newMessageRef.id],
                        });
                    } else {
                        await updateDoc(docRef, {
                            ...datosConversacion,
                            messagesArray: [newMessageRef.id],
                        });
                    }
                } else {
                    console.error('El documento de la conversacion no parece existir');
                }
            } catch (error) {
                console.error('Error al encontrar la conversacion para añadir el mensaje correspondiente:', error);
            }
        } catch (error) {
            console.error('Error al crear la conversación en Firestore:', error);
        }

    };

    const addNotificationToUsuario = (notifref: any, interlocutor: any) => {
        const fetchDoc = async () => {
            if (interlocutor) {
                const docRef = doc(db, "users", interlocutor);
                const response = await getDoc(docRef);
                if (response.exists()) {
                    const userObjectData = response.data() as any;
                    const updatedUnreadNotifications = userObjectData.unreadnotifications
                        ? [...userObjectData.unreadnotifications, notifref]
                        : [notifref];
    
                    const updatedUserData = {
                        unreadnotifications: updatedUnreadNotifications,
                    }
                    const filteredData = Object.fromEntries(
                        Object.entries(updatedUserData).filter(([_, value]) => value !== undefined)
                    );
    
                    await setDoc(docRef, {
                        ...userObjectData,
                        ...filteredData,
                    });
                }
            }
        };
        fetchDoc();
    };
       
      const crearNotificacion =async (interlocutor:any, conversationId:any, nosotros: any)=>{
        try {
           const notificationssCollection = collection(db, 'notificaciones');
           const newNotificationRef = await addDoc(notificationssCollection, {
               idnotificacion: '',
               content: `Tu solicitud para la empresa ${nosotros} ha sido aceptada. Puedes empezar a chatear.`,
               generada: Timestamp.now(),
               redireccion: `/chat/${conversationId}`,
               tipo: "Mensaje",
               usuario: interlocutor,
            });
    
           await updateDoc(newNotificationRef, { idnotificacion: newNotificationRef.id });
    
           setTimeout(function () {
            addNotificationToUsuario(newNotificationRef.id, interlocutor);
           }, 200);
    
       } catch (error) {
           console.error('Error al crear la conversación en Firestore:', error);
       }
    };
    //creamos funcion para crear conver para usar + adelante. Llamamos desde aqui a la de crear el mensaje.
    const addConversationInFirebase = async (usuario: any, empresa: any) => {
        try {
            const conversationsCollection = collection(db, 'conversations');
            const newConversationRef = await addDoc(conversationsCollection, {
                conversacion: '',
                colaborador1: empresa,
                colaborador2: usuario,
                lastMessageSeenC1: true,
                lastMessageSeenc2: false,
                lastMessageSent: Timestamp.now(),
                messagesArray: []
            });

            await updateDoc(newConversationRef, { conversacion: newConversationRef.id });

            setTimeout(function () {
                addConversationToUsuario(newConversationRef, nosotros);
                addConversationToUsuario(newConversationRef, usuario);
                crearNotificacion(usuario, newConversationRef.id, userObject.nombre)
                setTimeout(function () {
                    addmessageInFirebase(newConversationRef, usuario, nosotros);
                }, 200);
            }, 200);


            setConversationRef(newConversationRef);

        } catch (error) {
            console.error('Error al crear la conversación en Firestore:', error);
        }
    };


    const startConversation = (usuario: any, nosotros: any) => {
        addConversationInFirebase(usuario, nosotros)
    }

    return (
        <>
            <Navbar />

            <div className='flex flex-row w-full h-full justify-between bg-white bg-opacity-90'>
                <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-600 w-full ">
                    <div className='flex flex-row justify-between py-3 bg-zinc-800 bg-opacity-50 px-60'>
                        <h2 className="font-bold text-lg text-center mx-auto">Detalles de la solicitud</h2>
                    </div>
                    <div className="flex flex-col p-5 bg-white bg-opacity-10 text-center h-full">
                        <p className='py-5'>Número de solicitud {params.id}</p>

                        <button className='py-5 bg-gray-50 bg-gray-500  ' onClick={toggleDetallesOferta}>Oferta a la que pertenece</button>
                        {isOfertaClicked && <DetallesOferta oferta={oferta} />}
                        <button className='py-5 bg-gray-50 bg-gray-500 mt-2' onClick={toggleDetallesPerfil}>Detalles del profesional</button>
                        {isPerfilClicked && <DetallesPerfil usuario={interlocutor} />}
                        <button className='py-5 bg-gray-50 bg-gray-500 mt-2' onClick={toggleDetallesSolicitud}>Detalles de la solicitud</button>
                        {isSolicitudClicked && <DetallesSolicitud solicitudId={solicitudId} />}
                        <Link href={'/chat'}>
                            <button className='bg-white px-4 py-2 rounded text-xs text-gray-500 shadow w-56 mx-auto my-2'
                                onClick={() => { startConversation(interlocutor, nosotros) }}>
                                Conectar con el profesional</button>
                        </Link>
                        <button className='bg-white px-4 py-2 rounded text-xs text-gray-500 shadow w-56 mx-auto my-2'>
                            Rechazar solicitud</button>
                        <button className='bg-white px-4 py-2 rounded text-xs text-gray-500 shadow w-56 mx-auto my-2'
                            onClick={volverSolicitudes}>
                            Volver a solicitudes</button>
                    </div>
                </div>
                <div className='h-full bg-white bg-opacity-5'>
                    <Banners widthProp={250} />
                </div>

            </div>
            <Footer />

        </>
    )
}
export default solicitudseleccionada
