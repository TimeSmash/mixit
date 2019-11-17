import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {setDrinkToShow} from '../actions/drink-actions'


import '../css/DrinkCard.css'


// DrinkCards made in response to something
// ex. All Drinks makes a DrinkCard for every drink ever


// but onClick it should go to that drink's show page (a link)
// That Drink needs at least the ID to get its info from fetch
// If we click the link, we could take the drinkId and give it to Drink somehow
class DrinkCard extends Component {
  state={}
  
  // showLoadingIcon = () =>{
  //   if (this.props.imgUrl  === ""){
  //     return 
  //   }
  // }

  render() {
  // console.log("DrinkCard's drink prop from AllDrinks",this.props.drink)

    // debugger
    return(
      <div style={{width:"11rem",display:"inline-block",float:"left"}}
      >

           <Link to={`/drinks/${this.props.drink.id}`} onClick={() =>{this.props.dispatch(setDrinkToShow(this.props.drink))}}>
              <div className="card" style={{"width": "10rem", display:"block"}}>
                <img src={this.props.drink.picture_url} className="card-img-top" alt={this.props.drink.name}></img>
                <div className="card-block">
                  <p className="card-text">{this.props.drink.name}</p>
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
  
