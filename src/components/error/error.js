import error from './error.webp'

const Error = () => { 
    return(
        <img className = "Error" src={error} alt="error" style={{width:'200px', height:'200px', objectFit:'cover', display:'block', margin:'0 auto'}}/>
    )
}

export default Error;