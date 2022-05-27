import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedCharId, setId] = useState(null)


    const onIdUpdate = (Id) => { 
        setId( Id )
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
