import './charList.scss';

import { Component } from 'react';

import MarvelRequsest from '../../services/requests';
import Error from '../error/error';
import ListSkeleton from '../listSkeleton/listSkeleton';

class CharList  extends Component {
    constructor(props){
        super(props)
        this.state ={
            chars:[],
            loading:true,
            error:false,
            charsCount:9,
            offset: 210,
            btnDisable:false,
            requestDataOver:false
        }
    }
    
    

    request = new MarvelRequsest();

    createLoadingSkeleton = () => {
        return new Array(this.state.charsCount).fill('').map((item, iter) => {
            return <ListSkeleton key = {iter}/>
        })
    }

    createList = (chars) =>{
        return chars.map(({thumbnail, name, id}) => {
            return (
                <li className="char__item" key = {id} onClick ={() => {
                        this.props.onIdUpdate(id)
                    }
                }>
                    <img src={thumbnail} alt="abyss"/>
                    <div className='char__name'>{name}</div>
                </li>
            )
        })
    }

    onCharsLoaded = () => { 
        this.onLoadingMoreChars()
        this.request.getCharsData(this.state.offset)
        .then(newChars => {
            this.setState(({chars, offset}) => (
                { chars: [...chars,...newChars],
                    btnDisable:false,
                    offset: offset + 9,
                    requestDataOver: newChars.length < 9? true: false,
                    loading: false
                 }))
        })
        .catch(this.onError)
    }


    onError = () => { 
        this.setState({
            loading:false,
            error:true
        })  
    }

    onLoadingMoreChars = () =>{
        this.setState({btnDisable:true})
    }

    componentDidMount = () =>{
        this.onCharsLoaded()
    }
    
    render = () =>{
        const{ loading, error, chars, btnDisable, requestDataOver} = this.state; 
        const filter = btnDisable? 'grayscale(50%)': '';
        const btnDisplay = requestDataOver? 'none': 'block'

        return (
            <div className="char__list">
                <ul className="char__grid">
                    { loading? this.createLoadingSkeleton(): null }
                    { error? <Error style = {{gridColumn:"2/3"}}/>: null }
                    { !(loading || error)? this.createList(chars): null }
                </ul>
                <button className="button button__main button__long char__button" 
                onClick={this.onCharsLoaded} 
                disabled={btnDisable}
                style = {{filter:`${filter}`, display:`${btnDisplay}`}}>
                    <div className="inner" >load more</div>
                </button>
            </div>
        )
    } 
}


export default CharList;

