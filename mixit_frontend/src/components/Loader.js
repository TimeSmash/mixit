import React from 'react'
import loadingImg from '../images/martini.gif'

function Loader() {
    return(
    <div className="loader">
        {/* {alert("Loading")} */}
        
        <h1>Loading...</h1>
        <img src={loadingImg} alt=""></img>
    </div> 
    )
}

export default Loader;