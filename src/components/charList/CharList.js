import './charList.scss';

import {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelRequsest from '../../services/requests';
import Error from '../error/error';
import ListSkeleton from '../listSkeleton/listSkeleton';
import CharListItem from '../charListItem/charListItem';

const CharList  = (props) => {

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charsCount] = useState(9);
    const [offset, setOffset] = useState(210);
    const [btnDisable, setBtnDisable] = useState(false);
    const [reqDataOver, setReqDataOver] = useState(false);

    
    const request = new MarvelRequsest();

    useEffect (() =>{
        onCharsLoaded()
    },[])

    const onLoadingMoreChars = () =>{
        setBtnDisable(true)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onCharsLoaded = () => { 
        onLoadingMoreChars()
        request.getCharsData(offset)
        .then(newChars => {
            setChars(chars => [...chars,...newChars])
            setBtnDisable (false)
            setOffset(offset => offset + 9)
            setReqDataOver(newChars.length < 9? true: false)
            setLoading(false)
            })
        .catch(onError)
    }

    const createLoadingSkeleton = () => {
        return new Array(charsCount).fill('').map((item, iter) => {
            return <ListSkeleton key = {iter}/>
        })
    }


    const filter = btnDisable? 'grayscale(50%)': '';
    const btnDisplay = reqDataOver? 'none': 'block'

    return (
        <div className="char__list">
            <ul className="char__grid">
                { loading? createLoadingSkeleton(): null }
                { error? <Error style = {{gridColumn:"2/3"}}/>: null }
                { !(loading || error)? <CharListItem chars ={chars} onIdUpdate = {props.onIdUpdate}/>: null }
            </ul>
            <button className="button button__main button__long char__button" 
            onClick={onCharsLoaded} 
            disabled={btnDisable}
            style = {{filter:`${filter}`, display:`${btnDisplay}`}}>
                <div className="inner" >load more</div>
            </button>
        </div>
    )
} 


CharList.propTypes = {
    onIdUpdate:PropTypes.func
}

export default CharList;

