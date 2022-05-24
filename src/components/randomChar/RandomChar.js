import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import { useState, useEffect } from 'react';

import useMarvelRequsest from '../../services/requests';
import Spinner from '../spinner/Spinner';
import Error from '../error/error';


const RandomChar = () =>{
    const [char, setChar] = useState({})


    const {getCharData, error, loading, setError} = useMarvelRequsest();

   
    const updateChar = () => {
        setError(false)
        const randomCharId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharData(randomCharId)
        .then(res => {
            if(res){
                setChar(res)
            }         
        })
    }

    useEffect(() =>{
        updateChar()
    }, [])

        
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                {loading?<Spinner/>:null}
                {error?<Error/>:null}
                {!(loading || error)? <CharDisplay char={char}/>:null}
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


const CharDisplay = ({char}) =>{
    let {name, description, thumbnail, wiki, homepage} = char;
    return (
        <>
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}
export default RandomChar;