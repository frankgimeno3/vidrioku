'use client';
import NavUnlogged from './components/prelogged/NavUnlogged'
import Hero from './components/prelogged/Hero'
import Bolsas from './components/prelogged/Bolsas'
import Contactenos from './components/prelogged/Contactenos'
import Prefooter from './components/prelogged/Prefooter'

import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


export default function Home() {

  const { data: session, status } = useSession()

  if (status === "authenticated") {
    redirect('/dashboard');
  }

  return (
    <>
      <NavUnlogged />
      <div className='flex flex-col bg-gradient-to-b from-blue-500 to-blue-600 min-h-screen text-black  '>

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