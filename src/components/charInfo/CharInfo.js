import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelRequsest from '../../services/requests';
import PropTypes from 'prop-types';

import Skeleton from '../skeleton/Skeleton';
import Error from '../error/error';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const  CharInfo = (props) => {
    const {selectedCharId} = props
    const [char, setChar] = useState(null)

    const {getCharData, error, loading} = useMarvelRequsest();

    useEffect(()=>{
        onComicsLoaded(selectedCharId)
    },[selectedCharId])

    const onComicsLoaded = (id) => {
        if(!id){
            return
        } else { 
            getCharData(id)
            .then(char => {
                if(char) { setChar(char) }
            })
        }
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
                            const comicId = resourceURI.slice(-5)
                        return (
                            <li className="char__comics-item" key = {iter}>
                                <Link to={`comics/${comicId}`}>{name}</Link>
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



