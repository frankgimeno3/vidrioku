import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react' 

const inter = Inter({ subsets: ['latin'] })

const Hero: React.FC = ({  }) => {

 
  return (
    <div className="relative w-full h-screen">
    <video
      className="absolute top-0 left-0 object-cover w-screen h-screen"
      src="/video/perfiles.mp4"
      autoPlay
      loop
      muted
    ></video>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
      <div className="bg-cyan-950 bg-opacity-60 backdrop-filter backdrop-blur-lg w-full pt-10 pb-10">
        <h1 className="text-4xl md:text-6xl text-sky-50 font-bold">
          VIDRIOKU
        </h1>
        <p className="xl:text-2xl text-slate-200 max-w-[45vw] sm:max-w-[50vw] m-auto pt-3 font-light sm:text-xs md:text-xs">
          Conectamos empresas con personal técnico especializado en los 23 países de habla hispana. Únase a nosotros para encontrar talento o empleo desde hoy mismo.
        </p>
      </div>
    </div>
  </div>
  )
}
export default Hero