import { FC, useEffect, useState } from 'react';
import Profesional from './compListados/Profesional';
import ListadoBotones from './ListadoBotones';

interface ProfesionalesListProps {
    receivedParamsTratado: any;
    trabajadoresProfesionales: any;
    setRenderProfesional: any;
}

const ProfesionalesList: FC<ProfesionalesListProps> = ({ receivedParamsTratado, trabajadoresProfesionales, setRenderProfesional }) => {

    //se reciben los filtros, y se pasan sus valores como strings a un array especifico por tipo de filtro
    const [filtrosRecibidos, setFiltrosRecibidos] = useState<any[]>([]);
    const [filtrosDepartamentos, setFiltrosDepartamentos] = useState<any[]>([]);
    const [filtrosPosicion, setFiltrosPosicion] = useState<any[]>([]);
    const [filtrosPais, setFiltrosPais] = useState<any[]>([]);
    const [filtrosIdiomas, setFiltrosIdiomas] = useState<any[]>([]);
    const [filtrosPermiso, setFiltrosPermiso] = useState<any[]>([]);

    useEffect(() => {
        setFiltrosRecibidos(receivedParamsTratado);
    }, [receivedParamsTratado]);

    useEffect(() => {
        if (filtrosRecibidos?.length > 0) {
            filtrosRecibidos.forEach(filtro => {
                const [query, value] = filtro.split('=');
                switch (query.trim()) {
                    case 'Departamentos':
                        setFiltrosDepartamentos(value.split(','));
                        break;
                    case 'Posicion':
                        setFiltrosPosicion(value.split(','));
                        break;
                    case 'Pais':
                        setFiltrosPais(value.split(','));
                        break;
                    case 'Idiomas':
                        setFiltrosIdiomas(value.split(','));
                        break;
                    case 'Carnetdeconducir':
                        setFiltrosPermiso(value.split(','));
                        break;
                    default:
                        break;
                }
            });
        }
    }, [filtrosRecibidos]);

    // se reciben los profesionales como prop, se crea un array para ir eliminando antes de renderizar
    const [profesionalesRenderizar, setProfesionalesRenderizar] = useState<any[]>([]);
    useEffect(() => {
        setProfesionalesRenderizar(trabajadoresProfesionales);
        console.log("trabajadoresProfesionales: ", trabajadoresProfesionales)
    }, [trabajadoresProfesionales]);

    const [profesionalesRenderizarFiltrado, setProfesionalesRenderizarFiltrado] = useState<any[]>([]);
    useEffect(() => {
        let profesionalesFiltrados = profesionalesRenderizar;
        console.log("trabajadoresFiltrados0: ", profesionalesFiltrados)

        if (filtrosDepartamentos.length > 0) {
            console.log("depart true")
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => profesional?.departamentos || profesional?.departamentos?.length === 0);
            //ahora tengo que ir caso por caso, porque el query no es el mismo que lo que se asigna al editar el perfil al arrat departamentos
        }
        

        //EL RESTO NO ESTÁ NI EMPEZADO
        if (filtrosPosicion.length > 0) {
            console.log("posi true")
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => !filtrosPosicion.includes(profesional.posicionesMap));
        }
        
        if (filtrosPais.length > 0) {
            console.log("pais true")
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => !filtrosPais.includes(profesional.pais));
        }
        
        if (filtrosIdiomas.length > 0) {
            console.log("idiomas true")
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => !filtrosIdiomas.includes(profesional.idiomas));
        }
        
        if (filtrosPermiso.length > 0) {
            console.log("permiso true")
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => !filtrosPermiso.includes(profesional.permiso));
        }
        setProfesionalesRenderizarFiltrado(profesionalesFiltrados);
        console.log("trabajadoresFiltrados: ", profesionalesFiltrados)

    }, [profesionalesRenderizar, filtrosDepartamentos, filtrosPosicion, filtrosPais, filtrosIdiomas, filtrosPermiso]);



    //una vez tenemos el listado a renderizar filtrado, filtramos en grupos de 7 
    const [arrayDe7ElementosPorPagina, setArrayDe7ElementosPorPagina] = useState<any[]>([]);
    useEffect(() => {
        const chunkArray = (array: any, size: any) => {
            const result = [];
            for (let i = 0; i < array.length; i += size) {
                result.push(array.slice(i, i + size));
            }
            return result;
        };
        const groupedOffers = chunkArray(profesionalesRenderizarFiltrado, 7);
        setArrayDe7ElementosPorPagina(groupedOffers);
    }, [profesionalesRenderizarFiltrado]);

    //el array definitivo es el de 7 elementos con indice subArraySeleccionado, que es tomado y modificado por los botones de buttonlist
    const [subArraySeleccionado, setSubArrayseleccionado] = useState<number>(0);
    const [arrayMostrado, setArrayMostrado] = useState<any>([]);

    useEffect(() => {
        setArrayMostrado(arrayDe7ElementosPorPagina[subArraySeleccionado]);
    }, [arrayDe7ElementosPorPagina, subArraySeleccionado]);

    const handleProfesionalClick = (trabajador: any) => {
        setRenderProfesional(trabajador);
    };

    return (
        <ul className='flex flex-col h-full '>
            {filtrosRecibidos?.map((contenido: any, index: any) => (
                <p className='text-black text-2xl' key={index}> {contenido}  </p>
            ))}
            {arrayMostrado?.map((trabajador: any, index: any) => (
                <div onClick={() => handleProfesionalClick(trabajador)} key={index} >
                    <Profesional trabajador={trabajador} setRenderProfesional={setRenderProfesional} />
                </div>
            ))}
            <nav className="bg-gray-200 py-2 px-1 text-center  ">
                <ListadoBotones arrayDe7ElementosPorPagina={arrayDe7ElementosPorPagina} subArraySeleccionado={subArraySeleccionado} setSubArrayseleccionado={setSubArrayseleccionado} />
            </nav>
        </ul>
    );
};

export default ProfesionalesList;
