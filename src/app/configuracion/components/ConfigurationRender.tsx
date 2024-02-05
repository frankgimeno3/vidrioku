import React, { FC, useState } from 'react'
import CambioContra from './CambioContra';
import CambioEmail from './CambioEmail';
import BorrarCuenta from './BorrarCuenta';

interface ConfigurationRenderProps {
    renderElement: string;
    setRenderElement: any;
}

     const ConfigurationRender: FC<ConfigurationRenderProps> = ({ renderElement, setRenderElement }) => {

  return (
    <div className='w-full flex flex-col text-center text-white  '>
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Configuración de la cuenta</h2>
        <div className='m-20'>
        {renderElement == 'none' && 
            <>
            <p>A continuación puede cambiar su email, contraseña, o borrar su cuenta</p>
            <p className='mb-10'>Haga click en una opción para continuar</p>
            <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>setRenderElement('cambiocontra')}
             >              Cambiar mi contraseña
             </button>
             <button
              className="bg-white hover:bg-gray-100 shadow-lg border text-gray-500 border-gray-100 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>setRenderElement('cambioemail')}
             > Cambiar email
              </button>

            <button
              className="bg-gray-200 hover:bg-gray-400 shadow-lg border text-gray-700 border-gray-200 rounded px-4 py-2 mt-5 text-sm m-1"
              onClick={()=>setRenderElement('borrarcuenta')}
             >              Borrar cuenta
             </button>
            </>
        }
                {renderElement == 'cambiocontra' && 
            <CambioContra/>
        }
                {renderElement == 'cambioemail' && 
            <CambioEmail/>
        }
                {renderElement == 'borrarcuenta' && 
            <BorrarCuenta/>
        }
        </div>
    </div>
  )
}

export default ConfigurationRender