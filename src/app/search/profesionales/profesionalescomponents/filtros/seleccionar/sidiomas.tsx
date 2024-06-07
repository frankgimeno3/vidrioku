import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface SidiomaProps {
    arrayFiltros: any[];
    setArrayFiltros: React.Dispatch<React.SetStateAction<any[]>>;
}

const Sidioma: FC<SidiomaProps> = ({ arrayFiltros, setArrayFiltros }) => {
  


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
        if (!arrayFiltros.includes(idiomaElement) && idioma !== '') {
            const newArray = [...arrayFiltros, `Idiomas - idioma: ${idioma}, nivel: ${nivel}`];
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
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
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
                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Ingles" className="mr-2" onChange={() => setIsInglesSelected(!isInglesSelected)} checked={isInglesSelected} />
                    <label htmlFor="Ingles">Inglés</label>
                    {isInglesSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={inglesLevel} onChange={(e) => setInglesLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>
                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Frances" className="mr-2" onChange={() => setIsFrancesSelected(!isFrancesSelected)} checked={isFrancesSelected} />
                    <label htmlFor="Frances">Frances</label>
                    {isFrancesSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={francesLevel} onChange={(e) => setFrancesLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>
                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Portugues" className="mr-2" onChange={() => setIsPortuguesSelected(!isPortuguesSelected)} checked={isPortuguesSelected} />
                    <label htmlFor="Portugues">Portugués</label>
                    {isPortuguesSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={portuguesLevel} onChange={(e) => setPortuguesLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>
                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Aleman" className="mr-2" onChange={() => setIsAlemanSelected(!isAlemanSelected)} checked={isAlemanSelected} />
                    <label htmlFor="Aleman">Alemán</label>
                    {isAlemanSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={alemanLevel} onChange={(e) => setAlemanLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>
                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Arabe" className="mr-2" onChange={() => setIsArabeSelected(!isArabeSelected)} checked={isArabeSelected} />
                    <label htmlFor="Arabe">Árabe</label>
                    {isArabeSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={arabeLevel} onChange={(e) => setArabeLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>

                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="CatalanValenciano" className="mr-2" onChange={() => setIsCatalanValencianoSelected(!isCatalanValencianoSelected)} checked={isCatalanValencianoSelected} />
                    <label htmlFor="CatalanValenciano">Catalán/Valenciano</label>
                    {isCatalanValencianoSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={catalanValencianoLevel} onChange={(e) => setCatalanValencianoLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>

                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Vasco" className="mr-2" onChange={() => setIsVascoSelected(!isVascoSelected)} checked={isVascoSelected} />
                    <label htmlFor="Vasco">Vasco</label>
                    {isVascoSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={vascoLevel} onChange={(e) => setVascoLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>

                <div className='flex flex-row items-center'>
                    <input type="checkbox" id="Gallego" className="mr-2" onChange={() => setIsGallegoSelected(!isGallegoSelected)} checked={isGallegoSelected} />
                    <label htmlFor="Gallego">Gallego</label>
                    {isGallegoSelected &&
                        <div className='flex flex-row  items-center text-sm ml-12 my-3'>
                            <p>Nivel:</p>
                            <select className='ml-2 h-8 p-1 text-sm' value={gallegoLevel} onChange={(e) => setGallegoLevel(e.target.value)} >
                                <option value="Nativo">Nativo</option>
                                <option value="Alto">Alto</option>
                                <option value="Medio">Medio</option>
                                <option value="Principiante">Principiante</option>
                            </select>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidioma;
