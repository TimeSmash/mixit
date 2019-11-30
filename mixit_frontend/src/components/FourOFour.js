import React from 'react'
import img404 from '../images/404.jpg'

import "../css/FourOFour.css"
function FourOFour() {


        return (
            <div className="a-container">
                <div className="inner">
                    <h1>Page Not Found</h1>
                    <img src={img404} alt={"404 Page Not Found"} style={{height:"20em",paddingBottom:"1em"}}></img>
                    <p>We couldn't find the page you were looking for. Please try again.</p>
                </div>
            </div>
        );    
}
  


export default FourOFour;