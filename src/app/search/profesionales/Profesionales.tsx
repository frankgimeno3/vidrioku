'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

  

export default function Profesionales() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  }); 
  return (
    <div className="">
 
     </div>
  )
}

Profesionales.requireAuth = true