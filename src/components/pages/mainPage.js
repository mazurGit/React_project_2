import { useState, useEffect } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    
    const [selectedCharId, setId] = useState(null)

    useEffect(() =>{
    if(localStorage.getItem('charId')){
        setId(+localStorage.getItem('charId'))
    }
    }, [])


    const onIdUpdate = (id) => { 
        localStorage.setItem('charId',`${id}`)
        setId( id )
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onIdUpdate = {onIdUpdate}/>
                </ErrorBoundary>
                <ErrorBoundary> 
                    <CharInfo selectedCharId = {selectedCharId}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
    
}

export default MainPage;
