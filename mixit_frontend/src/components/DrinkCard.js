import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {setDrinkToShow} from '../actions/drink-actions'
import {BACKEND_URL} from '../constants'
import {setDrinkSuggestions} from '../actions/drink-actions'

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

  removeMarkedStatus = (e) => {
    e.preventDefault()
    fetch(BACKEND_URL+`/${this.props.qual}_toggle/`+this.props.drink.id,{
        headers: {"Authorization": localStorage.getItem("token")}
    })
        this.props.removeDrinkFromArray(this.props.qual, this.props.drink.id)

  }
  widthHeight = this.props.reduceSize ? "7em" : "10em"
  overallCardWidth = this.props.reduceSize ? "8rem" : "11rem"
  render() {
  // console.log("DrinkCard's drink prop from AllDrinks",this.props.drink)
    // console.log("DrinkCard props", this.props)

    // debugger
    return(
      <div className="overall-card"style={{width:this.overallCardWidth,display:"inline-block",float:"left"}}>

           <Link className="card-link" to={`/drinks/${this.props.drink.id}`} 
               onClick={() =>{
                 console.log("DrinkCard clciked")
                 this.props.dispatch(setDrinkToShow(this.props.drink))
                 fetch(BACKEND_URL+'/return_drink_arrays/'+this.props.drink.id)
                 .then(res => res.json())
                 .then(json => {
                     
                     console.log("DrinkCard: Fetched arrays using url ID",json)
                     // {drinks_with_same_flav: Array(5), drinks_with_same_alc: Array(5), drinks_with_same_type: Array(5), similar_drinks: Array(2)}
                     // debugger
                    //  this.setState({resolved:true})
                     this.props.dispatch(setDrinkSuggestions(json))
                 })
                 }}>
              <div className="card" style={{"width": this.widthHeight, display:"block", marginLeft:"0", marginTop:"0em"}}>
                <div className="img-and-text-container">
                <div>
                <img src={this.props.drink.picture_url} className="card-img-top" alt={this.props.drink.name} style={{"width": this.widthHeight, height:this.widthHeight}}></img>
                </div>
                <div className="card-block">
                  <p className="card-text" style={{background:"#EEE"}}>{this.props.drink.name.length > 15 ? this.props.drink.name.slice(0,10)+"..." : this.props.drink.name}</p>
                </div>
                </div>
                  {this.props.showButton ? <button className="remove-mark" onClick={(e)=> {this.removeMarkedStatus(e)}}>X</button> : null}
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
  
