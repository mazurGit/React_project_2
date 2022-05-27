import "./page404.scss"
import error from './error.gif'

import { Link } from "react-router-dom"

const Page404 =() =>{
    return (
        <div className='page404'>
            <img src={error} alt="Page not found" />
            Sorry, but this page does not exist
            <Link to ="/">Back to Main Page</Link>
        </div>
        
    )
}


export default Page404;