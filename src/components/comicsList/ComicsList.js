import { useState, useEffect } from 'react';

import useMarvelRequsest from '../../services/requests';
import Error from '../error/error';

import './comicsList.scss';

const ComicsList = () => {
    const [comics,setComisc] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsQty] = useState(8);
    const [reqDataOver, setReqDataOver] = useState(false);
    const [firstInitial, setFirstinitial] = useState(true)

    const {getComicsList, loading, error, setLoading } = useMarvelRequsest();
    
    useEffect(()=>{
        updateComics()
    }, [])

    const updateComics = (firstInitial = true) =>{
        if(!firstInitial) {setFirstinitial(false)}
        getComicsList(offset)
        .then(newComics => {
            if(newComics){
                if (newComics.length < comicsQty) { setReqDataOver(true) }
                setComisc(comics => [...comics,...newComics])
                setOffset(offset => offset + comicsQty)
                setFirstinitial(false)
            }
        })
    }

    const items = (comics) => {
        return comics.map(item => {
            const {title, image, price, id} = item
            return (
                <li className="comics__item" key={id}>
                    <a href="#" >
                        <img src={image} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
                </li>   
            )
        })
        
    }

    const Skeleton = () => {
        return new Array(comicsQty).fill('').map( (item, iter) => {
            return (
                <li className='comics__item-skeleton' 
                key={iter}/>
            )
        })
        
    }


    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {firstInitial? <Skeleton/>: null}
                {error? <Error/>: null}
                { items(comics) }

            </ul>
            <button className="button button__main button__long comics__btn" 
            onClick={() =>updateComics(false)}
            disabled = {loading}
            style = {{display:`${reqDataOver? 'none': 'block'}`}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;