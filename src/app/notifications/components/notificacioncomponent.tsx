import Link from 'next/link';
import React, { FC } from 'react'

interface notigicacioncomponentprops {
    tipo: any;
    redireccion:any;
    content: any;
    estado: any;
}

const notificacioncomponent: FC<notigicacioncomponentprops> = ({ tipo, redireccion, content, estado }) => {

    return (
        <Link href={redireccion}>
            {estado == "read" && <div className="  mx-6 pb-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-zinc-100  rounded-lg my-6">
                <h2 className='text-right pr-3 pt-2 text-gray-400 text-sm'>{tipo}</h2>
                <h2 className='mt-1 text-sm mb-2 mx-5'>{content}</h2>
            </div>}
            {estado == "unread" && <div className=" mx-6 pb-3 bg-white bg-opacity-60 hover:bg-opacity-70  text-zinc-100  rounded-lg my-6">
                <h2 className='text-right pr-3 pt-2 text-zinc-700 text-sm'>{tipo}</h2>
                <h2 className='mt-1 text-sm mb-2 mx-5'>{content}</h2>
            </div>}

        </Link>
    )
}

export default notificacioncomponent