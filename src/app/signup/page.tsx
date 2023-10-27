'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import NavUnlogged from '../components/prelogged/NavUnlogged'
import Image from 'next/image';

import { collection, addDoc, getDoc, query, onSnapshot, deleteDoc, doc, } from 'firebase/firestore';
import { db } from '../firebase';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [userType, setUserType] = useState('profesional');
  const [isAccepted, setIsAccepted] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setVideoUrl("https://storage.cloud.google.com/vidriokubucket/perfiles.mp4");
  }, []);

  const router = useRouter();

  const handleUserTypeChange = (e: any) => {
    setUserType(e.target.value);
  };

  const addUserInFirebase = async () => {
    if (email !== '' && password !== '' && passwordAgain !== '') {
      await addDoc(collection(db, 'users'), {
        userEmail: email.trim(),
        userType: userType,
      });
    }
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password);
    addUserInFirebase();
    setIsAccepted(true);
    setTimeout(() => {
      router.push("/signin");
    }, 3500); // 2500 milisegundos = 2.5 segundos
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

        <div className=" mx-56 px-56">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  h-screen mx-24 bg-zinc-900 bg-opacity-30">
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
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                      Correo electrónico
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium leading-6 text-white">
                      Tipo de cuenta
                    </label>
                    <div className="mt-2">
                      <select
                        id="userType"
                        name="userType"
                        value={userType}
                        onChange={handleUserTypeChange}
                        required
                        className="bg-transparent block w-full rounded-md border-0   py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      >
                        <option value="profesional" className='bg-gray-100 text-black'>Profesional</option>
                        <option value="empresa" className='bg-gray-100 text-black'>Empresa</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                        Contraseña
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                        Repita la contraseña
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                      onClick={() => signup()}
                      className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </div>
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
    </div>
  )
}