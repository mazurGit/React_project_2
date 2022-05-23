import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import { useState, useEffect } from 'react';

import MarvelRequsest from '../../services/requests';
import Spinner from '../spinner/Spinner';
import Error from '../error/error';


const RandomChar = () =>{
    const [char, setChar] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = new MarvelRequsest();

   
    const updateChar = () => {
        const randomCharId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        onLoading()
        request.getCharData(randomCharId)
        .then(res => {
            onCharLoaded(res)
        })
        .catch(onError)
    }

    useEffect(() =>{
        updateChar()
    }, [])

    const onCharLoaded = (char) =>{
        setChar(char)
        setLoading(false)
    }

    const onLoading = () => { 
        setLoading(true)
        setError(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }
        
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