import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../error/Error"
import './404.scss'

const PageNotFound = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)            
    return (
       <div> 
           <div className="page-not-found">
            <ErrorMessage/>
             <h2>Page Not Found</h2>
           </div>
            <Link style={{'display': 'block','textAlign': 'center', 'color': 'red','fontSize': '24px','marginTop': '30px'}} to = '/'>Back to main page</Link>
            <button onClick={goBack} className="link-back">Back to page</button>
       </div>
    )
}

export default PageNotFound;