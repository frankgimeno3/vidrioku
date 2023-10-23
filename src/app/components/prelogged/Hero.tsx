import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Hero: React.FC = ({ }) => {


  return (
    <div className='mb-24    border border-green-300'>
    <div className="relative w-full mb-24 pb-24 ">
      <video
        className="hidden md:block absolute top-0 left-0 object-cover h-96 w-screen bg-red-400"
        src="/video/perfiles.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute  w-full flex flex-col justify-center items-center text-center">
        <div className="bg-cyan-950 bg-opacity-60 backdrop-filter backdrop-blur-lg w-full ">
          <h1 className="text-4xl md:text-6xl text-sky-50 font-bold">
            VIDRIOKU
          </h1>
          <p className="xl:text-2xl text-slate-200 max-w-[45vw] sm:max-w-[50vw] m-auto pt-3 font-light sm:text-xs md:text-xs">
            Conectamos empresas del sector del vidrio con personal técnico especializado. </p>
          <p className="xl:text-xl text-slate-200 max-w-[45vw] sm:max-w-[50vw] m-auto pt-1 font-light sm:text-xs md:text-xs">Únase a nosotros para encontrar talento o empleo desde hoy mismo.</p>
        </div>
      </div>
    </div>
    </div>
  )
}
export default Hero