import { Component } from "react";

import './error.scss';
import error from './error.gif';

class ErrorBoundary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            error:false
        }
    }

    onError = () => {
        this.setState({error:true})
    }
    componentDidCatch = ()=>{
        this.onError()
    }
    render = () => {
        return(
        <>
            {this.state.error?<img className = "errorBoundary" src={error} alt="error message" />: this.props.children}
        </>            
        )
    }
}

export default ErrorBoundary;