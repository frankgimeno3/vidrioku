import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// interface NavbarProps {
//   currentComponent: string;
//   setCurrentComponent: (component: string) => void;
// }

// const Navbar: FC<NavbarProps> = ({ currentComponent, setCurrentComponent }) => {

const Mensajes: FC = ({ }) => {
  const router = useRouter();

  const [isConversation, setIsConversation] = useState(false)
  const [userSelectedName, setUserSelectedName] = useState("")
  const [userSelectedImg, setUserSelectedImg] = useState("")

  const selectUser1 = () => {
    setIsConversation(true)
    setUserSelectedName("Miquel Àngel Rodriguez")
    setUserSelectedImg("/profilepictures/3.jpg")
  }
  const selectUser2 = () => {
    setIsConversation(true)
    setUserSelectedName("TUROMAS")
    setUserSelectedImg("/inventedlogos/4.png")
  }
  const selectUser3 = () => {
    setIsConversation(true)
    setUserSelectedName("Pepito Ramos")
    setUserSelectedImg("/profilepictures/4.jpg")
  }
  const selectUser4 = () => {
    setIsConversation(true)
    setUserSelectedName("Tvitec")
    setUserSelectedImg("/inventedlogos/5.png")
  }
  const selectUser5 = () => {
    setIsConversation(true)
    setUserSelectedName("GLASTON")
    setUserSelectedImg("/inventedlogos/6.png")
  }

  const backToMenu = () => {
    setIsConversation(false)
    setUserSelectedName("")
    setUserSelectedImg("")
  }
  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 ">
      <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Mensajes</h2>
      {!isConversation &&
        <div className='my-3'>
          <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
            onClick={selectUser1}>
            <Image
              src="/profilepictures/2.jpg"
              alt="ing1"
              width={100}
              height={50}
              className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
            />
            <div className='flex flex-col px-3 flex-3'>
              <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de usuario</h2>

              <div className='flex flex-col'></div>
              <h2 className='mt-1 text-sm   mx-5'>El usuario
                <span className='font-bold'> Miquel Àngel Rodriguez </span>le ha enviado un mensaje </h2>
            </div>
          </div>
          <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
            onClick={selectUser2}>

            <Image
              src="/inventedlogos/4.png"
              alt="ing1"
              width={100}
              height={50}
              className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
            />
            <div className='flex flex-col px-3 flex-3'>
              <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de Empresa</h2>

              <div className='flex flex-col'></div>
              <h2 className='mt-1 text-sm   mx-5'>La empresa
                <span className='font-bold'> TUROMAS </span>le ha enviado un mensaje </h2>
            </div>
          </div>
          <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
            onClick={selectUser3}>

            <Image
              src="/profilepictures/3.jpg"
              alt="ing2"
              width={100}
              height={50}
              className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
            />
            <div className='flex flex-col px-3 flex-3'>
              <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de usuario</h2>

              <div className='flex flex-col'></div>
              <h2 className='mt-1 text-sm   mx-5'>El usuario
                <span className='font-bold'> Pepito Ramos </span>le ha enviado un mensaje </h2>
            </div>
          </div>
          <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
            onClick={selectUser4}>

            <Image
              src="/inventedlogos/5.png"
              alt="ing1"
              width={100}
              height={50}
              className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
            />
            <div className='flex flex-col px-4 flex-3'>
              <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de Empresa</h2>

              <div className='flex flex-col'></div>
              <h2 className='mt-1 text-sm   mx-5'>La empresa
                <span className='font-bold'> TVITEC </span>le ha enviado un mensaje </h2>
            </div>
          </div>
          <div className="flex  flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1"
            onClick={selectUser5}>

            <div className='w-20 border border-white  '>
              <Image
                src="/inventedlogos/6.png"
                alt="ing1"
                width={100}
                height={10}
                className=" shadow-lg rounded-full"
              />
            </div>

            <div className='flex flex-col px-4  '>
              <h2 className='text-right  pt-2 text-gray-400 text-sm'>Mensaje de Empresa</h2>

              <div className='flex flex-col'></div>
              <h2 className='mt-1 text-sm   mx-5'>La empresa
                <span className='font-bold'> GLASTON </span>le ha enviado un mensaje </h2>
            </div>
          </div>
        </div>}
      {isConversation &&
        <div className='flex flex-col h-screen   '>
          <div className="flex flex-row items-center pb-2 px-2 bg-white bg-opacity-10   ">

            <div className='w-8 pt-3 mx-3 '>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"
               onClick={backToMenu}>
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002"
                    stroke="#ffffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                </g>
              </svg>
            </div>
            <div>
              <Image
                src={userSelectedImg}
                alt="ing1"
                width={100}
                height={50}
                className=" shadow-lg rounded-full flex-1 mt-3 ml-3"
              />
            </div>

            <h2 className='pt-2 px-3'>{userSelectedName}</h2>
          </div>

          <div className="flex h-full flex-row  mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 mt-4  ">
            <div className="flex h-full flex-col  h-full mx-6 pb-3 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1">
            </div>
          </div>
          <form className="flex flex-row  mx-6  py-2 bg-white bg-opacity-10  text-zinc-100  rounded-lg my-1 justify-between mb-5">
            <input className='text-gray-300 py-1 pl-5 px-5 text-sm bg-transparent' placeholder='Inserte su texto aquí'></input>
            <button className='text-gray-300  px-2 mr-1 text-sm bg-white bg-opacity-10 rounded-lg text-xs'>Enviar</button>
          </form>
        </div>
      }
    </div>
  );
};

export default Mensajes;