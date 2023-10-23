import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; 

// interface NavbarProps {
//   currentComponent: string;
//   setCurrentComponent: (component: string) => void;
// }

// const Navbar: FC<NavbarProps> = ({ currentComponent, setCurrentComponent }) => {

const Publicaciones: FC = ({  }) => {
   const router = useRouter();  

   

   return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600">
    <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Publicaciones</h2>
    <div className=" mx-6  bg-white  h-full text-zinc-900">
      <div className="p-5">

        </div>
      </div>
    </div>
  );
};

export default Publicaciones;