import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="w-full   align-center text-center">
    <div className="pb-20 md:mt-12 md:pt-12">
      <h1 className="text-4xl   mb-3 text-white">
        Bolsas de empleo técnico{" "}
        <span className="font-bold text-white">especializado</span>
      </h1>
      <h2 className="text-lg text-white">
        Haga click en uno de los sectores que aparecen a continuación <br />
        para acceder a la bolsa de empleo especializada que desee
      </h2>
    </div>
    <div className="grid grid-cols-1 max-w-7xl mx-auto md:grid-cols-3 gap-20 p-1 mb-10 ">
      <Link href="/Sectores/vidrio">
        <div
          className="bg-white rounded shadow p-10"
          style={{ backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`, height: "30vh" }}
        >
          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Sector del vidrio plano
          </h3>
          <p className="mb-2">
            Contenido del sector del vidrio plano. Aquí puedes escribir una
            descripción o información adicional.
          </p>
        </div>
      </Link>
      <Link href="/Sectores/carpinteria">
        <div
          className="bg-white rounded shadow p-10"
          style={{ backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`, height: "30vh" }}
        >
          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Sector de las ventanas, puertas y cerramientos
          </h3>
          <p className="mb-2">
            Carpintería de metálica, de aluminio, PVC y mixta (madera y
            aluminio)
          </p>
        </div>
      </Link>
      <Link href="/Sectores/otros">
        <div
          className="bg-white rounded shadow p-10"
          style={{ backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`, height: "30vh" }}
        >
          <h3 className="text-2xl mb-2 hover:text-blue-500">
            Sector de la protección solar
          </h3>
          <p className="mb-2">
            Contenido del sector de la protección solar. Aquí puedes escribir
            una descripción o información adicional.
          </p>
        </div>
      </Link>
    </div>
  </div>
  )
}
export default Bolsas