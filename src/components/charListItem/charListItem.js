import  { Component} from 'react';

import './charListItem.scss';

class CharListItem extends Component{

    elems =[]

    selectItem = (elem) =>{       
        this.elems.push(elem)
    }

    onAddActiveClass = (e) =>{
        const target = e.target
        this.elems.forEach(item =>{
            item.classList.remove('char__item_selected')
            if(item === target || target.parentNode === item){
                item.classList.add('char__item_selected')
                item.focus()
            }
        })
    }

    onKeySelect = (e) =>{
        if(e.code === 'Enter'){
            e.target.click()
        }
    }
    render = () => {
        const { chars, onIdUpdate } = this.props
        return chars.map(({thumbnail, name, id}) => {
            return (
                <li className="char__item" 
                tabIndex={0}
                key = {id} 
                onClick ={(e) => {
                    this.onAddActiveClass(e)
                     onIdUpdate(id)
                    }}
                ref = {this.selectItem}
                onKeyDown ={this.onKeySelect}>
                    <img src={thumbnail} alt="abyss"/>
                    <div className='char__item-name'>{name}</div>
                </li>
            )
        })
    }
}


export default CharListItem;