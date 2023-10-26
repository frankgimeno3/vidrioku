import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cuadrados from './Cuadrados';

const inter = Inter({ subsets: ['latin'] })

const Bolsas: React.FC = ({  }) => {
  const [scrollOpacity, setScrollOpacity] = useState(0.5);

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
    <div className="pb-20  ">
      <h2 className="text-4xl   mb-3 text-white">
        Bolsa de empleo técnico{" "}
      </h2>
        <h2 className="font-bold text-white text-4xl ">especializada en el sector del vidrio</h2>
      <h2 className="text-lg text-white mt-2">
        Haga click en uno de los sectores que aparecen a continuación <br />
        para acceder a la bolsa de empleo especializada que desee
      </h2>
    </div>
    <div className=" md:mx-24 md:px-24 ">
        <Cuadrados/>
     </div>
  </div>
  )
}
export default Bolsas