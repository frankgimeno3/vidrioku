import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Candidatos from './Candidatos';
import Ofertas from './Ofertas';

const inter = Inter({ subsets: ['latin'] })

const Bolsas: React.FC = ({  }) => {
  const [scrollOpacity, setScrollOpacity] = useState(0.5);
  const [bolsasShown, setBolsasShown]= useState("candidatos")
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / pageHeight) * 100;
      const opacity = (scrollPercentage - 20) / 20;
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <div className="w-full    text-center   mt-12">
    <div className="pb-10  ">
      <h2 className="text-4xl   mb-3 text-white">
        Bolsa de empleo técnico{" "}
      </h2>
        <h2 className="font-bold text-white text-4xl ">especializada en el sector del vidrio</h2>
      <h2 className="text-lg text-white mt-2">
        Haga click en uno de los sectores que aparecen a continuación <br />
        para acceder a la bolsa de empleo especializada que desee
      </h2>
    </div>
    <div className='flex flex-row justify-center pb-10'>
    <button className='bg-white rounded-md shadow text-basic mx-5 text-gray-500 px-4 py-2 hover:bg-gray-100 hover:text-gray-700'
    onClick={()=>setBolsasShown("ofertas")}>Ver ofertas</button>
    <button className='bg-white rounded-md shadow text-basic mx-5 text-gray-500 px-4 py-2 hover:bg-gray-100 hover:text-gray-700'
    onClick={()=>setBolsasShown("candidatos")}>Ver candidatos</button>
    </div>
    <div className=" md:mx-24 md:px-24 ">
      {}
    <Candidatos/>
    <Ofertas/>
     </div>
  </div>
  )
}
export default Bolsas