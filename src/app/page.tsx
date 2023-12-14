'use client';
import NavUnlogged from './components/prelogged/NavUnlogged'
import Hero from './components/prelogged/Hero'
import Bolsas from './components/prelogged/Bolsas'
import Contactenos from './components/prelogged/Contactenos'
import Prefooter from './components/prelogged/Prefooter'

import { useState } from 'react'


export default function Home() {

  return (
    <>
      <NavUnlogged />
      <div className='flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen text-black  '>

        <Hero />
        <Bolsas />
        <br></br>
        <Contactenos />
      </div>

      <Prefooter />
    </>
  )
}

Home.requireAuth = true