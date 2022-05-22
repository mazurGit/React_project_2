import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedCharId:null
        }
    }

    onIdUpdate = (selectedCharId) => { 
        this.setState({ selectedCharId })
    }

    render = () => {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onIdUpdate = {this.onIdUpdate}/>
                        </ErrorBoundary>
                        <ErrorBoundary> 
                            <CharInfo selectedCharId = {this.state.selectedCharId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;