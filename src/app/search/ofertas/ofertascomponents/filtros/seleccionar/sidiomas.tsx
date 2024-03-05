import { FC, useEffect, useState } from 'react';

interface SidiomaProps {
    setArrayFiltros: any;
    arrayFiltros: any;
}

const Sidioma: FC<SidiomaProps> = ({ arrayFiltros, setArrayFiltros }) => {
    const [arrayRecibido, setArrayRecibido] = useState<any[]>([]);

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

    const handleSeleccionIdiomas = (objetoIdioma: string[]) => {
        if (!arrayRecibido.includes(objetoIdioma)) {
            setArrayRecibido(prevArray => [...prevArray, objetoIdioma]);
            setArrayFiltros((prevArray: any) => [...prevArray, objetoIdioma]);
        }
    };

    useEffect(() => {
        if (espanolLevel != '') {
            let idiomaArray = [`idioma: español, nivel: ${espanolLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (inglesLevel != '') {
            let idiomaArray = [`idioma: inglés, nivel: ${inglesLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (francesLevel != '') {
            let idiomaArray = [`idioma: francés, nivel: ${francesLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (alemanLevel != '') {
            let idiomaArray = [`idioma: alemán, nivel: ${alemanLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (portuguesLevel != '') {
            let idiomaArray = [`idioma: portugués, nivel: ${portuguesLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (arabeLevel != '') {
            let idiomaArray = [`idioma: árabe, nivel: ${arabeLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (catalanValencianoLevel != '') {
            let idiomaArray = [`idioma: catalán/valenciano, nivel: ${catalanValencianoLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (vascoLevel != '') {
            let idiomaArray = [`idioma: vasco, nivel: ${vascoLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }
        if (gallegoLevel != '') {
            let idiomaArray = [`idioma: gallego, nivel: ${gallegoLevel}` ] 
            handleSeleccionIdiomas(idiomaArray)
        }

    }, [espanolLevel, inglesLevel, francesLevel, portuguesLevel, alemanLevel, arabeLevel, catalanValencianoLevel, vascoLevel, gallegoLevel]);

    return (
        <div className='flex flex-col'>
            <p>Filtrar según los idiomas rerqueridos</p>
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
