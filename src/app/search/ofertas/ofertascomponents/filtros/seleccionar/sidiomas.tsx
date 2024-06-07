import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

interface SidiomaProps {
    arrayFiltros:any;
    setArrayFiltros: React.Dispatch<React.SetStateAction<any[]>>;
}

const Sidioma: FC<SidiomaProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [filtrosRecibidos, setFiltrosRecibidos] = useState<any[]>([]);

    useEffect(() => {
        setFiltrosRecibidos(filtrosRecibidos);
    }, [arrayFiltros]);


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

 

    const handleSeleccionIdiomas = (idioma: string, nivel: string) => {
        const idiomaElement = `Idiomas - idioma: ${idioma}, nivel: ${nivel}`;
        if (!filtrosRecibidos.includes(idiomaElement) && idioma !== '') {
            const newArray = [...filtrosRecibidos, `Idiomas - idioma: ${idioma}, nivel: ${nivel}`];
            setFiltrosRecibidos(newArray);
            setArrayFiltros(newArray); 
        }
    };
    
    useEffect(() => {
        if (espanolLevel !== '') {
            handleSeleccionIdiomas('español', espanolLevel);
        }
        if (inglesLevel !== '') {
            handleSeleccionIdiomas('inglés', inglesLevel);
        }
        if (francesLevel !== '') {
            handleSeleccionIdiomas('francés', francesLevel);
        }
        if (portuguesLevel !== '') {
            handleSeleccionIdiomas('portugués', portuguesLevel);
        }
        if (alemanLevel !== '') {
            handleSeleccionIdiomas('alemán', alemanLevel);
        }
        if (arabeLevel !== '') {
            handleSeleccionIdiomas('árabe', arabeLevel);
        }
        if (catalanValencianoLevel !== '') {
            handleSeleccionIdiomas('catalán/valenciano', catalanValencianoLevel);
        }
        if (vascoLevel !== '') {
            handleSeleccionIdiomas('vasco', vascoLevel);
        }
        if (gallegoLevel !== '') {
            handleSeleccionIdiomas('gallego', gallegoLevel);
        }
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
