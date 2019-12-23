import React from 'react'
import loadingImg from '../images/martini.gif'

function Loader() {

    let loader = document.getElementsByClassName("loader")[0]

    let show = () => {
        loader.style.height = "inherit"
        setTimeout(hide, 1000)
    }

    let hide = () => {
        loader.style.display = "none"
    }

    return(
        <div className="loader" style={{height:"inherit"}}>
            
            {/* {alert("Loading")} */}
            
            <h1>Loading...</h1>
            <img src={loadingImg} alt=""></img>
        </div> 
    )
}

export default Loader;