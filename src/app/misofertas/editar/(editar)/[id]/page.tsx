"use client"
import { FC, useEffect, useState } from 'react';
import Navbar from '../../../../components/Navbar'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface EditarOfertaProps {
  params: { id: any }
}

type OfertaObject = {
  titulo: any,
  cargo: any,
  jornada: any,
  tipoubi: any,
  ubicacion: any,
  descripcion: any,
  experiencia: any,
  adicional: any,
  empresa: any,
  estado: any,
  id: any
};

const EditarOferta: FC<EditarOfertaProps> = ({ params }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [oferta, setOferta] = useState<OfertaObject>();
  const [presentacion, setPresentacion] = useState("")

  const [tituloOferta, setTituloOferta] = useState<any>()
  const [empresaOferta, setEmpresaOferta] = useState<any>()
  const [cargoOferta, setCargoOferta] = useState<any>()
  const [descripcionOferta, setDescripcionOferta] = useState<any>()
  const [tipoUbiOferta, setTipoUbiOferta] = useState<any>()
  const [ubicacionOferta, setUbicacionOferta] = useState<any>()
  const [experienciaOferta, setExperienciaOferta] = useState<any>()
  const [jornadaOferta, setJornadaOferta] = useState<any>()
  const [estadoOferta, setEstadoOferta] = useState<any>()
  const [publicacionOferta, setPublicacionOferta] = useState<any>()
  const [adicionalOferta, setAdicionalOferta] = useState<any>()

  const [isChecked, setChecked] = useState<any>();
  const [userId, setUserId] = useState("")
  const [userImg, setUserImg] = useState<any>()

  //primero detectamos el usuario, registramos su id, y de paso bloqueamos la ruta
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });


  useEffect(() => {
    if (session?.data?.user?.email) {
      setUserId(session.data.user.email);
      } else { setUserId("Usuario") }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    const fetchDoc = async () => {
      if (userId) {
        const docRef = doc(db, "users", userId);
        const response = await getDoc(docRef);
        if (response.exists()) {
          const myUserData = response.data() as any;
          setUserImg(`${myUserData.profilepicture}`)
          }
      }
    };

    fetchDoc();
  }, [userId]);
 

  useEffect(() => {
    if(oferta){     setChecked(oferta.estado)}
  }, [oferta]);

  //luego, mostramos la oferta que conocemos por los params
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ofertasCollection = collection(db, 'ofertas');
      const q = query(ofertasCollection, where('id', '==', params.id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setOferta(doc.data() as OfertaObject);
      });

      setLoading(false);
    };

    fetchData();
  }, [params.id]);


  const editarOferta = async (
    ofertaId: any
  ) => {
    try {
      const docRef = doc(db, "users", ofertaId);
      const offerDoc = await getDoc(docRef);

      if (offerDoc.exists()) {
        const offerData = offerDoc.data();

        // Elimina campos con valores undefined
        const updatedData = {
          id: oferta?.id,
          titulo: tituloOferta,
          cargo: cargoOferta,
          descripcion: descripcionOferta,
          tipoubi: tipoUbiOferta,
          ubicacion: ubicacionOferta,
          experiencia: experienciaOferta,
          jornada: jornadaOferta,
          estado: estadoOferta,
          publicacion: publicacionOferta,
          adicional: adicionalOferta,
        };

        // Filtra campos undefined
        const filteredData = Object.fromEntries(
          Object.entries(updatedData).filter(([_, value]) => value !== undefined)
        );

        await setDoc(docRef, {
          ...offerData,
          ...filteredData,
        });
      } else {
        console.error('El documento de la oferta no existe');
      }
    } catch (error) {
      console.error('Error al editar la oferta:', error);
    }
  };

  const eliminarExperiencia = (index: any) => {
    //gestionar aquí cómo se elimina la experiencia
  }
  const añadirExperiencia = () => {
    //gestionar aquí cómo se elimina la experiencia
  }

  const handleToggle = () => {
    setChecked(!isChecked);
    setEstadoOferta(!isChecked)
   };

  return (
    <>
      <Navbar />
      <div className="flex flex-col  max-h-screen bg-zinc-800 ">

        <div className='flex flex-col   mx-12 bg-white '>
          <div className='bg-white flex flex-row w-full h-screen '>
            <div className="flex  flex-col bg-gray-50 shadow-lg h-full text-center items-center w-full text-gray-500 py-8   ">
              <Image src={userImg || "/inventedlogos/1.png"} alt="pepo" className='shadow-xl ' height={200} width={200} />
              <h2 className="mt-5 text-xl ">Modifique los campos que desee cambiar, y luego pulse "Editar oferta".</h2>
              <div className="flex flex-col w-full px-96 m-5 shadow py-5 bg-white font-light ">
                <div className="flex flex-col my-2 w-full  ">
                  <label htmlFor="titulo" className='font-medium text-gray-500' >Título de la oferta: </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    placeholder={oferta?.titulo}
                    onChange={(e) => setTituloOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '
                  />
                </div>

                <div className="flex flex-col my-2  ">
                  <label htmlFor="cargo" className='font-medium text-gray-500'>Cargo ofrecido: </label>
                  <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    placeholder={oferta?.cargo}
                    onChange={(e) => setCargoOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '                  />
                </div>
                <div className="flex flex-col my-2  ">
                  <label htmlFor="descripcion" className='font-medium text-gray-500'>Descripción: </label>
                  <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    placeholder={oferta?.descripcion}
                    onChange={(e) => setDescripcionOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '                  />
                </div>
                <div className="flex flex-col my-2  ">
                  <label htmlFor="tipoubi" className='font-medium text-gray-500'>Tipo de trabajo: </label>
                  <input
                    type="text"
                    id="tipoubi"
                    name="tipoubi"
                    placeholder={oferta?.tipoubi}
                    onChange={(e) => setTipoUbiOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '                  />
                </div>
                <div className="flex flex-col my-2  ">
                  <label htmlFor="ubi" className='font-medium text-gray-500'>Ubicación del empleo: </label>
                  <input
                    type="text"
                    id="ubi"
                    name="ubi"
                    placeholder={oferta?.ubicacion}
                    onChange={(e) => setUbicacionOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '                  />
                </div>
                <div className="flex flex-col my-2  ">
                  <label htmlFor="nombre" >Experiencia requerida: </label>
                  <div className='mt-2'>
                    {oferta?.experiencia.map((experiencia: any, index: any) => (
                      <div className="relative flex flex-row my-2 mx-12 bg-white px-3 py-2 rounded shadow-xl 
                      border border-gray-100" key={index}>
                        <div className='flex my-1 flex-row justify-center text-center  w-full'>{experiencia}</div>
                        <button className='absolute top-2 right-2 px-3 py-1 bg-gray-50 rounded shadow border
                       border-gray-100 hover:bg-gray-100'
                          onClick={() => { eliminarExperiencia(index) }}>Eliminar</button>
                      </div>
                    ))}
                    <input
                      className='rounded border border-gray-200 shadow w-96 my-5 mx-2'
                    />
                    <button className='  px-3 py-1 bg-gray-50 rounded shadow border  border-gray-100 hover:bg-gray-100'
                      onClick={() => { añadirExperiencia() }}>
                      Añadir experiencia
                    </button>
                  </div>
                </div>
                <div className="flex flex-col my-2  ">
                  <label htmlFor="nombre" className='font-medium text-gray-500'>Tipo de jornada: </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder={oferta?.jornada}
                    onChange={(e) => setJornadaOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '                  />
                </div>
                <div className="flex flex-col my-2  ">
                  <label htmlFor="nombre" className='font-medium text-gray-500'>Estado de la oferta: </label>
                  <label htmlFor="toggleVehiculo" className="flex items-center cursor-pointer mx-auto my-3">
                    <span className="ml-2">Inactiva</span>
                    <input
                      type="checkbox"
                      id="toggleVehiculo"
                      className="hidden"
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                    <div className={`mx-4 relative w-12 h-6  rounded-full transition-all duration-300 ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      <div className={`absolute left-0 w-6 h-6 bg-white rounded-full transform ${isChecked ? 'translate-x-full' : 'translate-x-0'} transition-all duration-300`}></div>
                    </div>
                    <span className="ml-2">Activa</span>
                  </label>
                </div>

                <div className="flex flex-col my-2  ">
                  <label htmlFor="nombre" className='font-medium text-gray-500'>Información adicional: </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder={oferta?.adicional}
                    onChange={(e) => setAdicionalOferta(e.target.value)}
                    className='w-full text-center bg-gray-50 bg-opacity-10  rounded border border-gray-300  '                  />
                </div>
                <button
                  className="p-2 border shadow-lg rounded-lg text-base mt-1 w-36 text-center mx-auto"
                // onClick={() => oferta && editarOferta()}
                >
                  Editar Oferta
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
    ;
}
export default EditarOferta;    