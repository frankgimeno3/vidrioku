import { FC, useEffect, useState } from 'react';
import ListadoBotones from '@/app/search/profesionales/profesionalescomponents/ListadoBotones';
import OfertaComponent from './compListados/Oferta';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/userSlice';


interface OfertasListProps {
    receivedParamsTratado: any;
    ofertasArray: any;
    setRenderOferta: any;
    setEmpresa: any;
}

const OfertasList: FC<OfertasListProps> = ({ receivedParamsTratado, ofertasArray, setRenderOferta, setEmpresa }) => {
    const user = useSelector(selectUser);

    // State to store received filters
    const [filtrosRecibidos, setFiltrosRecibidos] = useState<any[]>([]);
    const [filtrosDepartamentos, setFiltrosDepartamentos] = useState<any[]>([]);
    const [filtrosPosicion, setFiltrosPosicion] = useState<any[]>([]);
    const [filtrosPais, setFiltrosPais] = useState<any[]>([]);
    const [filtrosPermiso, setFiltrosPermiso] = useState<any[]>([]);

    // Update filters when receivedParamsTratado changes
    useEffect(() => {
        setFiltrosRecibidos(receivedParamsTratado);
    }, [receivedParamsTratado]);

    useEffect(() => {
        console.log("user: ", user);
    }, [user]);

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

    
    // se reciben las ofertas como prop, se crea un array para ir eliminando antes de renderizar
    const [ofertasRenderizar, setOfertasRenderizar] = useState<any[]>([]);
    useEffect(() => {
        setOfertasRenderizar(ofertasArray);
    }, [ofertasArray]);

    const [ofertasRenderizarFiltradas, setOfertasRenderizarFiltradas] = useState<any[]>([]);
    useEffect(() => {
        let ofertasFiltradas = ofertasRenderizar;

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
            ofertasFiltradas = ofertasFiltradas.filter(oferta => {
                const departamentoValido = oferta?.departamentos || oferta?.departamentos?.length === 0;
                if (!departamentoValido) return false;
                for (let i = 0; i < valoresFiltros.length; i++) {
                    if (filtrosDepartamentos.includes(valoresFiltros[i]) && oferta.departamentos.includes(valoresDepartamentos[i])) {
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
            ofertasFiltradas = ofertasFiltradas.filter(oferta => {
                const posicionesValidas = oferta?.posicionesMap || oferta?.posicionesMap?.length === 0;
                if (!posicionesValidas) return false;

                for (let i = 0; i < OpcionesEnFiltro.length; i++) {
                    if (filtrosPosicion.includes(OpcionesEnFiltro[i]) && oferta.posicionesMap.arrayPosiciones.includes(OpcionesEnArrayPosiciones[i])) {
                        return true;
                    }
                }
                return false;
            });
        }


        //pais - ok
        if (filtrosPais.length > 0) {
            ofertasFiltradas = ofertasFiltradas.filter(oferta => {
                return filtrosPais.some(filtro => {
                    return oferta.pais === filtro;
                });
            });
        }


        //idiomas - NEXT ITERATION
        // if (filtrosIdiomas.length > 0) {
        //     ofertasFiltradas = ofertasFiltradas.filter(  => {
        //         if (oferta.idiomas && Array.isArray(oferta.idiomas)) {
        //             return filtrosIdiomas.some(filtro => {
        //                 const filtroIdiomaMin = filtro.idioma.toLowerCase();
        //                 return oferta.idiomas.some((idiomaProfesional: { idioma: string; }) => {
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
            ofertasFiltradas = ofertasFiltradas.filter(oferta => oferta.permiso == true);
        }
        setOfertasRenderizarFiltradas(ofertasFiltradas);

    }, [ofertasRenderizar, filtrosDepartamentos, filtrosPosicion, filtrosPais,
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
        const groupedOffers = chunkArray(ofertasRenderizarFiltradas, 7);
        setArrayDe7ElementosPorPagina(groupedOffers);
    }, [ofertasRenderizarFiltradas]);

    //el array definitivo es el de 7 elementos con indice subArraySeleccionado, que es tomado y modificado por los botones de buttonlist
    const [subArraySeleccionado, setSubArrayseleccionado] = useState<number>(0);
    const [arrayMostrado, setArrayMostrado] = useState<any>([]);
    const [isArrayMostrado, setIsArrayMostrado] = useState<any>(false);

    useEffect(() => {
        setArrayMostrado(arrayDe7ElementosPorPagina[subArraySeleccionado]);
    }, [arrayDe7ElementosPorPagina, subArraySeleccionado]);

    useEffect(() => {
        if (arrayMostrado && arrayMostrado.length !== 0) {
            setIsArrayMostrado(true)
            setRenderOferta(arrayMostrado[0]);
        }
        if (arrayMostrado == undefined || arrayMostrado.length == 0) {
            setIsArrayMostrado(false)
            setRenderOferta(undefined);
        }
        console.log("arraymostrado: ", arrayMostrado)
    }, [arrayMostrado]);

    const handleOfertaClick = (oferta: any) => {
        obtainData(oferta.empresa)
        setRenderOferta(oferta);
        console.log("oferta: ", oferta)
    };

    const obtainData = async (userId: string) => {
        try {
          const docRef = doc(db, "users", userId);
          const userDoc = await getDoc(docRef);
    
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setEmpresa(userData)
    
          } else {
            console.error('El documento del usuario no existe');
          }
        } catch (error) {
          console.error('Error al buscar empresa por id:', error);
        }
      };

    return (
        <ul className='flex flex-col h-full '>
            {!isArrayMostrado &&
                <div className='h-full'>
                    <p className='p-12 my-5 text-gray-500 text-center'> 
                    No se encontraron ofertas que cumplan con los criterios aplicados
                    </p>
                </div>
            }
            {isArrayMostrado && arrayMostrado?.map((oferta: any, index: any) => (
                <div onClick={() => handleOfertaClick(oferta)} key={index} >
                    {oferta.empresa != user?.email &&
                    <OfertaComponent id={oferta.id}
                        titulo={oferta.titulo}
                        cargo={oferta.cargo}
                        jornada={oferta.jornada}
                        tipoubi={oferta.tipoubi}
                        ubicacion={oferta.ubicacion}
                        descripcion={oferta.descripcion}
                        experiencia={oferta.experiencia}
                        adicional={oferta.adicional}
                        empresaNombre={oferta.empresaNombre}
                        empresa={oferta.empresa}
                        estado={oferta.estado}
                    />}
                </div>
            ))}
            <nav className="bg-gray-200 py-2 px-1 text-center  ">
                <ListadoBotones arrayDe7ElementosPorPagina={arrayDe7ElementosPorPagina} subArraySeleccionado={subArraySeleccionado} setSubArrayseleccionado={setSubArrayseleccionado} />
            </nav>
        </ul>
    );
};

export default OfertasList;
