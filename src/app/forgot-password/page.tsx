'use client';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import NavUnlogged from '../components/prelogged/NavUnlogged'
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function ForgotPassword() {
  const router = useRouter();


  const [email, setEmail] = useState('');
  const [videoUrl, setVideoUrl] = useState("");
  const [buttonPushed, setButtonPushed] = useState(false)
  useEffect(() => {
    setVideoUrl("https://storage.cloud.google.com/vidriokubucket/perfiles.mp4");
  }, []);


  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
    setButtonPushed(true)
      setTimeout(()=>{ router.push("/signin")}
      , 4000);

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
      <div className='relative'>    <NavUnlogged />

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
                Olvidé mi contraseña
              </h2>
            </div>
            {!buttonPushed && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  <button
                    onClick={() => resetEmail()}
                    disabled={!email}
                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Enviar cambio de contraseña
                  </button>
                </div>
              </div>
            </div>}
            {buttonPushed && 
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                 <h3>Hemos enviado un mensaje a su correo, por favor, ábralo y cree una nueva contraseña</h3>
              </div>
            </div>
          </div>}
          </div>
        </div>
      </div>
    </div>
  )
}