import { useState,useEffect } from 'react';
import MarvelRequsest from '../../services/requests';
import PropTypes from 'prop-types';

import Skeleton from '../skeleton/Skeleton';
import Error from '../error/error';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const  CharInfo = (props) => {
    const {selectedCharId} = props
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = new MarvelRequsest();

    useEffect(()=>{
        onComicsLoaded(selectedCharId)
    },[selectedCharId])

    const onComicsLoaded = (id) => {
        if(!id){
            return
        } else { 
            onLoading()
            request.getCharData(id)
            .then(char => onCharUpdate(char))
            .catch(onError)
        }
    }
    const onLoading = () => { 
        setLoading(true)
        setError(false)
    }

    const onCharUpdate = (char) =>{
        setLoading(false)
        setChar(char)
    }

    const onError = () =>{
        setLoading(false)
        setError(true)
    }


    const createListContent = (char) => {
        const {  name, thumbnail, description, wiki, homepage, comics } = char
        return(
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.map(({resourceURI, name}, iter) =>{
                        return (
                            <li className="char__comics-item" key = {iter}>
                                <a href={resourceURI}>{name}</a>
                            </li>
                        )
                        }) 
                    }
                </ul>
            </>
        )
    }

    
    return (
        <div className="char__info">
            { error? <Error/>: null }
            { loading? <Spinner/>: null}
            { !(error || loading || char)? <Skeleton/>: null }
            { !(error || loading || !char)? createListContent(char): null}
        </div>
    )
}


CharInfo.propTypes = {
    selectedCharId: PropTypes.number
}

export default CharInfo;