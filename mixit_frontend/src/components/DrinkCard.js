import React from 'react'
import {Link} from 'react-router-dom'


// DrinkCards made in response to something
// ex. All Drinks makes a DrinkCard for every drink ever

function DrinkCard(props) {
    return(
        <div>
           <Link to={`/drinks/${this.props.drinkId}`}>
             <img src={this.props.imgUrl}></img>
             <p>{this.props.drinkName}</p>
           </Link>
        </div>
    ) 
}

export default DrinkCard;