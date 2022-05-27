import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './singleComic.scss';

import useMarvelRequsest from '../../../services/requests';
import Error from '../../error/error';
import Spinner from '../../spinner/Spinner';
import AppBanner from '../../appBanner/AppBanner';



const SingleComic = () => {

    const {comicId} = useParams()
    const[comic, setComic] = useState({})

    const { getSingleComic, error, loading, resetError} = useMarvelRequsest();

    useEffect( () => {
        updateComic(comicId)
    }, [comicId])

    const updateComic = (id) =>{
        resetError()
        getSingleComic(id)
        .then(res => {
            if(res){
                setComic(res)
            }
        })
    }

    const DynamicElem = ({comic}) => {
        const {description, title, price, image, pageCount, language} = comic;
        return (
            <div className="single-comic">
                <img src={image} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">{language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to= "/comics" className='single-comic__back'>Back to all</Link>
            </div>      
        )
    }
    const spinner = <Spinner style={{'position': 'relative','top': '150px', left: '50%', 'transform': 'translateX(-50%)'}}/>
    return (
        <>
            <AppBanner/>
            
            {error? <Error/>: null}
            {loading? spinner: null}
            { !(loading && error)? <DynamicElem comic ={comic}/>: null} 
        </>                  
    )
}

export default SingleComic;