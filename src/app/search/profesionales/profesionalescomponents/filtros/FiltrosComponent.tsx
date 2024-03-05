import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FiltrosAplicados from './FiltrosAplicados';
import SeleccionFiltros from './SeleccionFiltros';

interface FiltrosComponentFiltrosProps {
    setArrayFiltros: any;
    arrayFiltros: any;
}

const FiltrosComponent: FC<FiltrosComponentFiltrosProps> = ({ setArrayFiltros, arrayFiltros }) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        setFiltrosRecibidos(arrayFiltros);
        console.log("filtros recibidos", filtrosRecibidos)
    }, [arrayFiltros]);

    const handleFilterClick = (filtro: string) => {
        router.push(`/search/profesionales?ubicacion=${filtro}`);
    };

    return (
        <div className="ml-2 mr-7 my-3 p-2">
            <p>Añadir filtros</p>

            <SeleccionFiltros arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros} />

            <p className="mt-3">Filtros Aplicados</p>
            <FiltrosAplicados arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros} />

            {filtrosRecibidos.length > 0 && (
                <div className="mt-3 flex flex-row">
                    {filtrosRecibidos.map((filtro, index) => (
                        <button key={index} className="block bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mt-2" onClick={() => handleFilterClick(filtro)}>
                            Aplicar filtro: {filtro}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FiltrosComponent;
