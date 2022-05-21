import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

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
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onIdUpdate = {this.onIdUpdate}/>
                        <CharInfo selectedCharId = {this.state.selectedCharId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;