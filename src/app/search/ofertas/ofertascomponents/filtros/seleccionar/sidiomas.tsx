import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import { addFiltro } from '@/redux/features/arrayFiltros'; 

interface SidiomaProps {
}

const Sidioma: FC<SidiomaProps> = () => {
    const dispatch = useDispatch();
    const arrayFiltros = useSelector((state: RootState) => state.arrayFiltros.filtros);

    const [arrayRecibido, setArrayRecibido] = useState<string[]>([]);

    const [isEspanolSelected, setIsEspanolSelected] = useState(false);
    const [espanolLevel, setEspanolLevel] = useState('');

    const [isInglesSelected, setIsInglesSelected] = useState(false);
    const [inglesLevel, setInglesLevel] = useState('');

    const [isFrancesSelected, setIsFrancesSelected] = useState(false);
    const [francesLevel, setFrancesLevel] = useState('');

    const [isPortuguesSelected, setIsPortuguesSelected] = useState(false);
    const [portuguesLevel, setPortuguesLevel] = useState('');

    const [isAlemanSelected, setIsAlemanSelected] = useState(false);
    const [alemanLevel, setAlemanLevel] = useState('');

    const [isArabeSelected, setIsArabeSelected] = useState(false);
    const [arabeLevel, setArabeLevel] = useState('');

    const [isCatalanValencianoSelected, setIsCatalanValencianoSelected] = useState(false);
    const [catalanValencianoLevel, setCatalanValencianoLevel] = useState('');

    const [isVascoSelected, setIsVascoSelected] = useState(false);
    const [vascoLevel, setVascoLevel] = useState('');

    const [isGallegoSelected, setIsGallegoSelected] = useState(false);
    const [gallegoLevel, setGallegoLevel] = useState('');

    useEffect(() => {
        setArrayRecibido(arrayFiltros);
    }, [arrayFiltros]);

    const handleSeleccionIdiomas = (idioma: string, nivel: string) => {
        const idiomaElement = `Idiomas - idioma: ${idioma}, nivel: ${nivel}`;
        if (!arrayRecibido.includes(idiomaElement)) {
            const newArray = [...arrayRecibido, idiomaElement];
            setArrayRecibido(newArray);
            dispatch(addFiltro(idiomaElement)); // Utiliza la acción addFiltro para agregar un filtro
        }
    };

    useEffect(() => {
        handleSeleccionIdiomas('español', espanolLevel);
        handleSeleccionIdiomas('inglés', inglesLevel);
        handleSeleccionIdiomas('francés', francesLevel);
        handleSeleccionIdiomas('portugués', portuguesLevel);
        handleSeleccionIdiomas('alemán', alemanLevel);
        handleSeleccionIdiomas('árabe', arabeLevel);
        handleSeleccionIdiomas('catalán/valenciano', catalanValencianoLevel);
        handleSeleccionIdiomas('vasco', vascoLevel);
        handleSeleccionIdiomas('gallego', gallegoLevel);
    }, [espanolLevel, inglesLevel, francesLevel, portuguesLevel, alemanLevel, arabeLevel, catalanValencianoLevel, vascoLevel, gallegoLevel]);

    return (
        <div className='flex flex-col'>
            <p>Filtrar según los idiomas que el profesional habla</p>
            <div className='flex flex-col mb-4'>
                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Espanol" className="mr-2" onChange={() => setIsEspanolSelected(!isEspanolSelected)} checked={isEspanolSelected} />
                    <label htmlFor="Espanol">Español</label>
                    {isEspanolSelected &&
                        <div className='flex flex-row items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={espanolLevel} onChange={(e) => setEspanolLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>
                {/* Repite el patrón para los otros idiomas */}
            </div>
        </div>
    );
};

export default Sidioma;
