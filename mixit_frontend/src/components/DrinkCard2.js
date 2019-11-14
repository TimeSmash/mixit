import React from 'react'
import {Link} from 'react-router-dom'
import '../css/DrinkCard.css'
 
function DrinkCard2(props) {
    console.log("DrinkCard2",props)
    // debugger
      return(
          <div>
  
             <Link to={`/drinks/${props.drinkId}`} onClick={() =>alert("HEY")}>
                <div className="card" style={{"width": "10rem"}}>
                  <img src={props.imgUrl} className="card-img-top" alt={props.name}></img>
                  <div className="card-block">
                    <p className="card-text">{props.name}</p>
                  </div>
                </div>
             </Link>
          </div>
      ) 
    }

  export default DrinkCard2;