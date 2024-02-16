'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavUnlogged from '../components/prelogged/NavUnlogged'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
  

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [videoUrl, setVideoUrl] = useState("");

  const { data: session, status } = useSession()

  if (status === "authenticated") {
    redirect('/dashboard');
  }
  
  useEffect(() => {
    setVideoUrl("https://storage.cloud.google.com/vidriokubucket/perfiles.mp4");
  }, []);

  const router = useRouter();

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/signup');
  }
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

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  h-screen md:mx-24 bg-zinc-900 bg-opacity-30">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
                className="mx-auto"
                src="/logos/4.png"
                alt="Your Company"
                width={100}
                height={100}
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Iniciar Sesión
              </h2>
            </div>

            <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              signIn('credentials', { email, password, redirect: true, callbackUrl: '/dashboard' });
          }}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Correo Electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <div onClick={() => router.push('/forgot-password')} className="cursor-pointer font-semibold text-blue-400 hover:text-blue-300">
                        Olvidó su contraseña?
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => signIn('credentials', { email, password, redirect: true, callbackUrl: '/dashboard' })}
                    disabled={!email || !password}
                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>

            </form>
              <p className="mt-10 text-center text-sm text-gray-400">
                No tiene cuenta en Vidrioku? {' '}
                <button onClick={(e) => handleSignup(e)} className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
                  Crear una cuenta
                </button>
              </p>
          </div>
        </div>
      </div>
    </div>

  )
}