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
            loading:false,
            error:false,
            charsCount:9
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
                <li className="char__item" key = {id} onClick ={() => this.props.onIdUpdate(id)}>
                    <img src={thumbnail} alt="abyss"/>
                    <div className='char__name'>{name}</div>
                </li>
            )
        })
    }

    onCharsLoaded = () => { 
        this.setState({loading:true})
        this.request.getCharsData()
        .then(chars => {
            this.setState({
                chars,
                loading:false
            })
        })
        .catch(this.onError)
    }

    onLoading = () => {
        this.setState({
            loading:true,
            error:false
        })
    }

    onError = () => { 
        this.setState({
            loading:false,
            error:true
        })  
    }

    componentDidMount = () =>{
        this.onCharsLoaded()
    }
    render = () =>{
        const{ loading, error, chars} = this.state; 
        return (
            <div className="char__list">
                <ul className="char__grid">
                    { loading? this.createLoadingSkeleton(): null }
                    { error? <Error style = {{gridColumn:"2/3"}}/>: null }
                    { !(loading || error)? this.createList(chars): null }
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    } 
}


export default CharList;

