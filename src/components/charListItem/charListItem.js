import  { useRef } from 'react';

import './charListItem.scss';

const CharListItem = (props) => {
    const { chars, onIdUpdate } = props
    const refs = useRef([])

    const onAddActiveClass = (e) =>{
        const target = e.target
        refs.current.forEach(item =>{
            item.classList.remove('char__item_selected')
            if(item === target || target.parentNode === item){
                item.classList.add('char__item_selected')
                item.focus()
            }
        })
    }

    const onKeySelect = (e) =>{
        if(e.code === 'Enter'){
            e.target.click()
        }
    }

    
    return chars.map(({thumbnail, name, id}, iter) => {
        return (
            <li className="char__item" 
            tabIndex={0}
            key = {id} 
            onClick ={(e) => {
                onAddActiveClass(e)
                    onIdUpdate(id)
                }}
            ref = {(elem) => refs.current[iter] = elem}
            onKeyDown ={onKeySelect}>
                <img src={thumbnail} alt="abyss"/>
                <div className='char__item-name'>{name}</div>
            </li>
        )
    })
}


export default CharListItem;