import { Component } from 'react';
import MarvelRequsest from '../../services/requests';

import Skeleton from '../skeleton/Skeleton';
import Error from '../error/error';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

class CharInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            char:null,
            loading:false,
            error:false,
        }
    }
    request = new MarvelRequsest();


    onComicsLoaded = (id) => {
        if(!id){
            return
        } else { 
            this.onLoading()
            this.request.getCharData(id)
            .then(char => this.onCharUpdate(char))
            .catch(this.onError)
        }
        
    }
    onLoading = () => { 
        this.setState({
            loading:true,
            error:false
        })
    }

    onCharUpdate = (char) =>{
        this.setState({
            loading: false,
            char
        })
    }

    onError = () =>{
        this.setState({
            loading: false,
            error: true
        })
    }


    createListContent = (char) => {
        const {  name, thumbnail, description, wiki, homepage, comics } = char
        return(
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.map(({resourceURI, name}, iter) =>{
                        return (
                            <li className="char__comics-item" key = {iter}>
                                <a href={resourceURI}>{name}</a>
                            </li>
                        )
                        }) 
                    }
                </ul>
            </>
        )
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.selectedCharId !== this.props.selectedCharId ){
            this.onComicsLoaded(this.props.selectedCharId)
        }
        
    }
    render = () => {
        const { error, loading, char } = this.state
        return (
            <div className="char__info">
                { error? <Error/>: null }
                { loading? <Spinner/>: null}
                { !(error || loading || char)? <Skeleton/>: null }
                { !(error || loading || !char)? this.createListContent(char): null}
            </div>
        )
    }
}

export default CharInfo;