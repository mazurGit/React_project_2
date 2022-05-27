import './charList.scss';

import {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelRequsest from '../../services/requests';
import Error from '../error/error';
import CharListItem from '../charListItem/charListItem';

const CharList  = (props) => {
    const [chars, setChars] = useState([]);
    const [charsQty] = useState(9);
    const [offset, setOffset] = useState(210);
    const [firstInitial, setFirstinitial] = useState(true)
    const [reqDataOver, setReqDataOver] = useState(false);

    const {getCharsData, error, loading } = useMarvelRequsest();
    

    useEffect (() =>{
        onCharsLoaded()
    },[])


    const onCharsLoaded = (firstInitial = true) => { 
        getCharsData(offset)
        .then(newChars => {
            if(newChars) {
                setFirstinitial(false)
                setChars(chars => [...chars,...newChars])
                setOffset(offset => offset + 9)
                setReqDataOver(newChars.length < 9? true: false)
            } else {
                setFirstinitial(false)
            }
        })
    }

    const createLoadingSkeleton = () => {
        return new Array(charsQty).fill('').map((item, iter) => {
           return(
                <li className="char__skeleton" key={iter}/>
            )
        })
    }


    const btnDisplay = reqDataOver? 'none': 'block'

    return (
        <div className="char__list">
            { error? <Error/>: null }
            <ul className="char__grid">
                { firstInitial? createLoadingSkeleton(): null }
                
                { <CharListItem chars ={chars} onIdUpdate = {props.onIdUpdate}/> }
            </ul>
            <button className="button button__main button__long char__button" 
            onClick={() => onCharsLoaded(false)} 
            disabled={loading}
            style = {{display:`${btnDisplay}`}}>
                <div className="inner" >load more</div>
            </button>
        </div>
    )
} 


CharList.propTypes = {
    onIdUpdate:PropTypes.func
}

export default CharList;

