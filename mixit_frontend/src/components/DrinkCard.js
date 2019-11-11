import React from 'react'
import {Link} from 'react-router-dom'

import '../css/DrinkCard.css'


// DrinkCards made in response to something
// ex. All Drinks makes a DrinkCard for every drink ever

function DrinkCard(props) {
    return(
        <div>
           <Link to={`/drinks/${props.drinkId}`}>
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
  
  export default DrinkCard;
  