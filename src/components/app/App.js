import { useState } from "react";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedCharId, setId] = useState(null)


    const onIdUpdate = (Id) => { 
        setId( Id )
    }

    return (
        <div className="app">
            <AppHeader/>
            {/* <main>
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
            </main> */}
            <main>
                <AppBanner/>
                <ComicsList/>
            </main>
        </div>
    )
}


export default App;