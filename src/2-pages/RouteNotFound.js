import { error404 } from "../assets"


export const RouteNotFound = () => {


    return (
        <div className='page-login-container d-flex flex-wrap justify-content-center align-items-center'>
               <div className="w-100 d-flex flex-wrap justify-content-center align-items-center"><img src={error404}></img></div> 
                <div className="w-100 d-flex flex-wrap justify-content-center align-items-center"><h3> Sorry ! THAT PAGE YOU ARE LOOKING FOR IS NOT FOUND ! </h3></div>
                
        </div>
    )
}