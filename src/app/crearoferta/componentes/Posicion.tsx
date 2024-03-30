import React, { useEffect, useState } from 'react';
import Comercial from './seleccionarPosicion/comercial';
import Compras from './seleccionarPosicion/compras';
import Dtecnico from './seleccionarPosicion/dtecnico';
import Operario from './seleccionarPosicion/operario';
import Mantenimiento from './seleccionarPosicion/mantenimiento';
import Calidad from './seleccionarPosicion/calidad';
import Logistica from './seleccionarPosicion/logistica';
interface PosicionProps {
    departamentos: any;
    posiciones: any;
    setPosiciones: any;
}

const Posicion: React.FC<PosicionProps> = ({ departamentos, posiciones, setPosiciones }) => {
    const [departamentosReceived, setDepartamentosReceived] = useState<any>([])
    useEffect(() => {
        setDepartamentosReceived(departamentos)
        console.log("departamentos desde posicion", departamentos)
    }, [departamentos]);

    return (
        <div className='my-3 px-12 text-gray-500'>
            {departamentosReceived.includes("comercial") &&
                <Comercial posiciones={posiciones} setPosiciones={setPosiciones} />
            }
            {departamentosReceived.includes('compras') &&
                <Compras posiciones={posiciones} setPosiciones={setPosiciones} />
            }
            {departamentosReceived.includes('dtecnico') &&
                <Dtecnico posiciones={posiciones} setPosiciones={setPosiciones} />
            }
            {departamentosReceived.includes('operario') &&
                <Operario posiciones={posiciones} setPosiciones={setPosiciones} />
            }
            {departamentosReceived.includes('mantenimiento') &&
                <Mantenimiento posiciones={posiciones} setPosiciones={setPosiciones} />
            }
            {departamentosReceived.includes('calidad') &&
                <Calidad posiciones={posiciones} setPosiciones={setPosiciones} />
            }
            {departamentosReceived.includes('logistica') &&
                <Logistica posiciones={posiciones} setPosiciones={setPosiciones} />
            }
        </div>
    );
};

export default Posicion;