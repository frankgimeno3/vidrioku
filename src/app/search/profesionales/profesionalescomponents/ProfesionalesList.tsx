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
    // const [filtrosIdiomas, setFiltrosIdiomas] = useState<any[]>([]);
    const [filtrosPermiso, setFiltrosPermiso] = useState<any[]>([]);

    useEffect(() => {
        setFiltrosRecibidos(receivedParamsTratado);
    }, [receivedParamsTratado]);

    useEffect(() => {
        if (filtrosRecibidos?.length > 0) {
            console.log("filtrosRecibidos: ", filtrosRecibidos)
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
                    // case 'Idiomas':
                    //     const idiomasArray = value.split('idioma:').filter((item: string) => item !== '' && item !== '""');
                    //     const arrayObjetos = idiomasArray.map((item: { split: (arg0: string) => [any, any]; }) => {
                    //         const [idioma, nivel] = item.split(',nivel:');
                    //         return { idioma: idioma.trim(), nivel: nivel?.trim() };
                    //     });
                    //     setFiltrosIdiomas(arrayObjetos);
                    //     break;
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
    }, [trabajadoresProfesionales]);

    const [profesionalesRenderizarFiltrado, setProfesionalesRenderizarFiltrado] = useState<any[]>([]);
    useEffect(() => {
        let profesionalesFiltrados = profesionalesRenderizar;

        //departamentos
        const valoresFiltros = [
            'Departamentocomercial',
            'Departamentosdecomprasoaprovisionamiento',
            'Departamentotécnicoodeingeniería',
            'Operarioenfabricaciónoinstalaciónenelsectordelvidrio',
            'Técnicodemantenimientoy/oprevención',
            'Técnicodecalidad',
            'Profesionaldelalogística'
        ];

        const valoresDepartamentos = [
            'comercial',
            'compras',
            'tecnico',
            'operario',
            'mantenimiento',
            'calidad',
            'logistica'
        ];

        if (filtrosDepartamentos.length > 0) {
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => {
                const departamentoValido = profesional?.departamentos || profesional?.departamentos?.length === 0;
                if (!departamentoValido) return false;
                for (let i = 0; i < valoresFiltros.length; i++) {
                    if (filtrosDepartamentos.includes(valoresFiltros[i]) && profesional.departamentos.includes(valoresDepartamentos[i])) {
                        return true;
                    }
                }
                return false;
            });
        }

        //posiciones - ok

        const OpcionesEnFiltro = [
            'Técnicoencontroldecalidad',
            'Análisisdestocky/oaprovisionamientos,muestreo',
            'Creacióndeinformes',
            'VentasInternacionalesy/oexportación',
            'Comercialtécnico',
            'Coordinadordeproyectos',
            'Gestordeproyectos',
            'Comprademaquinariaindustrial',
            'Compradesuministrosparafabricacióny/omanipuladodevidrio',
            'Otrasexperienciasencompras',
            'Consultoríaodireccióntécnica',
            'Arquitecturatécnica',
            'Análisisocreacióndedocumentacióndeproyectostécnicos',
            'Mejoracontínua',
            'Ingenieríadelaedificación,civil,deminas,electromecánica,industrial,técnica-mecánicauotras',
            'Instalacióndevidriosy/oventanas',
            'Transportistadevidriosy/oventanasfueradefábrica',
            'Profesionalesdealmacénomanipulacióninternadevidriosy/ootrosbienes',
            'Gestióndestock',
            'Electromecánica,técnicoeléctricoy/omecánico',
            'Revisiónymantenimientopreventivodeequipos',
            'Experienciaconsoldaduray/oelectricidad',
            'Carpinteríadealuminioy/ochapa',
            'Serigrafia',
            'Corte,biselado,fresadoy/otratamientoquímicodevidrioplano',
            'Mecanizado',
            'Manipulaciónindustrialdevidrioplanoy/ocurvo',
            'Otrastareascomooperariodefábrica',
        ]
        const OpcionesEnArrayPosiciones = ['tecnicoControlCalidad',
            'analisisStockMuestreo',
            'informesDocumentacionCalidad',
            'ventasInternacionalesExport',
            'comercialTecnico',
            'coordinadorProyectos',
            'gestorProyectos',
            'compraMaquinaria',
            'compraSuministros',
            'otrasCompras',
            'consultoriaDireccionTecnica',
            'arquitecturaTecnica',
            'analisisDocumentacionTecnica',
            'mejoraContinua',
            'ingenierias',
            'instalador',
            'transportista',
            'almacenManipulacionInterna',
            'gestionStockLogisticaExpediciones',
            'tecnicoElectricoMecanico',
            'revisionMantenimiento',
            'reparacionResolucionIncidencias',
            'carpinteriaAluminioChapa',
            'serigrafia',
            'corteBiseladoFresadoTratamientoVidrio',
            'mecanizado',
            'manipulacionVidrios',
            'otrosOperarios',]

        if (filtrosPosicion.length > 0) {
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => {
                const posicionesValidas = profesional?.posicionesMap || profesional?.posicionesMap?.length === 0;
                if (!posicionesValidas) return false;

                for (let i = 0; i < OpcionesEnFiltro.length; i++) {
                    if (filtrosPosicion.includes(OpcionesEnFiltro[i]) && profesional.posicionesMap.arrayPosiciones.includes(OpcionesEnArrayPosiciones[i])) {
                        return true;
                    }
                }
                return false;
            });
        }


        //pais - ok
        if (filtrosPais.length > 0) {
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => {
                return filtrosPais.some(filtro => {
                    return profesional.pais === filtro;
                });
            });
        }


        //idiomas - NEXT ITERATION
        // if (filtrosIdiomas.length > 0) {
        //     profesionalesFiltrados = profesionalesFiltrados.filter(profesional => {
        //         if (profesional.idiomas && Array.isArray(profesional.idiomas)) {
        //             return filtrosIdiomas.some(filtro => {
        //                 const filtroIdiomaMin = filtro.idioma.toLowerCase();
        //                 return profesional.idiomas.some((idiomaProfesional: { idioma: string; }) => {
        //                     const idiomaProfesionalMin = idiomaProfesional.idioma.toLowerCase();
        //                     if (idiomaProfesionalMin === filtroIdiomaMin) {
        //                         return true;
        //                     } else {
        //                         console.log("filtroIdiomaMin: ", filtroIdiomaMin, "idiomaProfesionalMin", idiomaProfesionalMin );
        //                         return false;
        //                     }
        //                 });
        //             });
        //         } else {
        //             return false;
        //         }
        //     });
        // }
        


        //permiso
        if (filtrosPermiso.length > 0) {
            console.log("filtrosPermiso: ", filtrosPermiso)
            profesionalesFiltrados = profesionalesFiltrados.filter(profesional => profesional.permiso == true);
        }
        setProfesionalesRenderizarFiltrado(profesionalesFiltrados);

    }, [profesionalesRenderizar, filtrosDepartamentos, filtrosPosicion, filtrosPais, 
        // filtrosIdiomas, 
        filtrosPermiso]);



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
