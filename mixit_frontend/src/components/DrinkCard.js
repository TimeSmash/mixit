import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

import {showDrink, setDrinkToShow} from '../actions/drink-actions'


import '../css/DrinkCard.css'


// DrinkCards made in response to something
// ex. All Drinks makes a DrinkCard for every drink ever


// but onClick it should go to that drink's show page (a link)
// That Drink needs at least the ID to get its info from fetch
// If we click the link, we could take the drinkId and give it to Drink somehow
class DrinkCard extends Component {
  state={}
  
  showLoadingIcon = () =>{
    if (this.props.imgUrl  === ""){
      return 
    }
  }

  render() {
  console.log(this.props.drinkToShow)

    // debugger
    return(
      <div>

           <Link to={`/drinks/${this.props.drinkId}`} onClick={() =>{this.props.dispatch(setDrinkToShow(this.props.drink))}}>
              <div className="card" style={{"width": "10rem"}}>
                <img src={this.props.imgUrl} className="card-img-top" alt={this.props.name}></img>
                <div className="card-block">
                  <p className="card-text">{this.props.name}</p>
                </div>
              </div>
           </Link>
        </div>
    ) 
  }
}

  function mapStateToProps(state){
    return {drinkToShow: state.drinkToShow}
  }
  
  export default connect(mapStateToProps)(DrinkCard);
  

  // function DrinkCard(props) {
  //   console.log("DrinkCard",props)
  //   // debugger
  //     return(
  //         <div>
  
  //            <Link to={`/drinks/${props.drinkId}`} onClick={() =>alert("HEY")}>
  //               <div className="card" style={{"width": "10rem"}}>
  //                 <img src={props.imgUrl} className="card-img-top" alt={props.name}></img>
  //                 <div className="card-block">
  //                   <p className="card-text">{props.name}</p>
  //                 </div>
  //               </div>
  //            </Link>
  //         </div>
  //     ) 
  //   }