'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import NavUnlogged from '../components/prelogged/NavUnlogged'
import Image from 'next/image';

import Contras from './signupComponents/Contras';

import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, setDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import Tipo from './signupComponents/Tipo';
import Correo from './signupComponents/Correo';
import EmpresasContent from './signupComponents/EmpresasContent';
import ProfesionalesContent from './signupComponents/ProfesionalesContent';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Region from './signupComponents/Region';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [userType, setUserType] = useState('profesional');
  const [isAccepted, setIsAccepted] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");
  const [ubi, setUbi] = useState("");
  const [region, setRegion] = useState("");
  const [actividad, setActividad] = useState("");
  const [cifEmpresa, setCifEmpresa] = useState("");
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    redirect('/dashboard');
  }  
  
  useEffect(() => {
    setVideoUrl("https://vidrioku.s3.eu-west-3.amazonaws.com/videos/HeroVideoVidrioku.mp4");
  }, []);

  const router = useRouter();

  const handleUserTypeChange = (e: any) => {
    setUserType(e.target.value);
  };
  const handleRegionChange = (e: any) => {
    setRegion(e.target.value);
  };

  const addUserInFirebase = async () => {
    if (userType == 'profesional') {
      if (email !== '' && password !== '' && passwordAgain !== '' && nombre !== '' && apellidos !== '' && ubi !== '') {
        const userDocRef = doc(db, 'users', email.trim());

        await setDoc(userDocRef, {
          nombre: nombre.trim(),
          email: email.trim(),
          apellidos: apellidos.trim(),
          edad: edad.trim(),
          genero: genero.trim(),
          ubi: ubi.trim(),
          userType: userType.trim(),
          solicitudes: []
        });
      }
    }
    else {
      if (email !== '' && password !== '' && passwordAgain !== '' && nombre !== '' && cifEmpresa !== '') {
        const userDocRef = doc(db, 'users', email.trim());

        await setDoc(userDocRef, {
          nombre: nombre.trim(),
          email: email.trim(),
          actividad: actividad.trim(),
          userType: userType.trim(),
          cifEmpresa: cifEmpresa.trim(),
          ofertascreadas:[]
        });
      }
    }
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password); 
    addUserInFirebase();  
    setIsAccepted(true);
    setTimeout(() => {
      router.push("/signin");
    }, 3500); 
  };

  return (
    <div className='relative'>
      <video
        className="fixed top-0 left-0 object-cover h-screen w-screen bg-sky-900 overflow-hidden"
        src={videoUrl}
        autoPlay
        loop
        muted
      ></video>
      <div className='relative'>
        <NavUnlogged />

        <div className=" md:mx-56 md:px-56">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  min-h-screen md:mx-24 bg-zinc-900 bg-opacity-30">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                className="mx-auto"
                src="/logos/4.png"
                alt="Your Company"
                width={100}
                height={100}
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Registro
              </h2>
            </div>
            {isAccepted === false && <>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  signup();
                }} className="space-y-6">
                  <Correo setEmail={setEmail} />
                  <Tipo userType={userType} handleUserTypeChange={handleUserTypeChange} />
                  <Contras setPassword={setPassword} setPasswordAgain={setPasswordAgain} />
                  <Region region={region} handleRegionChange={handleRegionChange} />

                  {userType === "profesional" && <ProfesionalesContent setNombre={setNombre} setApellidos={setApellidos}
                    setEdad={setEdad} setGenero={setGenero} setUbi={setUbi} />}
                  {userType === "empresa" && <EmpresasContent setNombre={setNombre} setActividad={setActividad} setCifEmpresa={setCifEmpresa} />}
                  <div>
                    <button
                      disabled={(!email || !password || !passwordAgain || !setNombre || !setApellidos || !setUbi) || (password !== passwordAgain)}
                      onClick={() => signup()}
                      className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      Crear cuenta
                    </button>
                  </div>
              </form>
            </div>
          </>}
          {isAccepted && <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Cuenta creada con éxito
            </h2>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Redireccionando al inicio de sesión...
            </h2>
          </>}
        </div>
      </div>
    </div>
    </div >
  )
}