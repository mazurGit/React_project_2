import { useState, useEffect } from 'react';

import useMarvelRequsest from '../../services/requests';
import Error from '../error/error';

import { Link } from 'react-router-dom';

import './comicsList.scss';

const ComicsList = () => {
    const [comics,setComics] = useState([]);
    const [offset, setOffset] = useState(localStorage.getItem('comicsOffset')? +localStorage.getItem('comicsOffset'): 0);
    const [comicsQty] = useState(8);
    const [reqDataOver, setReqDataOver] = useState(false);
    const [firstInitial, setFirstinitial] = useState(true)

    const {getComicsList, loading, error } = useMarvelRequsest();
    
    useEffect(()=>{
        if(localStorage.getItem('comicsList')){
            setFirstinitial(false)
            setComics(JSON.parse(localStorage.getItem('comicsList')))
        } else {
            updateComics()
        }
    }, [])

    const updateComics = () =>{
        getComicsList(offset)
        .then(newComics => {
            if(newComics){
                if (newComics.length < comicsQty) { setReqDataOver(true) }
                setComics(comics => [...comics,...newComics])
                setOffset(offset => offset + comicsQty)
                setFirstinitial(false)
                localStorage.setItem('comicsList',JSON.stringify([...comics,...newComics]))
                localStorage.setItem('comicsOffset',`${offset + comicsQty}`)
            }
        })
    }

    const items = (comics) => {
        return comics.map( (item, iter) => {
            const {title, image, price, id} = item
            return (
                //duplicate of id possible , use iterater instead
                <li className="comics__item" key={iter}>                
                    <Link to= {`/comics/${id}`} >
                        <img src={image} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link >
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