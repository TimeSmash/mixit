import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setDrinkToShow} from '../actions/drink-actions'
import "../css/NavBar.css"

import {BACKEND_URL} from '../constants'

class NavBar extends Component {

    state = {  }

    getRandomDrink = () => {
        fetch(BACKEND_URL+'/random_drink')
        .then(res => res.json())
        .then(randomDrink => {
            console.log("random drink", randomDrink)
            this.props.dispatch(setDrinkToShow(randomDrink))
        })
    }

    render() {
        return (
            <div className="NavBar">
                <span>HomePage Icon</span>
                <span>About</span>
                <NavLink className="nav-link" to="/drinks">All Drinks</NavLink>
                <NavLink className="nav-link" to="/alcohols">Alcohols</NavLink>
                <NavLink className="nav-link" to="/random_drink" onClick={()=>{this.getRandomDrink()}}>Random Drink</NavLink>
                
                {/* Search Bar */}
                {/* Profile Crap */}
            </div>
        );
    }
}
function mapStateToProps(state){
    return {drinkToShow: state.drinkToShow}
  }

export default connect(mapStateToProps)(NavBar);