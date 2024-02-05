import React, { FC, useState } from 'react'
import CambioContra from './CambioContra';
import CambioEmail from './CambioEmail';
import BorrarCuenta from './BorrarCuenta';

interface ConfigurationRenderProps {
    renderElement: string;

}

     const ConfigurationRender: FC<ConfigurationRenderProps> = ({ renderElement }) => {

  return (
    <div className='w-full flex flex-col text-center text-white  '>
        <h2 className="bg-zinc-800  bg-white bg-opacity-50 font-bold text-lg  py-3 text-center">Configuración de la cuenta</h2>
        <div className='m-20'>
        {renderElement == 'none' && 
            <>
            <p>A continuación puede cambiar su email, contraseña, o borrar su cuenta</p>
            <p className='my-10'>Haga click en una opción para continuar</p>
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