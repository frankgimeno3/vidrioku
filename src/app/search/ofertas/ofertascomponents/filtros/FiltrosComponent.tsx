import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FiltrosAplicados from './FiltrosAplicados';
import SeleccionFiltros from './SeleccionFiltros';

interface FiltrosComponentFiltrosProps {
    setArrayFiltros: any;
    arrayFiltros: any;
    setRenderOferta: any;
    receivedParamsTratado:any;
}

const FiltrosComponent: FC<FiltrosComponentFiltrosProps> = ({ setArrayFiltros, arrayFiltros, setRenderOferta, receivedParamsTratado }) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState<any[]>([]);
    const [queriesList, setQueriesList] = useState('');
    const router = useRouter();

    useEffect(() => {
        setFiltrosRecibidos(arrayFiltros);
    }, [arrayFiltros]);

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, filtros: string) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del clic en el botón
        let filtrosSinEspacios = filtros.replace(/\s/g, '');
        router.push(`/search/ofertas?${filtrosSinEspacios}`);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 200)    
    };

    useEffect(() => {
        let queriesList = "";
        let queriesArray = [];

        if (Array.isArray(filtrosRecibidos) && filtrosRecibidos.length > 0) {
            queriesArray = filtrosRecibidos?.map(filtro => filtro?.replace(/-/g, "="));

            // Iterate through queriesArray to merge duplicate keys
            const mergedQueries: { [key: string]: string } = {}; // Specify the type of mergedQueries

            queriesArray.forEach(query => {
                const [key, value] = query.split("=");
                if (mergedQueries.hasOwnProperty(key)) {
                    mergedQueries[key] += `, ${value}`;
                } else {
                    mergedQueries[key] = value;
                }
            });

            // Convert merged queries back to array
            queriesArray = Object.entries(mergedQueries).map(([key, value]) => `${key}=${value}`);

            // Join queriesArray with "&"
            queriesList = queriesArray.join("&");
        }

        setQueriesList(queriesList);
    }, [filtrosRecibidos]);

    const backToSearchOfertas = () => {
        router.push('/search/ofertas')
        setRenderOferta(undefined)
        setTimeout(() => {
            window.location.reload();
        }, 200)
    }

    return (
        <div className="ml-2 mr-7 my-3 p-2">
            <p>Añadir filtros</p>

            <SeleccionFiltros arrayFiltros={filtrosRecibidos} setArrayFiltros={setArrayFiltros} />

            <p className="mt-3">Filtros Aplicados</p>
            <FiltrosAplicados  receivedParamsTratado={receivedParamsTratado} setArrayFiltros={setArrayFiltros} arrayFiltros={arrayFiltros}/>

            {filtrosRecibidos.length > 0 && (
                <div className="mt-3 flex flex-row">
                    <button key={queriesList} className="block bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mt-2"
                        onClick={(event) => handleFilterClick(event, queriesList)}>
                        Aplicar filtros
                    </button>
                    <button className="block bg-white px-4 py-2 rounded-md shadow text-gray-500 text-xs mt-2 ml-3"
                        onClick={() => { backToSearchOfertas() }}>
                        Borrar filtros
                    </button>
                </div>
            )}
        </div>
    );
};

export default FiltrosComponent;
