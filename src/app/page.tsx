'use client';
import NavUnlogged from './components/prelogged/NavUnlogged'
import Hero from './components/prelogged/Hero'
import Bolsas from './components/prelogged/Bolsas'
import Contactenos from './components/prelogged/Contactenos'
import Prefooter from './components/prelogged/Prefooter'
import IniciarSesion from './components/prelogged/IniciarSesion'
import Registro from './components/prelogged/Registro'
import { useState } from 'react'


export default function Home() {
  const [currentComponent, setCurrentComponent] = useState("Hero")

  return (
    <>
    <NavUnlogged currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />
    <div className='flex flex-col bg-gray-50 mx-8 p-8 h-screen text-black py-24'>
    {currentComponent === "Hero" && <div className='flex flex-col '>
        <Hero />
        <br></br>
        <Bolsas />
        <br></br>
        <Contactenos />
      </div>}
      {currentComponent === "Iniciarsesion" && <>
        <IniciarSesion/>
      </>}
      {currentComponent === "Registro" && <>
        <Registro />
      </>}
    </div>
    {/* <Prefooter /> */}
  </>
  )
}

Home.requireAuth = true